'use client'

import { useState, lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const VideoRoom = lazy(() => import('./VideoRoom').then((m) => ({ default: m.VideoRoom })))

type FlowStep = 'identification' | 'specialty' | 'triage' | 'documents' | 'payment' | 'consultation'
type PendingDocument = { id: string; name: string; size: number; file: File }
type UploadedDocument = {
  id: string
  name: string
  size: number
  type: string
  extractedText: string
  aiSummary: string
}
type AiStatus = 'idle' | 'loading' | 'ready' | 'error'
type AiResult = { specialty: string; label: string; reason: string }

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1'
const MIN_SYMPTOMS_LENGTH = 50
const MAX_DOCUMENT_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

const DOCUMENT_TYPES = [
  { value: 'LAB_RESULT', label: 'Exame laboratorial' },
  { value: 'MEDICAL_REPORT', label: 'Laudo medico' },
  { value: 'PRESCRIPTION', label: 'Receita medica' },
  { value: 'CLINICAL_REPORT', label: 'Relatorio clinico' },
  { value: 'OTHER', label: 'Outro documento' },
]

const SPECIALTIES: { key: string; label: string; icon: string; price: number }[] = [
  { key: 'CLINICAL_MEDICINE',    label: 'Clinica Medica',       icon: '/clm.png', price: 120 },
  { key: 'PEDIATRICS',           label: 'Pediatria',             icon: '/ped.png', price: 130 },
  { key: 'DERMATOLOGY',          label: 'Dermatologia',          icon: '/der.png', price: 140 },
  { key: 'GYNECOLOGY',           label: 'Ginecologia',           icon: '/gin.png', price: 140 },
  { key: 'ORTHOPEDICS',          label: 'Ortopedia',             icon: '/ort.png', price: 150 },
  { key: 'PSYCHIATRY',           label: 'Psiquiatria',           icon: '/psi.png', price: 160 },
  { key: 'NEUROLOGY',            label: 'Neurologia',            icon: '/neu.png', price: 160 },
  { key: 'CARDIOLOGY',           label: 'Cardiologia',           icon: '/car.png', price: 160 },
  { key: 'ENDOCRINOLOGY',        label: 'Endocrinologia',        icon: '/end.png', price: 150 },
  { key: 'GASTROENTEROLOGY',     label: 'Gastroenterologia',     icon: '/gas.png', price: 150 },
  { key: 'OTORHINOLARYNGOLOGY',  label: 'Otorrinolaringologia',  icon: '/oto.png', price: 150 },
]

const T = '#17B890'
const N = '#0A2342'
const SOFT_BG = {
  backgroundColor: '#F7FBFA',
  backgroundImage: `
    linear-gradient(135deg, rgba(23, 184, 144, 0.10) 0%, rgba(255, 255, 255, 0) 42%),
    linear-gradient(90deg, rgba(10, 35, 66, 0.035) 1px, transparent 1px),
    linear-gradient(0deg, rgba(10, 35, 66, 0.035) 1px, transparent 1px)
  `,
  backgroundSize: 'auto, 48px 48px, 48px 48px',
}

export default function NovaConsultaPage() {
  const [activeStep, setActiveStep] = useState<FlowStep>('identification')
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [patientName, setPatientName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState(SPECIALTIES[0].key)
  const [symptoms, setSymptoms] = useState('')
  const [duration, setDuration] = useState('Hoje')
  const [hasFever, setHasFever] = useState(false)
  const [hasPain, setHasPain] = useState(false)
  const [hasShortnessOfBreath, setHasShortnessOfBreath] = useState(false)
  const [hasAllergy, setHasAllergy] = useState(false)
  const [usesMedication, setUsesMedication] = useState(false)
  const [isPregnant, setIsPregnant] = useState(false)
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0].value)
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([])
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [documentError, setDocumentError] = useState('')
  const [documentProcessing, setDocumentProcessing] = useState(false)
  const [consultationSummary, setConsultationSummary] = useState('')
  const [summaryStatus, setSummaryStatus] = useState<AiStatus>('idle')
  const [summaryError, setSummaryError] = useState('')

  // Video call
  const [videoToken, setVideoToken] = useState<string | null>(null)
  const [videoServerUrl, setVideoServerUrl] = useState<string | null>(null)
  const [videoLoading, setVideoLoading] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)

  // AI specialty suggestion
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [aiSymptoms, setAiSymptoms] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState<AiResult | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)

  const selected = SPECIALTIES.find((s) => s.key === selectedSpecialty) ?? SPECIALTIES[0]
  const symptomsLength = symptoms.trim().length

  const canCreateAccount =
    patientName.trim().length > 2 &&
    email.includes('@') &&
    phone.trim().length >= 10 &&
    password.length >= 6 &&
    acceptedTerms
  const canContinueTriage = symptomsLength >= MIN_SYMPTOMS_LENGTH
  const triageFlags = { hasFever, hasPain, hasShortnessOfBreath, hasAllergy, usesMedication, isPregnant }

  async function handleAiSuggest() {
    if (aiSymptoms.trim().length < 10 || aiLoading) return
    setAiLoading(true)
    setAiResult(null)
    setAiError(null)
    try {
      const res = await fetch('/api/suggest-specialty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: aiSymptoms }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAiError(data.error ?? 'Erro ao consultar IA.')
      } else {
        setAiResult(data)
        setSelectedSpecialty(data.specialty)
      }
    } catch {
      setAiError('Nao foi possivel conectar ao servico de IA. Tente novamente.')
    } finally {
      setAiLoading(false)
    }
  }

  function handleDocumentSelection(files: FileList | null) {
    if (!files) return
    const selectedFiles = Array.from(files)
    const invalidType = selectedFiles.find((file) => !ALLOWED_DOCUMENT_TYPES.includes(file.type))
    if (invalidType) {
      setDocumentError(`${invalidType.name} nao e aceito. Envie apenas PDF, JPG ou PNG.`)
      setPendingDocuments([])
      return
    }
    const oversized = selectedFiles.find((file) => file.size > MAX_DOCUMENT_SIZE_BYTES)
    if (oversized) {
      setDocumentError(`${oversized.name} tem ${formatBytes(oversized.size)}. O limite e 5 MB por arquivo.`)
      setPendingDocuments([])
      return
    }
    setDocumentError('')
    setPendingDocuments(
      selectedFiles.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        file,
      })),
    )
  }

  async function attachPendingDocuments() {
    if (pendingDocuments.length === 0) {
      setDocumentError('Selecione pelo menos um arquivo antes de anexar.')
      return
    }
    setDocumentProcessing(true)
    setDocumentError('')
    try {
      const processedDocuments: UploadedDocument[] = []
      for (const document of pendingDocuments) {
        const formData = new FormData()
        formData.append('file', document.file)
        formData.append('type', documentType)
        const response = await fetch(`${API_BASE}/documents/test/extract`, { method: 'POST', body: formData })
        if (!response.ok) throw new Error(await getApiError(response))
        const result = await response.json() as { extractedText: string; aiSummary: string }
        processedDocuments.push({ id: document.id, name: document.name, size: document.size, type: documentType, extractedText: result.extractedText, aiSummary: result.aiSummary })
      }
      setDocuments((current) => [...current, ...processedDocuments])
      setPendingDocuments([])
    } catch (error) {
      setDocumentError(error instanceof Error ? error.message : 'Nao foi possivel processar o documento.')
    } finally {
      setDocumentProcessing(false)
    }
  }

  async function handleEnterCall() {
    if (videoLoading) return
    setVideoLoading(true)
    setVideoError(null)
    try {
      const roomName = `consulta-${selected.key.toLowerCase()}-${Date.now()}`
      const participantName = patientName.trim() || email || 'Paciente'
      const res = await fetch(`${API_BASE}/video/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, participantName }),
      })
      if (!res.ok) throw new Error('Nao foi possivel obter o token de video.')
      const data = await res.json() as { token: string; serverUrl: string }
      setVideoToken(data.token)
      setVideoServerUrl(data.serverUrl)
    } catch (err) {
      setVideoError(err instanceof Error ? err.message : 'Erro ao iniciar video.')
    } finally {
      setVideoLoading(false)
    }
  }

  async function prepareConsultationSummary() {
    setActiveStep('consultation')
    setSummaryStatus('loading')
    setSummaryError('')
    try {
      const response = await fetch(`${API_BASE}/documents/test/prepare-consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: selected.label,
          symptoms,
          symptomDuration: duration,
          flags: triageFlags,
          documentSummaries: documents.map((d) => d.aiSummary),
          extractedTexts: documents.map((d) => d.extractedText),
        }),
      })
      if (!response.ok) throw new Error(await getApiError(response))
      const result = await response.json() as { summary: string }
      setConsultationSummary(result.summary)
      setSummaryStatus('ready')
    } catch (error) {
      setSummaryError(error instanceof Error ? error.message : 'Nao foi possivel gerar o resumo da IA.')
      setSummaryStatus('error')
    }
  }

  function removeDocument(id: string) {
    setDocuments((current) => current.filter((d) => d.id !== id))
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC', color: N, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <section className="relative overflow-hidden px-4 py-10 lg:px-6 lg:py-14" style={SOFT_BG}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/" className="mb-8 inline-flex items-center text-sm font-semibold hover:underline" style={{ color: T }}>
            Voltar para o inicio
          </Link>

          <div className="mb-8">
            <p className="text-xs font-semibold" style={{ color: T }}>Nova consulta</p>
            <h1 className="mt-2 text-3xl font-bold" style={{ color: N }}>
              {activeStep === 'identification' && 'Antes de comecar, identifique-se'}
              {activeStep === 'specialty' && 'Escolha a especialidade da consulta'}
              {activeStep === 'triage' && 'Conte o que voce esta sentindo'}
              {activeStep === 'documents' && 'Envie documentos e exames'}
              {activeStep === 'payment' && 'Confirme o pagamento'}
              {activeStep === 'consultation' && 'Consulta pronta para iniciar'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: '#64748B' }}>
              {activeStep === 'identification' && 'Para proteger seus dados de saude e manter seu historico de atendimento, a consulta comeca com login ou cadastro do paciente.'}
              {activeStep === 'specialty' && 'Agora selecione o tipo de atendimento desejado para continuar o agendamento.'}
              {activeStep === 'triage' && 'Essas informacoes ajudam o medico a se preparar antes da consulta.'}
              {activeStep === 'documents' && 'Nenhum documento sera salvo no servidor. A leitura e temporaria e serve apenas para gerar um resumo de apoio ao profissional.'}
              {activeStep === 'payment' && 'Confira o resumo da consulta. A integracao de pagamento sera conectada mais adiante.'}
              {activeStep === 'consultation' && 'Veja se o resumo da IA foi gerado corretamente para apoiar a leitura do medico.'}
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Atencao:</strong> este servico nao e indicado para emergencias medicas. Em caso de risco imediato a vida, ligue <strong>192 (SAMU)</strong>.
          </div>

          <Progress activeStep={activeStep} />

          {/* ── IDENTIFICAÇÃO ── */}
          {activeStep === 'identification' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <section className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <div className="mb-5 inline-flex rounded-xl bg-slate-100 p-1">
                  <button type="button" onClick={() => setMode('register')} className="rounded-lg px-4 py-2 text-sm font-semibold transition-all" style={{ backgroundColor: mode === 'register' ? 'white' : 'transparent', color: mode === 'register' ? N : '#64748B' }}>Criar cadastro</button>
                  <button type="button" onClick={() => setMode('login')} className="rounded-lg px-4 py-2 text-sm font-semibold transition-all" style={{ backgroundColor: mode === 'login' ? 'white' : 'transparent', color: mode === 'login' ? N : '#64748B' }}>Ja tenho conta</button>
                </div>
                {mode === 'register' ? (
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: N }}>Cadastro rapido do paciente</h2>
                    <p className="mt-1 text-sm" style={{ color: '#64748B' }}>Voce usara estes dados para acessar documentos, historico e proximas consultas.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Nome completo"><input value={patientName} onChange={(e) => setPatientName(e.target.value)} className="input-field" placeholder="Maria Silva" /></Field>
                      <Field label="Celular"><input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="(11) 99999-9999" /></Field>
                      <Field label="E-mail"><input value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" type="email" placeholder="voce@email.com" /></Field>
                      <Field label="Senha"><input value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" type="password" placeholder="Minimo 6 caracteres" /></Field>
                    </div>
                    <label className="mt-5 flex items-start gap-3 rounded-xl p-4 text-sm" style={{ border: '1px solid #E2E8F0', color: '#475569' }}>
                      <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#17B890]" />
                      <span>Li e aceito os termos de uso, a politica de privacidade e entendo que a Medicare nao realiza atendimentos de emergencia.</span>
                    </label>
                    <button type="button" disabled={!canCreateAccount} onClick={() => setActiveStep('specialty')} className="mt-5 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}>Criar conta e continuar</button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: N }}>Entrar na conta do paciente</h2>
                    <p className="mt-1 text-sm" style={{ color: '#64748B' }}>Entre para recuperar seus dados e continuar o agendamento com seguranca.</p>
                    <div className="mt-6 grid gap-4">
                      <Field label="E-mail"><input className="input-field" type="email" placeholder="voce@email.com" /></Field>
                      <Field label="Senha"><input className="input-field" type="password" placeholder="Sua senha" /></Field>
                    </div>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button type="button" onClick={() => setActiveStep('specialty')} className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}>Entrar e continuar</button>
                      <Link href="/auth/login" className="text-sm font-semibold hover:underline" style={{ color: T }}>Entrar pela pagina completa</Link>
                    </div>
                  </div>
                )}
              </section>
              <aside className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <h2 className="text-lg font-bold" style={{ color: N }}>Por que criar conta?</h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  <p>Seu historico clinico e documentos ficam organizados para consultas futuras.</p>
                  <p>O medico recebe as informacoes corretas antes do atendimento.</p>
                  <p>Receitas, orientacoes e comprovantes ficam disponiveis no seu painel.</p>
                </div>
              </aside>
            </div>
          )}

          {/* ── ESPECIALIDADE ── */}
          {activeStep === 'specialty' && (
            <section className="mt-8 space-y-3">
              <div className="mb-5">
                <h2 className="text-xl font-bold" style={{ color: N }}>Especialidades disponiveis</h2>
                <p className="mt-1 text-sm" style={{ color: '#64748B' }}>Selecione uma opcao para seguir para a pre-triagem.</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SPECIALTIES.map((specialty) => {
                  const isSelected = specialty.key === selectedSpecialty
                  const isAiSuggested = aiResult?.specialty === specialty.key
                  return (
                    <button key={specialty.key} type="button" onClick={() => { setSelectedSpecialty(specialty.key); setShowAiPanel(false) }}
                      className="flex items-center gap-3 rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm focus:outline-none"
                      style={{ borderColor: isSelected ? T : '#E2E8F0', backgroundColor: isSelected ? '#F0FDF9' : 'white' }}>
                      <Image src={specialty.icon} alt={specialty.label} width={40} height={40} className="flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold" style={{ color: N }}>{specialty.label}</p>
                          {isAiSuggested && !isSelected && (
                            <span className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: '#E6FAF6', color: T }}>IA</span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: '#64748B' }}>R$ {specialty.price},00 - 30 min</p>
                      </div>
                      {isSelected && <span style={{ color: T }}>✓</span>}
                    </button>
                  )
                })}
              </div>

              {/* Painel IA */}
              <div className="rounded-xl overflow-hidden transition-all" style={{ border: `2px solid ${showAiPanel ? T : '#E2E8F0'}` }}>
                <button type="button"
                  onClick={() => { setShowAiPanel(!showAiPanel); if (showAiPanel) { setAiResult(null); setAiError(null) } }}
                  className="w-full flex items-center gap-4 p-4 text-left"
                  style={{ backgroundColor: showAiPanel ? '#F0FDF9' : 'white' }}>
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl" style={{ backgroundColor: '#F0FDF9' }}>🤔</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: N }}>Nao sei qual especialidade escolher</p>
                    <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Descreva seus sintomas e nossa IA indicara a especialidade mais adequada.</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{ transform: showAiPanel ? 'rotate(180deg)' : 'none' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showAiPanel && (
                  <div className="px-4 pb-5 pt-2" style={{ borderTop: `1px solid ${T}30`, backgroundColor: '#FAFFFE' }}>
                    <p className="mb-3 text-xs" style={{ color: '#64748B' }}>
                      Descreva o que voce esta sentindo. Nao inclua nome ou dados pessoais — apenas os sintomas.
                    </p>
                    <textarea
                      value={aiSymptoms}
                      onChange={(e) => setAiSymptoms(e.target.value.slice(0, 500))}
                      placeholder="Ex: Dor de cabeca frequente, tontura ao levantar, sensacao de pressao atras dos olhos ha 3 dias..."
                      rows={3}
                      className="w-full rounded-xl border px-3 py-2.5 text-sm text-gray-900 resize-none outline-none transition-all"
                      style={{
                        borderColor: aiSymptoms.length > 0 ? T : '#E2E8F0',
                        boxShadow: aiSymptoms.length > 0 ? `0 0 0 3px ${T}15` : 'none',
                        backgroundColor: 'white',
                      }}
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-xs" style={{ color: '#94A3B8' }}>{aiSymptoms.length}/500</span>
                      <button type="button" onClick={handleAiSuggest}
                        disabled={aiSymptoms.trim().length < 10 || aiLoading}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: T }}>
                        {aiLoading ? <><SpinnerIcon /> Analisando...</> : <>✨ Identificar especialidade</>}
                      </button>
                    </div>

                    {aiError && (
                      <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{aiError}</div>
                    )}

                    {aiResult && (
                      <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: '#F0FDF9', border: `1px solid ${T}50` }}>
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: T }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: T }}>Especialidade indicada pela IA</p>
                            <p className="mt-0.5 text-base font-bold" style={{ color: N }}>{aiResult.label}</p>
                            <p className="mt-1 text-xs leading-relaxed" style={{ color: '#475569' }}>{aiResult.reason}</p>
                            <p className="mt-2 text-xs italic" style={{ color: '#94A3B8' }}>Esta e uma sugestao de triagem, nao um diagnostico medico.</p>
                          </div>
                        </div>
                        <button type="button"
                          onClick={() => { setSelectedSpecialty(aiResult.specialty); setShowAiPanel(false) }}
                          className="mt-3 w-full rounded-lg py-2.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: T }}>
                          Confirmar — {aiResult.label}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <StepActions backLabel="Voltar" nextLabel="Continuar para pre-triagem" onBack={() => setActiveStep('identification')} onNext={() => setActiveStep('triage')} />
            </section>
          )}

          {/* ── TRIAGEM ── */}
          {activeStep === 'triage' && (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
              <div className="mb-6"><p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p><h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Pre-triagem</h2><p className="mt-1 text-sm" style={{ color: '#64748B' }}>Responda algumas perguntas rapidas para orientar o atendimento medico.</p></div>
              <div className="grid gap-5">
                <Field label="Descreva seus sintomas principais">
                  <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="input-field min-h-[130px] resize-none" placeholder="Ex.: dor de garganta, febre baixa e tosse ha dois dias, quando piora, se tomou algum remedio e se houve contato com pessoas doentes..." />
                  <p className="mt-1 text-xs" style={{ color: canContinueTriage ? T : '#94A3B8' }}>{symptomsLength}/{MIN_SYMPTOMS_LENGTH} caracteres minimos obrigatorios.</p>
                </Field>
                <Field label="Quando comecou?"><select value={duration} onChange={(e) => setDuration(e.target.value)} className="input-field"><option>Hoje</option><option>2 a 3 dias</option><option>4 a 7 dias</option><option>Mais de uma semana</option></select></Field>
                <div><p className="mb-3 text-sm font-semibold" style={{ color: N }}>Alguma destas situacoes se aplica?</p><div className="grid gap-3 sm:grid-cols-2"><Toggle checked={hasFever} label="Tem febre?" onChange={setHasFever} /><Toggle checked={hasPain} label="Tem dor?" onChange={setHasPain} /><Toggle checked={hasShortnessOfBreath} label="Tem falta de ar?" onChange={setHasShortnessOfBreath} /><Toggle checked={hasAllergy} label="Tem alergias?" onChange={setHasAllergy} /><Toggle checked={usesMedication} label="Usa medicamento continuo?" onChange={setUsesMedication} /><Toggle checked={isPregnant} label="Esta gravida ou ha suspeita?" onChange={setIsPregnant} /></div></div>
              </div>
              <StepActions backLabel="Voltar para especialidade" nextLabel="Continuar para documentos" onBack={() => setActiveStep('specialty')} onNext={() => setActiveStep('documents')} nextDisabled={!canContinueTriage} />
            </section>
          )}

          {/* ── DOCUMENTOS ── */}
          {activeStep === 'documents' && (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
              <div className="mb-6"><p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p><h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Documentos</h2><p className="mt-1 text-sm" style={{ color: '#64748B' }}>Nenhum documento original sera salvo no servidor. O arquivo sera lido temporariamente apenas para extrair informacoes e gerar um resumo de apoio a analise do profissional.</p></div>
              <div className="mb-5 rounded-2xl p-4 text-sm leading-relaxed" style={{ backgroundColor: '#F0FDF9', color: '#475569', border: `1px solid ${T}30` }}><strong style={{ color: N }}>Privacidade:</strong> os documentos originais nao ficam armazenados no servidor. A Medicare usa o arquivo somente durante o processamento para gerar um resumo destinado a analise do profissional de saude.</div>
              {documentError && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{documentError}</div>}
              <div className="grid gap-4 lg:grid-cols-3">
                <StepCard number="1" title="Selecionar arquivo">
                  <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-all hover:bg-white" style={{ borderColor: '#BFEDE2', backgroundColor: '#F8FFFE' }}>
                    <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: '#E6FAF6', color: T }}><UploadIcon /></span><span className="text-sm font-semibold" style={{ color: N }}>Escolher arquivo</span><span className="mt-1 text-xs" style={{ color: '#64748B' }}>PDF, JPG ou PNG ate 5 MB</span>
                    <input type="file" multiple accept="application/pdf,image/jpeg,image/jpg,image/png" className="hidden" onChange={(e) => { handleDocumentSelection(e.target.files); e.currentTarget.value = '' }} />
                  </label>
                  {pendingDocuments.length > 0 && <div className="mt-3 space-y-1">{pendingDocuments.map((d) => <p key={d.id} className="truncate text-xs" style={{ color: '#64748B' }}>{d.name} - {formatBytes(d.size)}</p>)}</div>}
                </StepCard>
                <StepCard number="2" title="Tipo de documento"><Field label="Classificacao"><select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="input-field">{DOCUMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></Field><p className="mt-3 text-xs leading-relaxed" style={{ color: '#64748B' }}>Escolha o tipo correto para ajudar a IA a organizar as informacoes sem confundir o medico.</p></StepCard>
                <StepCard number="3" title="Anexar ao atendimento"><button type="button" onClick={attachPendingDocuments} disabled={pendingDocuments.length === 0 || documentProcessing} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}>{documentProcessing ? 'Extraindo texto...' : 'Anexar documento'}</button><p className="mt-3 text-xs leading-relaxed" style={{ color: '#64748B' }}>Nada e analisado antes de voce clicar em anexar. Revise o arquivo escolhido antes de continuar.</p></StepCard>
              </div>
              <div className="mt-6 rounded-2xl p-5" style={{ border: '1px solid #DDE7EE', backgroundColor: '#F8FAFC' }}><p className="text-sm font-semibold" style={{ color: N }}>Documentos adicionados</p>{documents.length === 0 ? <p className="mt-2 text-sm" style={{ color: '#64748B' }}>Nenhum documento adicionado. Esta etapa e opcional; voce pode seguir sem anexos.</p> : <div className="mt-4 space-y-3">{documents.map((d) => <div key={d.id} className="rounded-xl bg-white p-4" style={{ border: '1px solid #DDE7EE' }}><div className="flex items-center justify-between gap-4"><div className="min-w-0"><p className="truncate text-sm font-semibold" style={{ color: N }}>{d.name}</p><p className="mt-0.5 text-xs" style={{ color: '#64748B' }}>{documentTypeLabel(d.type)} - {formatBytes(d.size)} - OCR concluido</p></div><button type="button" onClick={() => removeDocument(d.id)} className="text-xs font-semibold hover:underline" style={{ color: '#BE123C' }}>Remover</button></div><p className="mt-3 line-clamp-2 text-xs leading-relaxed" style={{ color: '#64748B' }}>{d.extractedText}</p></div>)}</div>}</div>
              <StepActions backLabel="Voltar para pre-triagem" nextLabel="Continuar para pagamento" onBack={() => setActiveStep('triage')} onNext={() => setActiveStep('payment')} nextDisabled={documentProcessing} />
            </section>
          )}

          {/* ── PAGAMENTO ── */}
          {activeStep === 'payment' && (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
              <div className="mb-6"><p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p><h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Pagamento</h2><p className="mt-1 text-sm" style={{ color: '#64748B' }}>Esta etapa esta pronta para receber Pix/cartao depois. Por enquanto, voce pode avancar direto para a consulta.</p></div>
              <div className="grid gap-4 md:grid-cols-3"><SummaryCard label="Especialidade" value={selected.label} /><SummaryCard label="Documentos" value={`${documents.length} anexado${documents.length === 1 ? '' : 's'}`} /><SummaryCard label="Valor" value={`R$ ${selected.price},00`} /></div>
              <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: '#F8FAFC', border: '1px solid #DDE7EE' }}><p className="text-sm font-semibold" style={{ color: N }}>Pagamento em preparacao</p><p className="mt-2 text-sm" style={{ color: '#64748B' }}>O botao abaixo simula a confirmacao e gera o resumo da IA usando pre-triagem, toggles e documentos processados.</p></div>
              <StepActions backLabel="Voltar para documentos" nextLabel="Gerar resumo e avancar" onBack={() => setActiveStep('documents')} onNext={prepareConsultationSummary} />
            </section>
          )}

          {/* ── CONSULTA ── */}
          {activeStep === 'consultation' && (
            <section className="mt-8 space-y-4">
              {!videoToken ? (
                <div className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                  <div className="mb-6"><p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p><h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Sala de consulta</h2><p className="mt-1 text-sm" style={{ color: '#64748B' }}>Resumo enviado ao medico. Quando estiver pronto, clique em Entrar na consulta para iniciar a videochamada.</p></div>
                  <div className="grid gap-4 md:grid-cols-3"><SummaryCard label="Status" value="Aguardando medico" /><SummaryCard label="Pre-triagem" value="Registrada" /><SummaryCard label="Documentos" value={`${documents.length} processado${documents.length === 1 ? '' : 's'}`} /></div>
                  <AiSummaryCard status={summaryStatus} summary={consultationSummary} error={summaryError} />
                  {videoError && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{videoError}</div>
                  )}
                  <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: '#DDE7EE' }}>
                    <button type="button" onClick={() => setActiveStep('payment')} className="rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:bg-slate-50" style={{ border: '1px solid #DDE7EE', color: N }}>Voltar para pagamento</button>
                    <button type="button" onClick={handleEnterCall} disabled={summaryStatus === 'loading' || videoLoading}
                      className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}>
                      {videoLoading ? <><SpinnerIcon /> Conectando...</> : <>📹 Entrar na consulta</>}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-4 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                  <div className="mb-4 flex items-center justify-between">
                    <div><p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p><h2 className="text-lg font-bold" style={{ color: N }}>Consulta em andamento</h2></div>
                    <button type="button" onClick={() => { setVideoToken(null); setVideoServerUrl(null) }}
                      className="rounded-lg px-3 py-2 text-xs font-semibold transition-all hover:bg-red-50"
                      style={{ border: '1px solid #FCA5A5', color: '#DC2626' }}>
                      Encerrar consulta
                    </button>
                  </div>
                  <Suspense fallback={<div className="flex h-60 items-center justify-center rounded-2xl text-sm" style={{ backgroundColor: '#0A2342', color: 'white' }}>Carregando sala de video...</div>}>
                    <VideoRoom
                      token={videoToken}
                      serverUrl={videoServerUrl!}
                      onDisconnect={() => { setVideoToken(null); setVideoServerUrl(null) }}
                    />
                  </Suspense>
                </div>
              )}
            </section>
          )}
        </div>
      </section>

      <style>{`
        .input-field {
          width: 100%;
          border-radius: 10px;
          border: 1.5px solid #E2E8F0;
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: white;
          color: #0F172A;
        }
        .input-field:focus {
          border-color: ${T};
          box-shadow: 0 0 0 3px ${T}20;
        }
        @keyframes spin { to { transform: rotate(360deg) } }
        .spin { animation: spin 0.8s linear infinite }
      `}</style>
    </main>
  )
}

