'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type FlowStep = 'identification' | 'specialty' | 'triage'

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
  const [severity, setSeverity] = useState(3)

  const selected = SPECIALTIES.find((specialty) => specialty.key === selectedSpecialty) ?? SPECIALTIES[0]
  const canCreateAccount =
    patientName.trim().length > 2 &&
    email.includes('@') &&
    phone.trim().length >= 10 &&
    password.length >= 6 &&
    acceptedTerms
  const canContinueTriage = symptoms.trim().length >= 12

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
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: '#64748B' }}>
              {activeStep === 'identification' && 'Para proteger seus dados de saúde e manter seu histórico de atendimento, a consulta começa com login ou cadastro do paciente.'}
              {activeStep === 'specialty' && 'Agora selecione o tipo de atendimento desejado para continuar o agendamento.'}
              {activeStep === 'triage' && 'Essas informações ajudam o médico a se preparar antes da consulta.'}
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

              <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: '#DDE7EE' }}>
                <button
                  type="button"
                  onClick={() => setActiveStep('identification')}
                  className="rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:bg-white"
                  style={{ border: '1px solid #DDE7EE', color: N }}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('triage')}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}
                >
                  Continuar para pré-triagem
                </button>
              </div>
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
                    placeholder="Ex.: dor de garganta, febre baixa e tosse há dois dias..."
                  />
                  <p className="mt-1 text-xs" style={{ color: symptoms.trim().length >= 12 ? T : '#94A3B8' }}>
                    Mínimo recomendado: 12 caracteres.
                  </p>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Quando começou?">
                    <select value={duration} onChange={(event) => setDuration(event.target.value)} className="input-field">
                      <option>Hoje</option>
                      <option>2 a 3 dias</option>
                      <option>4 a 7 dias</option>
                      <option>Mais de uma semana</option>
                    </select>
                  </Field>

                  <Field label={`Intensidade: ${severity}/5`}>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={severity}
                      onChange={(event) => setSeverity(Number(event.target.value))}
                      className="w-full accent-[#17B890]"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: '#DDE7EE' }}>
                <button
                  type="button"
                  onClick={() => setActiveStep('specialty')}
                  className="rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:bg-slate-50"
                  style={{ border: '1px solid #DDE7EE', color: N }}
                >
                  Voltar para especialidade
                </button>
                <button
                  type="button"
                  disabled={!canContinueTriage}
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: T, boxShadow: `0 4px 16px ${T}35` }}
                >
                  Continuar para documentos
                </button>
              </div>
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
  const activeIndex = activeStep === 'identification' ? 0 : activeStep === 'specialty' ? 1 : 2

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
