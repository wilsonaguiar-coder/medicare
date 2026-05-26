#!/bin/bash
# Medicare — Setup completo do servidor
# Execute como root: bash setup-server.sh
set -e

###############################################################################
# CORES
###############################################################################
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'
NC='\033[0m'
ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
info() { echo -e "${BLUE}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
fail() { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }
step() { echo -e "\n${BLUE}══════════════════════════════════════${NC}"; echo -e "${BLUE}▶ $1${NC}"; echo -e "${BLUE}══════════════════════════════════════${NC}"; }

###############################################################################
# VARIÁVEIS — EDITE SE NECESSÁRIO
###############################################################################
DB_NAME="medicare"
DB_USER="medicare"
DB_PASS="$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32)"
JWT_SECRET="$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c 64)"
APP_DIR="/opt/medicare"
GITHUB_REPO="https://github.com/wilsonaguiar-coder/medicare.git"
API_PORT=3001
WEB_PORT=3000
NODE_VERSION=20

###############################################################################
step "1/9 — Verificando sistema operacional"
###############################################################################
. /etc/os-release
info "Sistema: $NAME $VERSION_ID"
if [[ "$ID" != "ubuntu" && "$ID" != "debian" ]]; then
  warn "Este script foi testado em Ubuntu/Debian. Pode precisar de ajustes."
fi

###############################################################################
step "2/9 — Atualizando sistema e instalando dependências base"
###############################################################################
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq \
  curl wget git unzip build-essential \
  ca-certificates gnupg lsb-release \
  openssl ufw nginx 2>/dev/null
ok "Dependências base instaladas"

###############################################################################
step "3/9 — Instalando Node.js $NODE_VERSION"
###############################################################################
if command -v node &>/dev/null && [[ "$(node -v | cut -d. -f1 | tr -d v)" -ge "$NODE_VERSION" ]]; then
  ok "Node.js já instalado: $(node -v)"
else
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - 2>/dev/null
  apt-get install -y -qq nodejs
  ok "Node.js instalado: $(node -v)"
fi

###############################################################################
step "4/9 — Instalando pnpm"
###############################################################################
if ! command -v pnpm &>/dev/null; then
  npm install -g pnpm@10 --quiet
  ok "pnpm instalado: $(pnpm -v)"
else
  ok "pnpm já instalado: $(pnpm -v)"
fi

# PM2
if ! command -v pm2 &>/dev/null; then
  npm install -g pm2 --quiet
  pm2 startup systemd -u root --hp /root 2>/dev/null || true
  ok "PM2 instalado"
else
  ok "PM2 já instalado"
fi

###############################################################################
step "5/9 — Instalando PostgreSQL"
###############################################################################
if ! command -v psql &>/dev/null; then
  apt-get install -y -qq postgresql postgresql-contrib
  systemctl enable postgresql
  systemctl start postgresql
  ok "PostgreSQL instalado: $(psql --version)"
else
  ok "PostgreSQL já instalado: $(psql --version)"
  systemctl start postgresql 2>/dev/null || true
fi

###############################################################################
step "6/9 — Instalando Redis"
###############################################################################
if ! command -v redis-cli &>/dev/null; then
  apt-get install -y -qq redis-server
  systemctl enable redis-server
  systemctl start redis-server
  ok "Redis instalado: $(redis-server --version)"
else
  ok "Redis já instalado: $(redis-server --version)"
  systemctl start redis-server 2>/dev/null || true
fi

###############################################################################
step "7/9 — Criando banco de dados PostgreSQL"
###############################################################################
# Cria usuário e banco se não existirem
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"

sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 || \
  sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null
ok "Banco '$DB_NAME' e usuário '$DB_USER' prontos"

###############################################################################
step "8/9 — Clonando repositório e configurando aplicação"
###############################################################################
if [ -d "$APP_DIR/.git" ]; then
  info "Repositório já existe, fazendo pull..."
  git -C "$APP_DIR" pull --rebase
else
  git clone "$GITHUB_REPO" "$APP_DIR"
  ok "Repositório clonado em $APP_DIR"
fi

# Gerar .env
cat > "$APP_DIR/.env" << ENVEOF
# === DATABASE ===
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"

# === REDIS ===
REDIS_URL="redis://localhost:6379"

# === JWT ===
JWT_SECRET="${JWT_SECRET}"
JWT_EXPIRES_IN="7d"

# === PAYMENTS (Stripe ou Mercado Pago) — preencha depois ===
PAYMENT_SECRET_KEY=""
PAYMENT_WEBHOOK_SECRET=""

# === AI (OpenAI) — preencha depois ===
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4o"

# === STORAGE (S3 ou compatível) — preencha depois ===
STORAGE_ENDPOINT=""
STORAGE_BUCKET=""
STORAGE_ACCESS_KEY=""
STORAGE_SECRET_KEY=""
STORAGE_REGION="us-east-1"

# === EMAIL — preencha depois ===
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="noreply@medicare.com.br"

# === APP ===
API_URL="http://$(curl -s ifconfig.me 2>/dev/null || echo 'localhost'):${API_PORT}"
WEB_URL="http://$(curl -s ifconfig.me 2>/dev/null || echo 'localhost'):${WEB_PORT}"
NODE_ENV="production"
PORT=${API_PORT}
ENVEOF
ok ".env gerado"

# Instalar dependências
cd "$APP_DIR"
info "Instalando dependências (pode demorar alguns minutos)..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# Aprovar build scripts necessários
echo '{"onlyBuiltDependencies":["@nestjs/core","bcrypt","sharp","msgpackr-extract","unrs-resolver"]}' \
  > "$APP_DIR/.npmrc" 2>/dev/null || true
pnpm approve-builds --yes 2>/dev/null || true
ok "Dependências instaladas"

# Build da API
info "Buildando API..."
cd "$APP_DIR/apps/api"
pnpm build 2>/dev/null && ok "API buildada com sucesso" || warn "Build da API falhou — verifique os logs"

# Build da Web
info "Buildando Web..."
cd "$APP_DIR/apps/web"
pnpm build 2>/dev/null && ok "Web buildada com sucesso" || warn "Build da Web falhou — verifique os logs"

###############################################################################
step "9/9 — Configurando PM2 e Nginx"
###############################################################################
cd "$APP_DIR"

# PM2 ecosystem
cat > "$APP_DIR/ecosystem.config.js" << 'PM2EOF'
module.exports = {
  apps: [
    {
      name: 'medicare-api',
      cwd: '/opt/medicare/apps/api',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: { NODE_ENV: 'production' },
    },
    {
      name: 'medicare-web',
      cwd: '/opt/medicare/apps/web',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      env: { NODE_ENV: 'production' },
    },
  ],
}
PM2EOF

pm2 delete all 2>/dev/null || true
pm2 start "$APP_DIR/ecosystem.config.js"
pm2 save
ok "PM2 configurado"

# Nginx reverse proxy
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')

cat > /etc/nginx/sites-available/medicare << NGINXEOF
server {
    listen 80;
    server_name ${SERVER_IP} _;

    # Web (Next.js)
    location / {
        proxy_pass http://127.0.0.1:${WEB_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # API (NestJS)
    location /api {
        rewrite ^/api(.*) \$1 break;
        proxy_pass http://127.0.0.1:${API_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/medicare /etc/nginx/sites-enabled/medicare
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
ok "Nginx configurado"

# Firewall
ufw allow 22/tcp 2>/dev/null || true
ufw allow 80/tcp 2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true
ufw --force enable 2>/dev/null || true
ok "Firewall configurado (22, 80, 443)"

###############################################################################
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           SETUP CONCLUÍDO COM SUCESSO!                  ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}▶ Credenciais do banco (salve em local seguro):${NC}"
echo "  DB_USER : $DB_USER"
echo "  DB_PASS : $DB_PASS"
echo "  DB_NAME : $DB_NAME"
echo ""
echo -e "${YELLOW}▶ Acesso:${NC}"
echo "  Web : http://$SERVER_IP"
echo "  API : http://$SERVER_IP/api"
echo ""
echo -e "${YELLOW}▶ Próximos passos:${NC}"
echo "  1. Preencha OPENAI_API_KEY, PAYMENT_SECRET_KEY e SMTP no .env:"
echo "     nano $APP_DIR/.env"
echo "  2. Reinicie após preencher: pm2 restart all"
echo "  3. Verifique os serviços: pm2 status"
echo ""
