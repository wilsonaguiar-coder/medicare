'use client'

import { useState, lazy, Suspense } from 'react'
import Image from 'next/image'

const VideoRoom = lazy(() => import('../../consulta/nova/VideoRoom').then((m) => ({ default: m.VideoRoom })))

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1'
const N = '#0A2342'
const T = '#17B890'

export default function PainelMedicoPage() {
  const [activeTab, setActiveTab] = useState('anotacoes')
  const [roomCode, setRoomCode] = useState('')
  const [videoToken, setVideoToken] = useState<string | null>(null)
  const [videoServerUrl, setVideoServerUrl] = useState<string | null>(null)
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState('')

  async function handleJoinRoom() {
    if (!roomCode.trim() || joining) return
    setJoining(true)
    setJoinError('')
    try {
      const res = await fetch(`${API_BASE}/video/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: roomCode.trim(), participantName: 'Médico' }),
      })
      if (!res.ok) throw new Error('Nao foi possivel obter o token.')
      const data = await res.json() as { token: string; serverUrl: string }
      setVideoToken(data.token)
      setVideoServerUrl(data.serverUrl)
    } catch {
      setJoinError('Nao foi possivel entrar na sala. Verifique o codigo.')
    } finally {
      setJoining(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ backgroundColor: '#F1F5F9', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex overflow-hidden gap-4 p-4">
          <LeftPanel />
          <CenterPanel
            activeTab={activeTab} setActiveTab={setActiveTab}
            videoToken={videoToken} videoServerUrl={videoServerUrl}
            roomCode={roomCode} setRoomCode={setRoomCode}
            joining={joining} joinError={joinError}
            onJoinRoom={handleJoinRoom}
            onLeaveRoom={() => { setVideoToken(null); setVideoServerUrl(null); setRoomCode('') }}
          />
          <RightPanel />
        </main>
      </div>
    </div>
  )
}

/* ── SIDEBAR ── */
function Sidebar() {
  const navItems = [
    { label: 'Início',        icon: <IconHome />,     badge: 0,  active: false },
    { label: 'Atendimentos',  icon: <IconStethoscope />, badge: 3, active: true  },
    { label: 'Agenda',        icon: <IconCalendar />, badge: 0,  active: false },
    { label: 'Pacientes',     icon: <IconUsers />,    badge: 0,  active: false },
    { label: 'Mensagens',     icon: <IconChat />,     badge: 2,  active: false },
    { label: 'Financeiro',    icon: <IconChart />,    badge: 0,  active: false },
    { label: 'Relatórios',    icon: <IconDoc />,      badge: 0,  active: false },
    { label: 'Configurações', icon: <IconSettings />, badge: 0,  active: false },
  ]

  return (
    <aside className="flex flex-col flex-shrink-0"
      style={{ width: 220, backgroundColor: N, color: 'white' }}>

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="rounded-lg p-1 flex-shrink-0" style={{ backgroundColor: 'white' }}>
          <Image src="/logo.png" alt="Medicare" width={26} height={26} />
        </div>
        <span className="font-bold text-base">Medicare</span>
      </div>

      {/* Label */}
      <p className="px-5 pt-5 pb-2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,0.35)' }}>Painel do médico</p>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(item => (
          <button key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
            style={{
              backgroundColor: item.active ? `${T}20` : 'transparent',
              color: item.active ? T : 'rgba(255,255,255,0.6)',
              fontWeight: item.active ? 600 : 400,
            }}>
            <span style={{ color: item.active ? T : 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge > 0 && (
              <span className="text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center"
                style={{ backgroundColor: T, color: 'white', fontSize: 10 }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Doctor profile */}
      <div className="px-4 py-4 mx-3 mb-4 rounded-xl flex items-center gap-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: `linear-gradient(135deg, #1a6bb5, ${T})`, color: 'white' }}>
          GN
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">Dr. Gabriel Nascimento</p>
          <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>CRM 123456-SP</p>
        </div>
      </div>
    </aside>
  )
}

/* ── HEADER ── */
function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white flex-shrink-0"
      style={{ borderBottom: '1px solid #E2E8F0' }}>
      <h1 className="text-lg font-bold" style={{ color: N }}>Atendimentos</h1>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-slate-50">
          <IconBell />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full" style={{ backgroundColor: T }} />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-slate-50">
          <IconBell />
        </button>
        <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, #1a6bb5, ${T})` }}>
          GN
        </div>
      </div>
    </header>
  )
}

/* ── LEFT PANEL ── */
function LeftPanel() {
  const queue = [
    { name: 'Ana Clara Silva',   age: '24 anos', time: '09:30', status: 'Em andamento', statusColor: T,         initials: 'AC', color: '#7C3AED' },
    { name: 'João Pedro Costa',  age: '32 anos', time: '10:00', status: 'Aguardando',   statusColor: '#F59E0B', initials: 'JP', color: '#0369A1' },
    { name: 'Mariana Oliveira',  age: '28 anos', time: '10:30', status: 'Aguardando',   statusColor: '#F59E0B', initials: 'MO', color: '#BE185D' },
  ]
  const schedule = [
    { time: '11:00', name: 'Carlos Eduardo' },
    { time: '11:30', name: 'Fernanda Lima'  },
    { time: '12:00', name: 'Rafael Mendes'  },
  ]

  return (
    <div className="flex flex-col gap-4 flex-shrink-0" style={{ width: 256 }}>
      {/* Queue */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #E2E8F0' }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <h2 className="text-sm font-semibold" style={{ color: N }}>Fila de atendimentos</h2>
          <select className="text-xs rounded-lg px-2 py-1 outline-none"
            style={{ border: '1px solid #E2E8F0', color: '#64748B' }}>
            <option>Todos</option>
          </select>
        </div>
        <div className="divide-y divide-slate-50">
          {queue.map((p, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${i === 0 ? '' : 'hover:bg-slate-50'}`}
              style={{ backgroundColor: i === 0 ? '#F0FDF9' : undefined }}>
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: p.color }}>
                {p.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: N }}>{p.name}</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{p.age} · {p.time}</p>
                <span className="inline-block mt-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${p.statusColor}15`, color: p.statusColor, fontSize: 10 }}>
                  {p.status}
                </span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          ))}
        </div>
        <button className="py-3 text-xs font-semibold text-center hover:bg-slate-50 transition-colors"
          style={{ color: T, borderTop: '1px solid #F1F5F9' }}>
          Ver todos
        </button>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <h2 className="text-sm font-semibold" style={{ color: N }}>Próximos horários</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {schedule.map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xs font-mono font-semibold w-10 flex-shrink-0" style={{ color: T }}>{s.time}</span>
              <span className="text-xs" style={{ color: '#475569' }}>{s.name}</span>
            </div>
          ))}
        </div>
        <button className="w-full py-3 text-xs font-semibold text-center hover:bg-slate-50 transition-colors"
          style={{ color: T, borderTop: '1px solid #F1F5F9' }}>
          Ver agenda completa
        </button>
      </div>
    </div>
  )
}