function Progress({ activeStep }: { activeStep: FlowStep }) {
  const steps = ['Identificacao', 'Especialidade', 'Pre-triagem', 'Documentos', 'Pagamento', 'Consulta']
  const activeIndex = activeStep === 'identification' ? 0 : activeStep === 'specialty' ? 1 : activeStep === 'triage' ? 2 : activeStep === 'documents' ? 3 : activeStep === 'payment' ? 4 : 5

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          {index > 0 && <div className="h-px w-4 bg-gray-200" />}
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium" style={{ backgroundColor: index <= activeIndex ? T : '#F1F5F9', color: index <= activeIndex ? 'white' : '#64748B' }}>{index < activeIndex ? '✓' : index + 1}</div>
          <span className={index === activeIndex ? 'font-medium text-gray-900' : 'text-gray-400'}>{step}</span>
        </div>
      ))}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-semibold" style={{ color: N }}>{label}</span>{children}</label>
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center justify-between gap-4 rounded-xl p-4 text-left transition-all" style={{ border: `1px solid ${checked ? T : '#DDE7EE'}`, backgroundColor: checked ? '#F0FDF9' : 'white' }}>
      <span className="text-sm font-medium" style={{ color: N }}>{label}</span>
      <span className="flex h-6 w-11 flex-shrink-0 items-center rounded-full p-0.5 transition-all" style={{ backgroundColor: checked ? T : '#CBD5E1' }}><span className="h-5 w-5 rounded-full bg-white transition-all" style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} /></span>
    </button>
  )
}

