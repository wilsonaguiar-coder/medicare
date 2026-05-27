'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const N = '#0A2342'
const T = '#17B890'

export default function RegisterDoctorPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}
      className="flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image src="/logo.png" alt="Medicare" width={36} height={36} />
        <span className="text-xl font-bold" style={{ color: N }}>Medicare</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8" style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

        {/* Header do card */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-3"
            style={{ backgroundColor: '#E6FAF6', color: T, border: `1px solid #A7F3E0` }}>
            Área do médico
          </div>
          <h1 className="text-2xl font-bold" style={{ color: N }}>Cadastro de médico</h1>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>
            Crie sua conta gratuita e comece a atender online.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          {/* Nome + Sobrenome */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nome">
              <input type="text" placeholder="João"
                className="input-field" />
            </Field>
            <Field label="Sobrenome">
              <input type="text" placeholder="Silva"
                className="input-field" />
            </Field>
          </div>

          {/* CPF */}
          <Field label="CPF">
            <input type="text" placeholder="000.000.000-00"
              className="input-field" />
          </Field>

          {/* CRM */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="CRM">
              <input type="text" placeholder="123456"
                className="input-field" />
            </Field>
            <Field label="Estado do CRM">
              <select className="input-field" style={{ color: '#374151' }}>
                <option value="">UF</option>
                {['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'].map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* E-mail */}
          <Field label="E-mail profissional">
            <input type="email" placeholder="seu@email.com.br"
              className="input-field" />
          </Field>

          {/* Celular */}
          <Field label="Celular">
            <input type="tel" placeholder="(11) 99999-9999"
              className="input-field" />
          </Field>

          {/* Senha com toggle */}
          <Field label="Senha">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 8 caracteres"
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: '#94A3B8' }}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff /> : <EyeOn />}
              </button>
            </div>
          </Field>

          {/* Termos */}
          <p className="text-xs" style={{ color: '#64748B' }}>
            Ao criar sua conta, você concorda com os{' '}
            <Link href="/termos" style={{ color: T }} className="hover:underline">Termos de Uso</Link>{' '}
            e a{' '}
            <Link href="/privacidade" style={{ color: T }} className="hover:underline">Política de Privacidade</Link>.
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}40` }}
          >
            Criar minha conta
          </button>
        </form>

        <p className="mt-5 text-center text-sm" style={{ color: '#64748B' }}>
          Já tem conta?{' '}
          <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: T }}>
            Entrar
          </Link>
        </p>
      </div>

      <p className="mt-6 text-xs text-center max-w-sm" style={{ color: '#94A3B8' }}>
        É paciente?{' '}
        <Link href="/consulta/nova" className="hover:underline" style={{ color: T }}>
          Agende sua consulta aqui
        </Link>
        {' '}— o cadastro é feito durante o agendamento.
      </p>

      <style>{`
        .input-field {
          width: 100%;
          border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          padding: 9px 12px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
          background: white;
          color: #0F172A;
        }
        .input-field:focus {
          border-color: ${T};
          box-shadow: 0 0 0 3px ${T}20;
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: N }}>{label}</label>
      {children}
    </div>
  )
}

function EyeOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