/* ── CENTER PANEL ── */
interface CenterPanelProps {
  activeTab: string
  setActiveTab: (t: string) => void
  videoToken: string | null
  videoServerUrl: string | null
  roomCode: string
  setRoomCode: (v: string) => void
  joining: boolean
  joinError: string
  onJoinRoom: () => void
  onLeaveRoom: () => void
}

function CenterPanel({ activeTab, setActiveTab, videoToken, videoServerUrl, roomCode, setRoomCode, joining, joinError, onJoinRoom, onLeaveRoom }: CenterPanelProps) {
  const tabs = [
    { key: 'anotacoes',  label: 'Anotações'          },
    { key: 'prescricao', label: 'Prescrição'          },
    { key: 'atestado',   label: 'Atestado'            },
    { key: 'exame',      label: 'Solicitação de exame'},
  ]

  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0">
      {/* Video card */}
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #E2E8F0', flex: '1 1 0' }}>
        {/* Video header */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <h2 className="text-sm font-semibold" style={{ color: N }}>
            {videoToken ? 'Consulta em andamento' : 'Sala de vídeo'}
          </h2>
          {videoToken && (
            <button onClick={onLeaveRoom} className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ backgroundColor: '#EF4444' }}>
              Encerrar
            </button>
          )}
        </div>

        {/* Video area */}
        <div className="relative flex-1 min-h-0">
          {videoToken && videoServerUrl ? (
            <Suspense fallback={<div className="h-full flex items-center justify-center text-sm text-white" style={{ background: '#0A2342' }}>Carregando...</div>}>
              <VideoRoom token={videoToken} serverUrl={videoServerUrl} onDisconnect={onLeaveRoom} />
            </Suspense>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 p-6"
              style={{ background: 'linear-gradient(160deg, #1a2f4a 0%, #0f1e35 100%)' }}>
              <p className="text-white text-sm font-medium">Informe o código da sala para entrar na consulta</p>
              <div className="flex items-center gap-2 w-full max-w-sm">
                <input
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onJoinRoom()}
                  placeholder="consulta-clinical_medicine-..."
                  className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                  style={{ border: `1.5px solid ${T}`, color: N }}
                />
                <button onClick={onJoinRoom} disabled={!roomCode.trim() || joining}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ backgroundColor: T }}>
                  {joining ? '...' : 'Entrar'}
                </button>
              </div>
              {joinError && <p className="text-red-400 text-xs">{joinError}</p>}
              <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                O código aparece na tela do paciente após ele iniciar a consulta
              </p>
            </div>
          )}
        </div>

        {/* Notes tabs */}
        <div className="flex-shrink-0" style={{ borderTop: '1px solid #F1F5F9' }}>
          <div className="flex" style={{ borderBottom: '1px solid #F1F5F9' }}>
            {tabs.map(tab => (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-2.5 text-xs font-medium transition-colors relative"
                style={{ color: activeTab === tab.key ? T : '#94A3B8' }}>
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: T }} />
                )}
              </button>
            ))}
          </div>
          <div className="px-4 py-3 text-xs leading-relaxed" style={{ color: '#475569', maxHeight: 110, overflowY: 'auto' }}>
            <p className="font-semibold mb-1" style={{ color: N }}>Anamnese</p>
            <p className="mb-2">Paciente relata dor de cabeça recorrente há 3 semanas, intensificando à noite, associada a cansaço e dificuldade para dormir.</p>
            <p className="font-semibold mb-1" style={{ color: N }}>Conduta</p>
            <p>Solicitado exames laboratoriais. Orientado retorno com resultados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── RIGHT PANEL ── */
