'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const N = '#0A2342'
const T = '#17B890'

export default function LoginPage() {
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
      <div className="w-full max-w-sm rounded-2xl bg-white p-8"
        style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

        <h1 className="text-2xl font-bold mb-1" style={{ color: N }}>Entrar na sua conta</h1>
        <p className="text-sm mb-6" style={{ color: '#64748B' }}>
          Bem-vindo de volta à plataforma Medicare.
        </p>

        <form className="flex flex-col gap-4">
          {/* E-mail */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: N }} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com.br"
              className="input-field"
            />
          </div>

          {/* Senha com toggle */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: N }} htmlFor="password">
                Senha
              </label>
              <Link href="/auth/recuperar-senha" className="text-xs hover:underline" style={{ color: T }}>
                Esqueci minha senha
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}40` }}
          >
            Entrar
          </button>
        </form>

        <p className="mt-5 text-center text-sm" style={{ color: '#64748B' }}>
          É médico e não tem conta?{' '}
          <Link href="/auth/register?role=doctor" className="font-semibold hover:underline" style={{ color: T }}>
            Cadastre-se grátis
          </Link>
        </p>
      </div>

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
