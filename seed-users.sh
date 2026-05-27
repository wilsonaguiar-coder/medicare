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
  "fullName": "Paciente Teste",
  "email": "paciente@teste.com",
  "password": "Teste@123",
  "role": "PATIENT",
  "cpf": "111.111.111-11",
  "phone": "(11) 91111-1111"
}'

register "Médico" '{
  "fullName": "Dr. Médico Teste",
  "email": "medico@teste.com",
  "password": "Teste@123",
  "role": "DOCTOR",
  "cpf": "222.222.222-22",
  "phone": "(11) 92222-2222"
}'

echo "=== Credenciais ==="
echo "  Paciente → paciente@teste.com / Teste@123"
echo "  Médico   → medico@teste.com   / Teste@123"
echo ""