function StepActions({ backLabel, nextLabel, onBack, onNext, nextDisabled = false }: { backLabel: string; nextLabel: string; onBack: () => void; onNext: () => void; nextDisabled?: boolean }) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: '#DDE7EE' }}>
      <button type="button" onClick={onBack} className="rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:bg-slate-50" style={{ border: '1px solid #DDE7EE', color: N }}>{backLabel}</button>
      <button type="button" onClick={onNext} disabled={nextDisabled} className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}>{nextLabel}</button>
    </div>
  )
}

function StepCard({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <div className="rounded-2xl p-5" style={{ border: '1px solid #DDE7EE', backgroundColor: '#F8FAFC' }}><div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: T }}>{number}</span><h3 className="text-sm font-bold" style={{ color: N }}>{title}</h3></div>{children}</div>
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl p-5" style={{ backgroundColor: '#F8FAFC', border: '1px solid #DDE7EE' }}><p className="text-xs" style={{ color: '#64748B' }}>{label}</p><p className="mt-1 text-sm font-bold" style={{ color: N }}>{value}</p></div>
}

function AiSummaryCard({ status, summary, error }: { status: AiStatus; summary: string; error: string }) {
  const parsed = parseSummary(summary)
  return (
    <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: '#F8FAFC', border: '1px solid #DDE7EE' }}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-semibold" style={{ color: N }}>Resumo da IA para apoio medico</p><p className="mt-1 text-xs" style={{ color: '#64748B' }}>Gerado a partir da pre-triagem, respostas objetivas e textos extraidos dos documentos.</p></div>
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: status === 'ready' ? '#E6FAF6' : '#EEF2F7', color: status === 'error' ? '#BE123C' : T }}>
          {status === 'loading' ? 'Gerando...' : status === 'ready' ? 'Concluido' : status === 'error' ? 'Erro' : 'Aguardando'}
        </span>
      </div>
      {status === 'loading' && <p className="mt-5 text-sm" style={{ color: '#64748B' }}>A IA esta organizando as informacoes para o medico.</p>}
      {status === 'error' && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {status === 'ready' && parsed && (
        <div className="mt-5 grid gap-4">
          <SummarySection title="Queixa principal" value={parsed.queixa_principal} />
          <SummaryList title="Pontos de atencao" values={parsed.pontos_de_atencao} />
          <SummaryList title="Sugestoes de doencas / hipoteses clinicas" values={parsed.hipoteses_clinicas} />
          <SummaryList title="CID-10 provaveis" values={parsed.cid10_provaveis} />
          <SummaryList title="Respostas objetivas" values={parsed.respostas_objetivas} />
          <SummaryList title="Documentos resumidos" values={parsed.documentos_resumidos} />
          <SummaryList title="Perguntas sugeridas para o medico" values={parsed.perguntas_sugeridas_para_o_medico} />
          <SummarySection title="Limitacoes" value={parsed.limitacoes} />
        </div>
      )}
      {status === 'ready' && !parsed && <pre className="mt-5 overflow-auto rounded-xl bg-white p-4 text-xs" style={{ color: '#475569' }}>{summary}</pre>}
    </div>
  )
}

