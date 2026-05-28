'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import Image from 'next/image'

const VideoRoom = lazy(() => import('../../consulta/nova/VideoRoom').then((m) => ({ default: m.VideoRoom })))

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1'
const N = '#0A2342'
const T = '#17B890'

export default function PainelMedicoPage() {
  const [doctorToken, setDoctorToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('medicare_doctor_token')
    return null
  })
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [activeTab, setActiveTab] = useState('anotacoes')
  const [roomCode, setRoomCode] = useState('')
  const [videoToken, setVideoToken] = useState<string | null>(null)
  const [videoServerUrl, setVideoServerUrl] = useState<string | null>(null)
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState('')
  const [activeConsultation, setActiveConsultation] = useState<{
    patientName: string; specialty: string; aiSummary?: string
    symptoms?: string; symptomDuration?: string; flags?: Record<string, boolean>
  } | null>(null)

  async function handleDoctorLogin() {
    if (!loginEmail || !loginPassword || loginLoading) return
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data = await res.json() as { accessToken?: string; user?: { role: string }; message?: string }
      if (!res.ok) throw new Error(data.message ?? 'Credenciais inválidas.')
      if (data.user?.role !== 'DOCTOR') throw new Error('Esta conta não é de médico.')
      localStorage.setItem('medicare_doctor_token', data.accessToken!)
      setDoctorToken(data.accessToken!)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Erro ao entrar.')
    } finally {
      setLoginLoading(false)
    }
  }

  if (!doctorToken) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="bg-white rounded-2xl p-8 shadow-sm w-full max-w-sm" style={{ border: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: N }}>
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: N }}>Medicare</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>Painel do médico</p>
            </div>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: N }}>Entrar</h1>
          <p className="text-sm mb-6" style={{ color: '#64748B' }}>Acesse com suas credenciais de médico</p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: '#475569' }}>E-mail</label>
              <input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDoctorLogin()}
                type="email" placeholder="medico@email.com"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ border: '1.5px solid #E2E8F0', color: N }} />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: '#475569' }}>Senha</label>
              <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDoctorLogin()}
                type="password" placeholder="Sua senha"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ border: '1.5px solid #E2E8F0', color: N }} />
            </div>
          </div>
          {loginError && <p className="mt-3 text-sm text-red-600">{loginError}</p>}
          <button onClick={handleDoctorLogin} disabled={loginLoading || !loginEmail || !loginPassword}
            className="mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: T }}>
            {loginLoading ? 'Entrando...' : 'Entrar no painel'}
          </button>
          <p className="mt-4 text-xs text-center" style={{ color: '#94A3B8' }}>
            Credenciais de teste: medico@teste.com / Teste@123
          </p>
        </div>
      </div>
    )
  }

  async function handleJoinRoom(code?: string, consultationData?: {
    patientName: string; specialty: string; aiSummary?: string
    symptoms?: string; symptomDuration?: string; flags?: Record<string, boolean>
  }) {
    const target = (code ?? roomCode).trim()
    if (!target || joining) return
    setJoining(true)
    setJoinError('')
    try {
      const res = await fetch(`${API_BASE}/video/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: target, participantName: 'Médico' }),
      })
      if (!res.ok) throw new Error('Nao foi possivel obter o token.')
      const data = await res.json() as { token: string; serverUrl: string }
      setRoomCode(target)
      setVideoToken(data.token)
      setVideoServerUrl(data.serverUrl)
      if (consultationData) setActiveConsultation(consultationData)
      fetch(`${API_BASE}/video/waiting-room/${encodeURIComponent(target)}`, { method: 'DELETE' }).catch(() => {})
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
          <LeftPanel onJoinRoom={handleJoinRoom} />
          <CenterPanel
            activeTab={activeTab} setActiveTab={setActiveTab}
            videoToken={videoToken} videoServerUrl={videoServerUrl}
            roomCode={roomCode} setRoomCode={setRoomCode}
            joining={joining} joinError={joinError}
            onJoinRoom={handleJoinRoom}
            onLeaveRoom={() => { setVideoToken(null); setVideoServerUrl(null); setRoomCode(''); setActiveConsultation(null) }}
          />
          <RightPanel consultation={activeConsultation} />
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

type WaitingItem = { roomName: string; specialty: string; patientName: string; createdAt: string; aiSummary?: string; symptoms?: string; symptomDuration?: string; flags?: Record<string, boolean> }

/* ── LEFT PANEL ── */
function LeftPanel({ onJoinRoom }: { onJoinRoom: (roomName: string, data?: WaitingItem) => void }) {
  const [waiting, setWaiting] = useState<WaitingItem[]>([])

  useEffect(() => {
    const poll = () => fetch(`${API_BASE}/video/waiting-rooms`).then(r => r.ok ? r.json() : []).then(setWaiting).catch(() => {})
    poll()
    const t = setInterval(poll, 5000)
    return () => clearInterval(t)
  }, [])

  const COLORS = ['#7C3AED', '#0369A1', '#BE185D', '#D97706', '#059669']
  const initials = (name: string) => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const elapsed = (d: string) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
    return mins < 1 ? 'Agora' : `${mins}min`
  }
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
          {waiting.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs" style={{ color: '#94A3B8' }}>
              Nenhum paciente aguardando
            </div>
          ) : waiting.map((p, i) => (
            <div key={p.roomName} className="flex items-center gap-3 px-4 py-3"
              style={{ backgroundColor: i === 0 ? '#F0FDF9' : undefined }}>
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                {initials(p.patientName)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: N }}>{p.patientName}</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{elapsed(p.createdAt)} atrás</p>
                <span className="inline-block mt-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: '#F59E0B15', color: '#F59E0B', fontSize: 10 }}>
                  Aguardando
                </span>
              </div>
              <button
                onClick={() => onJoinRoom(p.roomName, p)}
                className="shrink-0 rounded-lg px-2 py-1.5 text-xs font-bold text-white transition-all hover:opacity-80"
                style={{ backgroundColor: T }}>
                Entrar
              </button>
            </div>
          ))}
        </div>
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

const SPECIALTY_LABELS: Record<string, string> = {
  CLINICAL_MEDICINE: 'Clínica Médica', PEDIATRICS: 'Pediatria', DERMATOLOGY: 'Dermatologia',
  GYNECOLOGY: 'Ginecologia', ORTHOPEDICS: 'Ortopedia', PSYCHIATRY: 'Psiquiatria',
  NEUROLOGY: 'Neurologia', CARDIOLOGY: 'Cardiologia', ENDOCRINOLOGY: 'Endocrinologia',
  GASTROENTEROLOGY: 'Gastroenterologia', OTORHINOLARYNGOLOGY: 'Otorrinolaringologia',
}

type AiSummaryParsed = {
  queixa_principal?: string
  pontos_de_atencao?: string[]
  hipoteses_clinicas?: string[]
  cid10_provaveis?: string[]
  respostas_objetivas?: string[]
  documentos_resumidos?: string[]
  perguntas_sugeridas_para_o_medico?: string[]
  limitacoes?: string
}

function parseAiSummary(raw: string): AiSummaryParsed | null {
  try { return JSON.parse(raw) as AiSummaryParsed } catch { return null }
}

/* ── RIGHT PANEL ── */
function RightPanel({ consultation }: {
  consultation: { patientName: string; specialty: string; aiSummary?: string; symptoms?: string; symptomDuration?: string; flags?: Record<string, boolean> } | null
}) {
  const flagLabels: Record<string, string> = {
    hasFever: 'Febre', hasPain: 'Dor', hasShortnessOfBreath: 'Falta de ar',
    hasAllergy: 'Alergia', usesMedication: 'Usa medicação', isPregnant: 'Gestante',
  }
  const activeFlags = consultation?.flags
    ? Object.entries(consultation.flags).filter(([, v]) => v).map(([k]) => flagLabels[k] ?? k)
    : []
  const parsed = consultation?.aiSummary ? parseAiSummary(consultation.aiSummary) : null

  return (
    <div className="flex flex-col gap-4 flex-shrink-0 overflow-y-auto" style={{ width: 280 }}>
      {/* AI Summary */}
      <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded flex items-center justify-center flex-shrink-0"
            style={{ background: `linear-gradient(135deg, #7C3AED, ${T})` }}>
            <span style={{ color: 'white', fontSize: 9 }}>✦</span>
          </div>
          <p className="text-xs font-semibold" style={{ color: N }}>Resumo inteligente (IA)</p>
        </div>

        {!consultation ? (
          <p className="text-xs" style={{ color: '#94A3B8' }}>Entre em uma consulta para ver o resumo do paciente.</p>
        ) : (
          <>
            {/* Queixa + duração */}
            {consultation.symptoms && (
              <div className="mb-3 rounded-xl p-3" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: N }}>Queixa principal</p>
                <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>{consultation.symptoms}</p>
                {consultation.symptomDuration && (
                  <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>Duração: {consultation.symptomDuration}</p>
                )}
              </div>
            )}

            {/* Flags */}
            {activeFlags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {activeFlags.map(f => (
                  <span key={f} className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>{f}</span>
                ))}
              </div>
            )}

            {/* Resumo estruturado */}
            {parsed ? (
              <div className="space-y-2">
                {parsed.pontos_de_atencao && parsed.pontos_de_atencao.length > 0 && (
                  <SummaryBlock title="Pontos de atenção" items={parsed.pontos_de_atencao} />
                )}
                {parsed.hipoteses_clinicas && parsed.hipoteses_clinicas.length > 0 && (
                  <SummaryBlock title="Hipóteses clínicas" items={parsed.hipoteses_clinicas} accent />
                )}
                {parsed.cid10_provaveis && parsed.cid10_provaveis.length > 0 && (
                  <SummaryBlock title="CID-10 prováveis" items={parsed.cid10_provaveis} />
                )}
                {parsed.perguntas_sugeridas_para_o_medico && parsed.perguntas_sugeridas_para_o_medico.length > 0 && (
                  <SummaryBlock title="Perguntas sugeridas" items={parsed.perguntas_sugeridas_para_o_medico} />
                )}
                {parsed.documentos_resumidos && parsed.documentos_resumidos.length > 0 && (
                  <SummaryBlock title="Documentos" items={parsed.documentos_resumidos} />
                )}
                {parsed.limitacoes && (
                  <p className="text-xs italic" style={{ color: '#94A3B8' }}>{parsed.limitacoes}</p>
                )}
              </div>
            ) : consultation.aiSummary ? (
              <div className="rounded-xl p-3" style={{ backgroundColor: '#F8FFFE', border: `1px solid ${T}25` }}>
                <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: '#475569' }}>{consultation.aiSummary}</p>
              </div>
            ) : (
              !consultation.symptoms && activeFlags.length === 0 && (
                <p className="text-xs" style={{ color: '#94A3B8' }}>Resumo não disponível para esta consulta.</p>
              )
            )}

            <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>✦ Gerado por IA antes da consulta</p>
          </>
        )}
      </div>

      {/* Patient info */}
      {consultation && (
        <div className="bg-white rounded-2xl p-4" style={{ border: '1px solid #E2E8F0' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: N }}>Dados da consulta</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#94A3B8' }}>Paciente</span>
              <span className="font-medium" style={{ color: N }}>{consultation.patientName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: '#94A3B8' }}>Especialidade</span>
              <span className="font-medium" style={{ color: N }}>{SPECIALTY_LABELS[consultation.specialty] ?? consultation.specialty}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryBlock({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="rounded-xl p-3" style={{ backgroundColor: accent ? '#FFF7ED' : '#F8FAFC', border: `1px solid ${accent ? '#FED7AA' : '#E2E8F0'}` }}>
      <p className="text-xs font-semibold mb-1" style={{ color: accent ? '#C2410C' : N }}>{title}</p>
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs leading-relaxed" style={{ color: '#475569' }}>— {item}</li>
        ))}
      </ul>
    </div>
  )
}

/* ── ICON HELPERS ── */
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
