'use client'

import { useState } from 'react'
import Link from 'next/link'

const T = '#17B890'
const N = '#0A2342'

/* ── NAV ── */
const NAV = [
  { key: 'inicio',        label: 'Início',          Icon: IcoHome },
  { key: 'nova-consulta', label: 'Nova consulta',    Icon: IcoPlus },
  { key: 'consultas',     label: 'Consultas',        Icon: IcoCalendar },
  { key: 'documentos',    label: 'Documentos',       Icon: IcoDoc },
  { key: 'receitas',      label: 'Receitas',         Icon: IcoPill },
  { key: 'atestados',     label: 'Atestados',        Icon: IcoCert },
  { key: 'pagamentos',    label: 'Pagamentos',       Icon: IcoCard },
  { key: 'perfil',        label: 'Perfil',           Icon: IcoUser },
  { key: 'configuracoes', label: 'Configurações',    Icon: IcoGear },
  { key: 'ajuda',         label: 'Ajuda e suporte',  Icon: IcoHelp },
]

/* ── PAGE ── */
export default function PainelPacientePage() {
  const [active, setActive] = useState('inicio')

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#F8FAFC' }}>

      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex w-[220px] flex-shrink-0 flex-col bg-white" style={{ borderRight: '1px solid #F1F5F9' }}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: T }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
          </div>
          <span className="text-sm font-bold" style={{ color: N }}>Medicare</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {NAV.map(({ key, label, Icon }) => {
            const isActive = active === key
            return (
              <button key={key} onClick={() => setActive(key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all"
                style={{
                  backgroundColor: isActive ? N : 'transparent',
                  color: isActive ? 'white' : '#64748B',
                }}>
                <Icon active={isActive} />
                {label}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5">
          <div style={{ borderTop: '1px solid #F1F5F9', marginBottom: 12 }} />
          <Link href="/auth/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all hover:bg-slate-50"
            style={{ color: '#EF4444' }}>
            <IcoLogout /> Sair
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <p className="font-bold text-sm" style={{ color: N }}>Olá, Ana Clara</p>
            <p className="text-xs" style={{ color: '#64748B' }}>Como podemos ajudar você hoje?</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: T }} />
            </button>
            <button className="p-2 rounded-xl hover:bg-slate-50 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, #1a6bb5, ${T})` }}>A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">

          {/* Hero + Próxima consulta */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 mb-6">

            {/* Hero */}
            <div className="relative rounded-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${N} 0%, #1B4F72 100%)`, minHeight: 164 }}>
              <div className="relative z-10 p-6">
                <h2 className="text-lg font-bold text-white mb-1.5">Precisa de atendimento?</h2>
                <p className="text-sm mb-5" style={{ color: '#94A3B8' }}>Inicie uma consulta agora mesmo com um médico disponível.</p>
                <Link href="/consulta/nova"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}50` }}>
                  Iniciar consulta
                </Link>
              </div>
              {/* Ilustração decorativa */}
              <div className="absolute right-0 bottom-0 top-0 hidden sm:flex items-end opacity-20 pointer-events-none select-none">
                <DoctorSvg />
              </div>
              <div className="absolute right-6 bottom-0 hidden md:block">
                <DoctorSvg />
              </div>
            </div>

            {/* Próxima consulta */}
            <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-semibold mb-4" style={{ color: '#64748B' }}>Próxima consulta</p>
              <div className="flex items-start gap-3 mb-3">
                <div className="h-11 w-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #1a6bb5, #0e9f7e)' }}>G</div>
                <div>
                  <p className="text-xs" style={{ color: '#64748B' }}>Hoje · 16:00</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: N }}>Dr. Gabriel Nascimento</p>
                  <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Clínica Geral</p>
                </div>
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: '#E6FAF6', color: T }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: T }} />
                  Consulta por vídeo
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: T }}>Entrar na sala</button>
                <button className="rounded-xl px-3 py-2.5 text-xs font-semibold transition-all hover:bg-slate-50"
                  style={{ border: '1px solid #E2E8F0', color: N }}>Ver detalhes</button>
              </div>
            </div>
          </div>

          {/* Seções do meio */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">

            {/* Consultas recentes */}
            <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0' }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: N }}>Consultas recentes</h3>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Gabriel Nascimento', specialty: 'Clínico Geral',  date: '12/05/2024 · 15:30', i: 'G' },
                  { name: 'Dra. Fernanda Lima',      specialty: 'Dermatologia',   date: '28/04/2024 · 10:00', i: 'F' },
                  { name: 'Dr. Rafael Mendes',       specialty: 'Ortopedia',      date: '15/04/2024 · 09:00', i: 'R' },
                ].map((c, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #1a6bb5, #0e9f7e)' }}>{c.i}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: N }}>{c.name}</p>
                      <p className="text-xs truncate" style={{ color: '#64748B' }}>{c.specialty}</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{c.date}</p>
                    </div>
                    <button className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:bg-slate-50"
                      style={{ border: '1px solid #E2E8F0', color: N }}>Ver resumo</button>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs font-semibold hover:underline" style={{ color: T }}>
                Ver todas as consultas
              </button>
            </div>

            {/* Documentos */}
            <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0' }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: N }}>Seus documentos</h3>
              <div className="space-y-3">
                {[
                  { name: 'Exame de Sangue', meta: 'PDF · 1,2 MB',  date: 'Enviado em 12/05/2024' },
                  { name: 'Raio-X Tórax',    meta: 'PDF · 890 KB',  date: 'Enviado em 12/05/2024' },
                  { name: 'Receita Médica',   meta: 'PDF · 450 KB',  date: 'Enviado em 28/04/2024' },
                ].map((d, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: '#FEF2F2' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: N }}>{d.name}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{d.meta}</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{d.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs font-semibold hover:underline" style={{ color: T }}>
                Ver todos os documentos
              </button>
            </div>

            {/* Receitas e Atestados */}
            <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0' }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: N }}>Receitas e atestados</h3>
              <div className="space-y-3">
                {[
                  { titulo: 'Receita',  detalhe: 'Paracetamol 750mg',   data: '12/09/2024' },
                  { titulo: 'Atestado', detalhe: '2 dias de repouso',   data: '28/04/2024' },
                ].map((r, idx) => (
                  <button key={idx}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all hover:bg-slate-50"
                    style={{ border: '1px solid #F1F5F9' }}>
                    <div className="h-9 w-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: '#FEF2F2' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold" style={{ color: N }}>{r.titulo}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{r.detalhe}</p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>{r.data}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                ))}
              </div>
              <button className="mt-4 text-xs font-semibold hover:underline" style={{ color: T }}>
                Ver todos
              </button>
            </div>
          </div>

          {/* Dicas de saúde */}
          <div>
            <h3 className="text-sm font-bold mb-4" style={{ color: N }}>Dicas de saúde</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { emoji: '💧', dica: 'Beba bastante água ao longo do dia' },
                { emoji: '🥗', dica: 'Mantenha uma alimentação equilibrada' },
                { emoji: '🏃', dica: 'Pratique atividades físicas regularmente' },
                { emoji: '😴', dica: 'Durma bem para ter mais qualidade de vida' },
              ].map((d, idx) => (
                <div key={idx} className="rounded-2xl bg-white p-4 flex flex-col gap-3"
                  style={{ border: '1px solid #E2E8F0' }}>
                  <span className="text-3xl">{d.emoji}</span>
                  <p className="text-xs font-medium leading-relaxed flex-1" style={{ color: N }}>{d.dica}</p>
                  <button className="text-xs font-semibold hover:underline text-left" style={{ color: T }}>Saiba mais</button>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

/* ── DOCTOR ILLUSTRATION ── */
function DoctorSvg() {
  return (
    <svg width="140" height="164" viewBox="0 0 140 164" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <ellipse cx="70" cy="148" rx="38" ry="16" fill="rgba(23,184,144,0.3)"/>
      <rect x="44" y="90" width="52" height="62" rx="10" fill="white" opacity="0.15"/>
      <rect x="44" y="90" width="52" height="62" rx="10" fill="white" opacity="0.1"/>
      {/* coat */}
      <path d="M44 108 Q56 102 70 100 Q84 102 96 108 L96 152 Q83 158 70 158 Q57 158 44 152Z" fill="white" opacity="0.18"/>
      {/* stethoscope */}
      <path d="M58 115 Q58 128 65 132 Q72 136 72 128" stroke={T} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <circle cx="72" cy="126" r="4" fill={T} opacity="0.8"/>
      {/* head */}
      <circle cx="70" cy="72" r="22" fill="rgba(255,220,185,0.9)"/>
      {/* hair */}
      <path d="M48 68 Q50 48 70 46 Q90 48 92 68 Q88 56 70 54 Q52 56 48 68Z" fill="rgba(80,50,20,0.7)"/>
      {/* face details */}
      <circle cx="63" cy="73" r="2" fill="rgba(80,50,20,0.5)"/>
      <circle cx="77" cy="73" r="2" fill="rgba(80,50,20,0.5)"/>
      <path d="M64 82 Q70 87 76 82" stroke="rgba(180,100,80,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

/* ── ICONS ── */
type IcoProps = { active?: boolean }
const ico = (d: string | React.ReactNode, size = 16) => (_props: IcoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
)

function IcoHome({ active }: IcoProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function IcoPlus(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
function IcoCalendar(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function IcoDoc(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
}
function IcoPill(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2"/><circle cx="17" cy="17" r="5"/><path d="M14 17h6"/></svg>
}
function IcoCert(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
}
function IcoCard(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
}
function IcoUser(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function IcoGear(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}
function IcoHelp(_: IcoProps) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
}
function IcoLogout() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
}

// unused var suppression
void ico