function SummarySection({ title, value }: { title: string; value: string | undefined }) {
  if (!value) return null
  return <div className="rounded-xl bg-white p-4" style={{ border: '1px solid #E2E8F0' }}><p className="text-xs font-semibold" style={{ color: T }}>{title}</p><p className="mt-2 text-sm leading-relaxed" style={{ color: '#475569' }}>{value}</p></div>
}

function SummaryList({ title, values }: { title: string; values: string[] | undefined }) {
  if (!values || values.length === 0) return null
  return <div className="rounded-xl bg-white p-4" style={{ border: '1px solid #E2E8F0' }}><p className="text-xs font-semibold" style={{ color: T }}>{title}</p><ul className="mt-2 space-y-1 text-sm leading-relaxed" style={{ color: '#475569' }}>{values.map((v, i) => <li key={`${title}-${i}`}>- {v}</li>)}</ul></div>
}

function SpinnerIcon() {
  return (
    <svg className="spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

function UploadIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
}

function documentTypeLabel(value: string) {
  return DOCUMENT_TYPES.find((t) => t.value === value)?.label ?? 'Documento'
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function getApiError(response: Response) {
  try {
    const body = await response.json() as { message?: string | string[]; error?: string }
    if (Array.isArray(body.message)) return body.message.join(' ')
    return body.message ?? body.error ?? 'Erro ao chamar a API.'
  } catch {
    return 'Erro ao chamar a API.'
  }
}

function parseSummary(summary: string) {
  try {
    return JSON.parse(summary) as {
      queixa_principal?: string
      pontos_de_atencao?: string[]
      hipoteses_clinicas?: string[]
      cid10_provaveis?: string[]
      respostas_objetivas?: string[]
      documentos_resumidos?: string[]
      perguntas_sugeridas_para_o_medico?: string[]
      limitacoes?: string
    }
  } catch {
    return null
  }
}
