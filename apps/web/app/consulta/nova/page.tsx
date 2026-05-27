'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type FlowStep = 'identification' | 'specialty' | 'triage' | 'documents' | 'payment'
type UploadedDocument = { id: string; name: string; size: number; type: string }
type PendingDocument = { id: string; name: string; size: number }

const MIN_SYMPTOMS_LENGTH = 50
const MAX_DOCUMENT_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

const DOCUMENT_TYPES = [
  { value: 'LAB_RESULT', label: 'Exame laboratorial' },
  { value: 'MEDICAL_REPORT', label: 'Laudo médico' },
  { value: 'PRESCRIPTION', label: 'Receita médica' },
  { value: 'CLINICAL_REPORT', label: 'Relatório clínico' },
  { value: 'OTHER', label: 'Outro documento' },
]

const SPECIALTIES: { key: string; label: string; icon: string; price: number }[] = [
  { key: 'CLINICAL_MEDICINE',    label: 'Clínica Médica',       icon: '/clm.png', price: 120 },
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

  const selected = SPECIALTIES.find((specialty) => specialty.key === selectedSpecialty) ?? SPECIALTIES[0]
  const symptomsLength = symptoms.trim().length
  const canCreateAccount =
    patientName.trim().length > 2 &&
    email.includes('@') &&
    phone.trim().length >= 10 &&
    password.length >= 6 &&
    acceptedTerms
  const canContinueTriage = symptomsLength >= MIN_SYMPTOMS_LENGTH

  function handleDocumentSelection(files: FileList | null) {
    if (!files) return

    const selectedFiles = Array.from(files)
    const invalidType = selectedFiles.find((file) => !ALLOWED_DOCUMENT_TYPES.includes(file.type))
    if (invalidType) {
      setDocumentError(`${invalidType.name} não é aceito. Envie apenas PDF, JPG ou PNG.`)
      setPendingDocuments([])
      return
    }

    const oversized = selectedFiles.find((file) => file.size > MAX_DOCUMENT_SIZE_BYTES)
    if (oversized) {
      setDocumentError(`${oversized.name} tem ${formatBytes(oversized.size)}. O limite é 5 MB por arquivo.`)
      setPendingDocuments([])
      return
    }

    setDocumentError('')
    setPendingDocuments(
      selectedFiles.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
      })),
    )
  }

  function attachPendingDocuments() {
    if (pendingDocuments.length === 0) {
      setDocumentError('Selecione pelo menos um arquivo antes de anexar.')
      return
    }

    setDocumentError('')
    setDocuments((current) => [
      ...current,
      ...pendingDocuments.map((document) => ({ ...document, type: documentType })),
    ])
    setPendingDocuments([])
  }

  function removeDocument(id: string) {
    setDocuments((current) => current.filter((document) => document.id !== id))
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F8FAFC', color: N, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <section className="relative overflow-hidden px-4 py-10 lg:px-6 lg:py-14" style={SOFT_BG}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
        <div className="relative mx-auto max-w-5xl">
          <Link href="/" className="mb-8 inline-flex items-center text-sm font-semibold hover:underline" style={{ color: T }}>
            Voltar para o início
          </Link>

          <div className="mb-8">
            <p className="text-xs font-semibold" style={{ color: T }}>Nova consulta</p>
            <h1 className="mt-2 text-3xl font-bold" style={{ color: N }}>
              {activeStep === 'identification' && 'Antes de começar, identifique-se'}
              {activeStep === 'specialty' && 'Escolha a especialidade da consulta'}
              {activeStep === 'triage' && 'Conte o que você está sentindo'}
              {activeStep === 'documents' && 'Envie documentos e exames'}
              {activeStep === 'payment' && 'Confirme o pagamento'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: '#64748B' }}>
              {activeStep === 'identification' && 'Para proteger seus dados de saúde e manter seu histórico de atendimento, a consulta começa com login ou cadastro do paciente.'}
              {activeStep === 'specialty' && 'Agora selecione o tipo de atendimento desejado para continuar o agendamento.'}
              {activeStep === 'triage' && 'Essas informações ajudam o médico a se preparar antes da consulta.'}
              {activeStep === 'documents' && 'Selecione o arquivo, escolha o tipo e só então anexe. Assim você evita enviar algo errado para análise.'}
              {activeStep === 'payment' && 'Confira o resumo da consulta antes de seguir para a cobrança.'}
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Atenção:</strong> este serviço não é indicado para emergências médicas. Em caso de risco imediato à vida, ligue <strong>192 (SAMU)</strong>.
          </div>

          <Progress activeStep={activeStep} />

          {activeStep === 'identification' && (
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <section className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <div className="mb-5 inline-flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
                    style={{ backgroundColor: mode === 'register' ? 'white' : 'transparent', color: mode === 'register' ? N : '#64748B' }}
                  >
                    Criar cadastro
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
                    style={{ backgroundColor: mode === 'login' ? 'white' : 'transparent', color: mode === 'login' ? N : '#64748B' }}
                  >
                    Já tenho conta
                  </button>
                </div>

                {mode === 'register' ? (
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: N }}>Cadastro rápido do paciente</h2>
                    <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
                      Você usará estes dados para acessar documentos, histórico e próximas consultas.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Nome completo">
                        <input value={patientName} onChange={(event) => setPatientName(event.target.value)} className="input-field" placeholder="Maria Silva" />
                      </Field>
                      <Field label="Celular">
                        <input value={phone} onChange={(event) => setPhone(event.target.value)} className="input-field" placeholder="(11) 99999-9999" />
                      </Field>
                      <Field label="E-mail">
                        <input value={email} onChange={(event) => setEmail(event.target.value)} className="input-field" type="email" placeholder="voce@email.com" />
                      </Field>
                      <Field label="Senha">
                        <input value={password} onChange={(event) => setPassword(event.target.value)} className="input-field" type="password" placeholder="Mínimo 6 caracteres" />
                      </Field>
                    </div>

                    <label className="mt-5 flex items-start gap-3 rounded-xl p-4 text-sm" style={{ border: '1px solid #E2E8F0', color: '#475569' }}>
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(event) => setAcceptedTerms(event.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[#17B890]"
                      />
                      <span>
                        Li e aceito os termos de uso, a política de privacidade e entendo que a Medicare não realiza atendimentos de emergência.
                      </span>
                    </label>

                    <button
                      type="button"
                      disabled={!canCreateAccount}
                      onClick={() => setActiveStep('specialty')}
                      className="mt-5 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}
                    >
                      Criar conta e continuar
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: N }}>Entrar na conta do paciente</h2>
                    <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
                      Entre para recuperar seus dados e continuar o agendamento com segurança.
                    </p>

                    <div className="mt-6 grid gap-4">
                      <Field label="E-mail">
                        <input className="input-field" type="email" placeholder="voce@email.com" />
                      </Field>
                      <Field label="Senha">
                        <input className="input-field" type="password" placeholder="Sua senha" />
                      </Field>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button
                        type="button"
                        onClick={() => setActiveStep('specialty')}
                        className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}
                      >
                        Entrar e continuar
                      </button>
                      <Link href="/auth/login" className="text-sm font-semibold hover:underline" style={{ color: T }}>
                        Entrar pela página completa
                      </Link>
                    </div>
                  </div>
                )}
              </section>

              <aside className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
                <h2 className="text-lg font-bold" style={{ color: N }}>Por que criar conta?</h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  <p>Seu histórico clínico e documentos ficam organizados para consultas futuras.</p>
                  <p>O médico recebe as informações corretas antes do atendimento.</p>
                  <p>Receitas, orientações e comprovantes ficam disponíveis no seu painel.</p>
                </div>
              </aside>
            </div>
          )}

          {activeStep === 'specialty' && (
            <section className="mt-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold" style={{ color: N }}>Especialidades disponíveis</h2>
                  <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
                    Selecione uma opção para seguir para a pré-triagem.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SPECIALTIES.map((specialty) => {
                  const selected = specialty.key === selectedSpecialty

                  return (
                    <button
                      key={specialty.key}
                      type="button"
                      onClick={() => setSelectedSpecialty(specialty.key)}
                      className="flex items-center gap-3 rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm focus:outline-none"
                      style={{
                        borderColor: selected ? T : '#E2E8F0',
                        backgroundColor: selected ? '#F0FDF9' : 'white',
                      }}
                    >
                      <Image src={specialty.icon} alt={specialty.label} width={40} height={40} className="flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold" style={{ color: N }}>{specialty.label}</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>R$ {specialty.price},00 · 30 min</p>
                      </div>
                      {selected && <span style={{ color: T }}>✓</span>}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:opacity-90 focus:outline-none"
                style={{ borderColor: T, backgroundColor: '#F0FDF9' }}
              >
                <span className="text-3xl">?</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: N }}>Não sei qual especialidade escolher</p>
                  <p className="mt-0.5 text-xs" style={{ color: '#475569' }}>
                    Descreva seus sintomas e nossa IA irá indicar a especialidade mais adequada para você.
                  </p>
                </div>
                <span className="text-sm font-semibold" style={{ color: T }}>Em breve</span>
              </button>

              <StepActions
                backLabel="Voltar"
                nextLabel="Continuar para pré-triagem"
                onBack={() => setActiveStep('identification')}
                onNext={() => setActiveStep('triage')}
              />
            </section>
          )}

          {activeStep === 'triage' && (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
              <div className="mb-6">
                <p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p>
                <h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Pré-triagem</h2>
                <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
                  Responda algumas perguntas rápidas para orientar o atendimento médico.
                </p>
              </div>

              <div className="grid gap-5">
                <Field label="Descreva seus sintomas principais">
                  <textarea
                    value={symptoms}
                    onChange={(event) => setSymptoms(event.target.value)}
                    className="input-field min-h-[130px] resize-none"
                    placeholder="Ex.: dor de garganta, febre baixa e tosse há dois dias, quando piora, se tomou algum remédio e se houve contato com pessoas doentes..."
                  />
                  <p className="mt-1 text-xs" style={{ color: canContinueTriage ? T : '#94A3B8' }}>
                    {symptomsLength}/{MIN_SYMPTOMS_LENGTH} caracteres mínimos obrigatórios.
                  </p>
                </Field>

                <Field label="Quando começou?">
                  <select value={duration} onChange={(event) => setDuration(event.target.value)} className="input-field">
                    <option>Hoje</option>
                    <option>2 a 3 dias</option>
                    <option>4 a 7 dias</option>
                    <option>Mais de uma semana</option>
                  </select>
                </Field>

                <div>
                  <p className="mb-3 text-sm font-semibold" style={{ color: N }}>Alguma destas situações se aplica?</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Toggle checked={hasFever} label="Tem febre?" onChange={setHasFever} />
                    <Toggle checked={hasPain} label="Tem dor?" onChange={setHasPain} />
                    <Toggle checked={hasShortnessOfBreath} label="Tem falta de ar?" onChange={setHasShortnessOfBreath} />
                    <Toggle checked={hasAllergy} label="Tem alergias?" onChange={setHasAllergy} />
                    <Toggle checked={usesMedication} label="Usa medicamento contínuo?" onChange={setUsesMedication} />
                    <Toggle checked={isPregnant} label="Está grávida ou há suspeita?" onChange={setIsPregnant} />
                  </div>
                </div>
              </div>

              <StepActions
                backLabel="Voltar para especialidade"
                nextLabel="Continuar para documentos"
                onBack={() => setActiveStep('specialty')}
                onNext={() => setActiveStep('documents')}
                nextDisabled={!canContinueTriage}
              />
            </section>
          )}

          {activeStep === 'documents' && (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
              <div className="mb-6">
                <p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p>
                <h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Documentos</h2>
                <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
                  Os arquivos serão usados apenas para extrair texto e gerar uma análise de apoio. O documento original não será salvo.
                </p>
              </div>

              <div className="mb-5 rounded-2xl p-4 text-sm leading-relaxed" style={{ backgroundColor: '#F0FDF9', color: '#475569', border: `1px solid ${T}30` }}>
                <strong style={{ color: N }}>Privacidade:</strong> depois da extração, somente o texto extraído e o resumo gerado pela IA ficarão no histórico do paciente. O arquivo original será descartado.
              </div>

              {documentError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {documentError}
                </div>
              )}

              <div className="grid gap-4 lg:grid-cols-3">
                <StepCard number="1" title="Selecionar arquivo">
                  <label
                    className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-all hover:bg-white"
                    style={{ borderColor: '#BFEDE2', backgroundColor: '#F8FFFE' }}
                  >
                    <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: '#E6FAF6', color: T }}>
                      <UploadIcon />
                    </span>
                    <span className="text-sm font-semibold" style={{ color: N }}>Escolher arquivo</span>
                    <span className="mt-1 text-xs" style={{ color: '#64748B' }}>PDF, JPG ou PNG até 5 MB</span>
                    <input
                      type="file"
                      multiple
                      accept="application/pdf,image/jpeg,image/jpg,image/png"
                      className="hidden"
                      onChange={(event) => {
                        handleDocumentSelection(event.target.files)
                        event.currentTarget.value = ''
                      }}
                    />
                  </label>
                  {pendingDocuments.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {pendingDocuments.map((document) => (
                        <p key={document.id} className="truncate text-xs" style={{ color: '#64748B' }}>
                          {document.name} · {formatBytes(document.size)}
                        </p>
                      ))}
                    </div>
                  )}
                </StepCard>

                <StepCard number="2" title="Tipo de documento">
                  <Field label="Classificação">
                    <select value={documentType} onChange={(event) => setDocumentType(event.target.value)} className="input-field">
                      {DOCUMENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </Field>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: '#64748B' }}>
                    Escolha o tipo correto para ajudar a IA a organizar as informações sem confundir o médico.
                  </p>
                </StepCard>

                <StepCard number="3" title="Anexar ao atendimento">
                  <button
                    type="button"
                    onClick={attachPendingDocuments}
                    disabled={pendingDocuments.length === 0}
                    className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}
                  >
                    Anexar documento
                  </button>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: '#64748B' }}>
                    Nada é analisado antes de você clicar em anexar. Revise o arquivo escolhido antes de continuar.
                  </p>
                </StepCard>
              </div>

              <div className="mt-6 rounded-2xl p-5" style={{ border: '1px solid #DDE7EE', backgroundColor: '#F8FAFC' }}>
                <p className="text-sm font-semibold" style={{ color: N }}>Documentos adicionados</p>
                {documents.length === 0 ? (
                  <p className="mt-2 text-sm" style={{ color: '#64748B' }}>
                    Nenhum documento adicionado. Esta etapa é opcional; você pode seguir sem anexos.
                  </p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {documents.map((document) => (
                      <div key={document.id} className="flex items-center justify-between gap-4 rounded-xl bg-white p-4" style={{ border: '1px solid #DDE7EE' }}>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold" style={{ color: N }}>{document.name}</p>
                          <p className="mt-0.5 text-xs" style={{ color: '#64748B' }}>
                            {documentTypeLabel(document.type)} · {formatBytes(document.size)} · arquivo não será armazenado
                          </p>
                        </div>
                        <button type="button" onClick={() => removeDocument(document.id)} className="text-xs font-semibold hover:underline" style={{ color: '#BE123C' }}>
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <StepActions
                backLabel="Voltar para pré-triagem"
                nextLabel="Continuar para pagamento"
                onBack={() => setActiveStep('triage')}
                onNext={() => setActiveStep('payment')}
              />
            </section>
          )}

          {activeStep === 'payment' && (
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
              <div className="mb-6">
                <p className="text-xs font-semibold" style={{ color: T }}>{selected.label}</p>
                <h2 className="mt-2 text-xl font-bold" style={{ color: N }}>Pagamento</h2>
                <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
                  Confira as informações antes de confirmar a cobrança e entrar na fila de atendimento.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <SummaryCard label="Especialidade" value={selected.label} />
                <SummaryCard label="Documentos" value={`${documents.length} anexado${documents.length === 1 ? '' : 's'}`} />
                <SummaryCard label="Valor" value={`R$ ${selected.price},00`} />
              </div>

              <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: '#F8FAFC', border: '1px solid #DDE7EE' }}>
                <p className="text-sm font-semibold" style={{ color: N }}>Forma de pagamento</p>
                <p className="mt-2 text-sm" style={{ color: '#64748B' }}>
                  Próxima fase: conectar Pix/cartão e, após confirmação, colocar o paciente na fila da consulta.
                </p>
              </div>

              <StepActions
                backLabel="Voltar para documentos"
                nextLabel="Confirmar pagamento"
                onBack={() => setActiveStep('documents')}
                onNext={() => undefined}
              />
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
      `}</style>
    </main>
  )
}

function Progress({ activeStep }: { activeStep: FlowStep }) {
  const steps = ['Identificação', 'Especialidade', 'Pré-triagem', 'Documentos', 'Pagamento', 'Consulta']
  const activeIndex = activeStep === 'identification' ? 0 : activeStep === 'specialty' ? 1 : activeStep === 'triage' ? 2 : activeStep === 'documents' ? 3 : 4

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          {index > 0 && <div className="h-px w-4 bg-gray-200" />}
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium"
            style={{
              backgroundColor: index <= activeIndex ? T : '#F1F5F9',
              color: index <= activeIndex ? 'white' : '#64748B',
            }}
          >
            {index < activeIndex ? '✓' : index + 1}
          </div>
          <span className={index === activeIndex ? 'font-medium text-gray-900' : 'text-gray-400'}>{step}</span>
        </div>
      ))}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold" style={{ color: N }}>{label}</span>
      {children}
    </label>
  )
}

function Toggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 rounded-xl p-4 text-left transition-all"
      style={{ border: `1px solid ${checked ? T : '#DDE7EE'}`, backgroundColor: checked ? '#F0FDF9' : 'white' }}
    >
      <span className="text-sm font-medium" style={{ color: N }}>{label}</span>
      <span
        className="flex h-6 w-11 flex-shrink-0 items-center rounded-full p-0.5 transition-all"
        style={{ backgroundColor: checked ? T : '#CBD5E1' }}
      >
        <span className="h-5 w-5 rounded-full bg-white transition-all" style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} />
      </span>
    </button>
  )
}

function StepActions({
  backLabel,
  nextLabel,
  onBack,
  onNext,
  nextDisabled = false,
}: {
  backLabel: string
  nextLabel: string
  onBack: () => void
  onNext: () => void
  nextDisabled?: boolean
}) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: '#DDE7EE' }}>
      <button
        type="button"
        onClick={onBack}
        className="rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:bg-slate-50"
        style={{ border: '1px solid #DDE7EE', color: N }}
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}
      >
        {nextLabel}
      </button>
    </div>
  )
}

function StepCard({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ border: '1px solid #DDE7EE', backgroundColor: '#F8FAFC' }}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: T }}>
          {number}
        </span>
        <h3 className="text-sm font-bold" style={{ color: N }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: '#F8FAFC', border: '1px solid #DDE7EE' }}>
      <p className="text-xs" style={{ color: '#64748B' }}>{label}</p>
      <p className="mt-1 text-sm font-bold" style={{ color: N }}>{value}</p>
    </div>
  )
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function documentTypeLabel(value: string) {
  return DOCUMENT_TYPES.find((type) => type.value === value)?.label ?? 'Documento'
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
