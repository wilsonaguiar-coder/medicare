#!/bin/bash
# Medicare — cria usuários de teste (paciente e médico)
BASE="https://www.medicare.med.br/api/v1"

echo ""
echo "=== Medicare — Seed de usuários de teste ==="
echo ""

register() {
  local label=$1
  local payload=$2
  echo "Criando $label..."
  result=$(curl -s -X POST "$BASE/auth/register" \
    -H "Content-Type: application/json" \
    -d "$payload")
  echo "$result" | python3 -m json.tool 2>/dev/null || echo "$result"
  echo ""
}

register "Paciente" '{
  "email": "paciente@teste.com",
  "password": "Teste@123",
  "role": "PATIENT"
}'

register "Médico" '{
  "email": "medico@teste.com",
  "password": "Teste@123",
  "role": "DOCTOR"
}'

echo "=== Credenciais ==="
echo "  Paciente → paciente@teste.com / Teste@123"
echo "  Médico   → medico@teste.com   / Teste@123"
echo ""
