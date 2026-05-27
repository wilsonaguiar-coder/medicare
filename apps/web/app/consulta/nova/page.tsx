import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nova Consulta' }

const SPECIALTIES: { key: string; label: string; icon: string | React.ReactNode; price: number }[] = [
  { key: 'CLINICAL_MEDICINE',    label: 'Clínica Médica',       icon: '🩺', price: 120 },
  { key: 'PEDIATRICS',           label: 'Pediatria',             icon: '👶', price: 130 },
  { key: 'DERMATOLOGY',          label: 'Dermatologia',          icon: '🔬', price: 140 },
  { key: 'GYNECOLOGY',           label: 'Ginecologia',           icon: '🌸', price: 140 },
  { key: 'ORTHOPEDICS',          label: 'Ortopedia',             icon: '🦴', price: 150 },
  { key: 'PSYCHIATRY',           label: 'Psiquiatria',           icon: '🧠', price: 160 },
  { key: 'CARDIOLOGY',           label: 'Cardiologia',           icon: '❤️', price: 160 },
  { key: 'NEUROLOGY',            label: 'Neurologia',            icon: '⚡', price: 160 },
  { key: 'ENDOCRINOLOGY',        label: 'Endocrinologia',        icon: '⚗️', price: 150 },
  { key: 'GASTROENTEROLOGY',     label: 'Gastroenterologia',     icon: <StomachIcon />, price: 150 },
  { key: 'OTORHINOLARYNGOLOGY',  label: 'Otorrinolaringologia',  icon: '👂', price: 150 },
]

function StomachIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 14c-4 0-8 3-9 7-1 3 0 6 1 9 1 4 1 8 0 12-1 3-1 6 1 8 2 3 6 4 9 3 2-1 4-3 6-3s4 2 7 2c4 0 8-2 9-6 1-3 0-7-1-10-2-5-2-10-1-15 1-4-1-8-5-9-2-1-4 0-6 1-1 1-3 2-5 1-2 0-4-1-6 0z"
        fill="#f97316"
        fillOpacity="0.15"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 22c0 0 2-3 5-2"
        stroke="#f97316"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

import React from 'react'

export default function NovaConsultaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nova Consulta</h1>
        <p className="mt-1 text-gray-600">Selecione a especialidade desejada para continuar.</p>
      </div>

      {/* Aviso */}
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <strong>Atenção:</strong> Este serviço não é indicado para emergências médicas. Em caso de
        risco imediato à vida, ligue <strong>192 (SAMU)</strong>.
      </div>

      {/* Progresso */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        {['Especialidade', 'Pré-triagem', 'Documentos', 'Pagamento', 'Consulta'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            {i > 0 && <div className="h-px flex-1 bg-gray-200" />}
            <div className={[
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium',
              i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500',
            ].join(' ')}>
              {i + 1}
            </div>
            <span className={i === 0 ? 'font-medium text-gray-900' : 'text-gray-400'}>{step}</span>
          </div>
        ))}
      </div>

      {/* Especialidades */}
      <div className="grid grid-cols-2 gap-3">
        {SPECIALTIES.map((s) => (
          <button
            key={s.key}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-2xl flex items-center justify-center w-8 h-8">{s.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-900">{s.label}</p>
              <p className="text-xs text-gray-500">R$ {s.price},00 · 30 min</p>
            </div>
          </button>
        ))}
      </div>

      {/* Não sei a especialidade */}
      <button
        className="mt-4 w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ borderColor: '#17B890', backgroundColor: '#F0FDF9' }}
      >
        <span className="text-3xl">🤔</span>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: '#0A2342' }}>Não sei qual especialidade escolher</p>
          <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
            Descreva seus sintomas e nossa IA irá indicar a especialidade mais adequada para você.
          </p>
        </div>
        <span className="text-lg">✨</span>
      </button>
    </div>
  )
}