function RightPanel() {
  const docs = [
    { name: 'Exame de Sangue', size: 'PDF · 1,2 MB' },
    { name: 'Vitamina D',      size: 'PDF · 430 KB' },
    { name: 'Receita Anterior',size: 'PDF · 250 KB' },
  ]

  return (
    <div className="flex flex-col gap-4 flex-shrink-0 overflow-y-auto" style={{ width: 280 }}>
      {/* AI Summary */}
      <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid #E2E8F0' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, #7C3AED, ${T})` }}>
              <span style={{ color: 'white', fontSize: 9 }}>✦</span>
            </div>
            <p className="text-xs font-semibold" style={{ color: N }}>Resumo inteligente (IA)</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 text-xs leading-none">✕</button>
        </div>

        <p className="text-xs mb-2" style={{ color: '#64748B' }}>Com base nos documentos enviados, a IA identificou os seguintes pontos relevantes:</p>

        <ul className="space-y-1.5 mb-3">
          {[
            'Hemograma normal',
            'Glicemia em jejum: 92 mg/dL',
            'Vitamina D: 28 ng/mL (abaixo do ideal)',
            'Colesterol total: 178 mg/dL',
            'Função renal normal',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-xs" style={{ color: '#475569' }}>
              <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: T }}>✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: '#F8FFFE', border: `1px solid ${T}25` }}>
          <p className="text-xs font-semibold mb-1" style={{ color: N }}>Sugestão da IA</p>
          <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
            Investigar causas de cefaleia associada à fadiga. Avaliar rotina de sono e níveis de vitamina D.
          </p>
        </div>

        <p className="text-xs" style={{ color: '#94A3B8' }}>✦ Gerado por IA · 1 min atrás</p>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <p className="text-xs font-semibold" style={{ color: N }}>Documentos do paciente</p>
        </div>
        <div className="divide-y">
          {docs.map(doc => (
            <div key={doc.name} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FEF3C7' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: N }}>{doc.name}</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{doc.size}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          ))}
        </div>
        <button className="w-full py-3 text-xs font-semibold text-center transition-colors hover:opacity-90"
          style={{ backgroundColor: T, color: 'white' }}>
          Ver todos os documentos
        </button>
      </div>
    </div>
  )
}

/* ── ICON HELPERS ── */
function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-1.5 rounded-lg hover:bg-slate-50 transition-colors" style={{ color: '#94A3B8' }}>
      {children}
    </button>
  )
}

const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const IconHome = () => <Ico d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" size={15} />
const IconStethoscope = () => <Ico d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3 M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" size={15} />
const IconCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const IconUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconChat = () => <Ico d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" size={15} />
const IconChart = () => <Ico d="M18 20V10 M12 20V4 M6 20v-6" size={15} />
const IconDoc = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)
const IconSettings = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)
const IconBell = () => <Ico d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0" size={18} />
const IconCamSettings = () => <Ico d="M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" size={15} />
const IconFullscreen = () => <Ico d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" size={15} />
const IconGrid = () => <Ico d="M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z" size={15} />
const IconMic = () => <Ico d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" size={16} />
const IconCam = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
)
const IconChatSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconDocSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
)
const IconExpand = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
)
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 3.07 8.63 2 2 0 0 1 5 6.44h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 14.9" />
    <line x1="23" y1="1" x2="1" y2="23" />
  </svg>
)
