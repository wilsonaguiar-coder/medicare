'use client'

import { useState } from 'react'
import Link from 'next/link'

const P = '#0F4C81'   // primary
const S = '#2EC4B6'   // secondary
const BG = '#F8FAFC'  // background

export default function HomePage() {
  return (
    <div style={{ backgroundColor: BG, color: '#0F172A', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <EmergencyBanner />
      <Header />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Specialties />
      <TechSection />
      <ForDoctors />
      <Benefits />
      <Faq />
      <Footer />
    </div>
  )
}

/* ─── EMERGENCY BANNER ─── */
function EmergencyBanner() {
  return (
    <div className="text-center text-sm py-2 px-4" style={{ backgroundColor: '#FFF1F2', borderBottom: '1px solid #FECDD3', color: '#BE123C' }}>
      <strong>Atenção:</strong> Esta plataforma não se destina a emergências médicas.
      Em caso de risco à vida, acione o <strong>SAMU – 192</strong>.
    </div>
  )
}

/* ─── HEADER ─── */
function Header() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4" style={{ backgroundColor: 'rgba(248,250,252,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0' }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-lg font-bold" style={{ color: P }}>Medicare</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#como-funciona" className="hover:text-slate-900 transition-colors">Como funciona</a>
          <a href="#especialidades" className="hover:text-slate-900 transition-colors">Especialidades</a>
          <a href="#medicos" className="hover:text-slate-900 transition-colors">Para médicos</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Entrar
          </Link>
          <Link href="/auth/register" className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-sm"
            style={{ backgroundColor: P }}>
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="px-6 py-20 lg:py-28" style={{ background: `linear-gradient(135deg, #EFF6FF 0%, ${BG} 50%, #F0FDFA 100%)` }}>
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-6"
            style={{ backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Médicos disponíveis agora
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
            Consulte um médico<br />
            <span style={{ color: P }}>online em minutos</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
            Teleconsultas seguras com médicos verificados. Envie exames, converse por vídeo
            e receba orientações sem sair de casa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/consulta/nova"
              className="rounded-xl px-7 py-4 text-base font-semibold text-white text-center transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: P, boxShadow: `0 8px 24px ${P}40` }}>
              Agendar Consulta
            </Link>
            <Link href="/auth/register?role=doctor"
              className="rounded-xl px-7 py-4 text-base font-semibold text-center transition-all hover:bg-slate-100"
              style={{ border: `2px solid #E2E8F0`, color: '#0F172A' }}>
              Sou Médico
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {['Médicos verificados', 'Atendimento por vídeo', 'Pagamento seguro', 'Proteção de dados'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — App Mockup */}
        <div className="relative hidden lg:block">
          <AppMockup />
        </div>
      </div>
    </section>
  )
}

function AppMockup() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20" style={{ background: `linear-gradient(135deg, ${P}, ${S})` }} />

      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60" style={{ backgroundColor: '#0F172A' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: '#1E293B', borderBottom: '1px solid #334155' }}>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </div>
            <span className="text-white text-xs font-semibold">Medicare</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 text-xs">Ao vivo</span>
          </div>
        </div>

        {/* Video call area */}
        <div className="relative" style={{ height: 200, background: 'linear-gradient(135deg, #1E3A5F, #0F2740)' }}>
          {/* Doctor video (main) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}>
                DR
              </div>
              <p className="text-white text-xs font-medium">Dr. Rafael Costa</p>
              <p className="text-slate-400 text-xs">Clínica Médica</p>
            </div>
          </div>
          {/* Patient small video */}
          <div className="absolute bottom-3 right-3 h-16 w-24 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#0F4C8180', border: '2px solid #2EC4B6', backdropFilter: 'blur(8px)' }}>
            <div className="text-center">
              <div className="h-8 w-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: S }}>
                EU
              </div>
              <p className="text-white text-xs">Você</p>
            </div>
          </div>
          {/* Timer */}
          <div className="absolute top-3 left-3 rounded-md px-2 py-1 text-xs text-white font-mono"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            12:34
          </div>
          {/* Controls */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {[
              { icon: '🎤', active: true },
              { icon: '📹', active: true },
            ].map((c, i) => (
              <div key={i} className="h-7 w-7 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: c.active ? S : '#EF4444' }}>
                {c.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom panel */}
        <div className="p-4 space-y-3" style={{ backgroundColor: '#1E293B' }}>
          {/* Specialty badge */}
          <div className="flex items-center justify-between">
            <span className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: `${P}30`, color: '#93C5FD' }}>
              Clínica Médica
            </span>
            <span className="rounded-md px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: '#10B98120', color: '#34D399' }}>
              ● Em andamento
            </span>
          </div>

          {/* AI Summary */}
          <div className="rounded-lg p-3" style={{ backgroundColor: '#0F172A', border: '1px solid #334155' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="h-4 w-4 rounded flex items-center justify-center text-xs" style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}>✦</div>
              <span className="text-xs font-semibold text-slate-300">Resumo IA dos documentos</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Hemograma: dentro da normalidade. Colesterol total: 198 mg/dL. Sem alterações relevantes identificadas nos documentos.</p>
          </div>

          {/* Uploaded exam */}
          <div className="flex items-center gap-2 rounded-lg p-2.5" style={{ backgroundColor: '#0F172A', border: '1px solid #334155' }}>
            <div className="h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1D4ED820' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-300 truncate">hemograma-completo.pdf</p>
              <p className="text-xs text-slate-500">284 KB · Processado</p>
            </div>
            <span className="text-xs font-medium" style={{ color: '#34D399' }}>✓</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── STATS BAR ─── */
function StatsBar() {
  const stats = [
    { value: '12.000+', label: 'Pacientes atendidos' },
    { value: '98%', label: 'Satisfação' },
    { value: '< 10min', label: 'Tempo médio de espera' },
    { value: '200+', label: 'Médicos verificados' },
  ]
  return (
    <section className="py-10 px-6" style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', backgroundColor: 'white' }}>
      <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(s => (
          <div key={s.label}>
            <div className="text-2xl font-bold mb-1" style={{ color: P }}>{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      title: 'Escolha a especialidade',
      desc: 'Selecione o profissional adequado para sua necessidade entre mais de 10 especialidades disponíveis.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      title: 'Envie seus documentos',
      desc: 'Anexe exames, laudos e receitas. Nossa IA organiza e resume as informações para o médico.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      title: 'Fale com um médico',
      desc: 'Realize sua consulta por vídeo com segurança e praticidade. Receba orientações e receitas digitais.',
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Simples e rápido</SectionLabel>
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#0F172A', letterSpacing: '-0.01em' }}>Como funciona</h2>
        <p className="text-center text-slate-500 mb-14 max-w-xl mx-auto">Em poucos passos você tem acesso a um médico qualificado, de onde estiver.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              style={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}>
                {i + 1}
              </div>
              <div className="h-12 w-12 rounded-xl mx-auto mb-5 flex items-center justify-center mt-2"
                style={{ backgroundColor: '#EFF6FF', color: P }}>
                {step.icon}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: '#0F172A' }}>{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SPECIALTIES ─── */
function Specialties() {
  const specs = [
    { label: 'Clínica Geral', icon: <HeartbeatIcon /> },
    { label: 'Pediatria', icon: <ChildIcon /> },
    { label: 'Dermatologia', icon: <SkinIcon /> },
    { label: 'Cardiologia', icon: <HeartIcon /> },
    { label: 'Ginecologia', icon: <WomenIcon /> },
    { label: 'Ortopedia', icon: <BoneIcon /> },
    { label: 'Neurologia', icon: <BrainIcon /> },
    { label: 'Psiquiatria', icon: <MindIcon /> },
    { label: 'Endocrinologia', icon: <ChemIcon /> },
    { label: 'Gastroenterologia', icon: <DigestIcon /> },
    { label: 'Otorrino', icon: <EarIcon /> },
    { label: 'Oftalmologia', icon: <EyeIcon /> },
  ]

  return (
    <section id="especialidades" className="py-20 px-6" style={{ backgroundColor: 'white' }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Especialidades</SectionLabel>
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#0F172A', letterSpacing: '-0.01em' }}>
          Especialidades disponíveis
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
          Médicos especializados prontos para te atender com qualidade e agilidade.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {specs.map(s => (
            <div key={s.label}
              className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center cursor-pointer transition-all hover:shadow-md group"
              style={{ border: '1px solid #E2E8F0', backgroundColor: BG }}>
              <div className="h-11 w-11 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#EFF6FF', color: P }}>
                {s.icon}
              </div>
              <span className="text-xs font-medium text-slate-600 leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── TECH SECTION ─── */
function TechSection() {
  const cards = [
    {
      title: 'Resumo inteligente',
      desc: 'A IA organiza e resume laudos e exames enviados, sem realizar diagnósticos.',
      icon: <SparkIcon />,
      color: '#7C3AED',
      bg: '#F5F3FF',
    },
    {
      title: 'Prontuário digital',
      desc: 'Histórico clínico centralizado e seguro para maior eficiência no atendimento.',
      icon: <DocIcon />,
      color: P,
      bg: '#EFF6FF',
    },
    {
      title: 'Segurança dos dados',
      desc: 'Proteção das informações com padrões modernos de segurança e conformidade LGPD.',
      icon: <ShieldIcon />,
      color: '#10B981',
      bg: '#ECFDF5',
    },
    {
      title: 'Vídeo de alta qualidade',
      desc: 'Consultas por vídeo com estabilidade e qualidade, diretamente no navegador.',
      icon: <VideoIcon />,
      color: '#0891B2',
      bg: '#ECFEFF',
    },
  ]

  return (
    <section className="py-20 px-6" style={{ background: `linear-gradient(135deg, #EFF6FF 0%, ${BG} 100%)` }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Tecnologia</SectionLabel>
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#0F172A', letterSpacing: '-0.01em' }}>
          Tecnologia que auxilia o atendimento
        </h2>
        <p className="text-center text-slate-500 mb-14 max-w-xl mx-auto">
          Ferramentas modernas que tornam a consulta mais eficiente para médicos e pacientes.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(c => (
            <div key={c.title} className="rounded-2xl p-6 hover:shadow-lg transition-shadow"
              style={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
              <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: c.bg, color: c.color }}>
                {c.icon}
              </div>
              <h3 className="font-semibold mb-2 text-sm" style={{ color: '#0F172A' }}>{c.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FOR DOCTORS ─── */
function ForDoctors() {
  return (
    <section id="medicos" className="py-20 px-6" style={{ backgroundColor: 'white' }}>
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel left>Para médicos</SectionLabel>
          <h2 className="text-3xl font-bold mb-5" style={{ color: '#0F172A', letterSpacing: '-0.01em' }}>
            Mais pacientes,<br />mais flexibilidade
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Atenda remotamente, organize sua agenda e amplie sua atuação profissional sem burocracia.
            Você recebe <strong style={{ color: P }}>80% do valor da consulta</strong> diretamente.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              'Cadastro gratuito e verificação digital',
              'Fila de pacientes organizada por especialidade',
              'Prontuário e documentos centralizados',
              'Repasse automático após cada consulta',
              'Relatórios financeiros detalhados',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <Link href="/auth/register?role=doctor"
            className="inline-flex rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: P }}>
            Cadastrar como médico
          </Link>
        </div>

        {/* Doctor Dashboard Mockup */}
        <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: '#E2E8F0', backgroundColor: BG }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: P }}>
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </div>
            <span className="text-white text-xs font-semibold">Painel do Médico</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-300 text-xs">Disponível</span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Hoje', value: '8', unit: 'consultas' },
                { label: 'Semana', value: 'R$1.2k', unit: 'recebido' },
                { label: 'Rating', value: '4.9', unit: '⭐' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                  <div className="text-lg font-bold" style={{ color: P }}>{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.unit}</div>
                </div>
              ))}
            </div>
            {/* Queue */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
              <div className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white" style={{ borderBottom: '1px solid #E2E8F0' }}>
                Fila de espera (3)
              </div>
              {[
                { name: 'Ana Lima', spec: 'Clínica Geral', time: '2min', color: '#10B981' },
                { name: 'Carlos Melo', spec: 'Cardiologia', time: '8min', color: S },
                { name: 'Maria Rosa', spec: 'Pediatria', time: '15min', color: '#F59E0B' },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between px-3 py-2.5 bg-white" style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: p.color }}>
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-700">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.spec}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: p.color }}>{p.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── BENEFITS ─── */
function Benefits() {
  const items = [
    'Atendimento sem deslocamento',
    'Médicos verificados e qualificados',
    'Consulta por vídeo HD',
    'Envio de documentos e exames',
    'Histórico clínico organizado',
    'Pagamento online (Pix ou cartão)',
    'Receitas e laudos digitais',
    'Plataforma segura e criptografada',
  ]

  return (
    <section className="py-20 px-6" style={{ background: `linear-gradient(135deg, ${P} 0%, #1a6bb5 100%)` }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
          Tudo que você precisa
        </h2>
        <p className="text-center mb-12" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Uma plataforma completa para cuidar da sua saúde com conforto.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item} className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
              <div className="h-6 w-6 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: '#10B981' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span className="text-sm text-white font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  const items = [
    {
      q: 'Quanto tempo demora para ser atendido?',
      a: 'Em média menos de 10 minutos. Assim que você finaliza o pagamento, um médico disponível aceita o atendimento. Nos horários de maior demanda pode levar um pouco mais.',
    },
    {
      q: 'Posso enviar exames e laudos?',
      a: 'Sim. Você pode anexar PDF, imagens e documentos médicos antes ou durante a consulta. Nossa IA organiza as informações para auxiliar o médico no atendimento.',
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'Aceitamos Pix e cartão de crédito. O pagamento é realizado antes da consulta de forma segura. Você receberá comprovante para declaração no Imposto de Renda.',
    },
    {
      q: 'Posso solicitar receita médica?',
      a: 'Sim. O médico pode emitir receitas e encaminhamentos digitais ao final da consulta, com validade legal conforme a regulamentação vigente.',
    },
    {
      q: 'Quais especialidades estão disponíveis?',
      a: 'Clínica Geral, Pediatria, Dermatologia, Cardiologia, Ginecologia, Ortopedia, Neurologia, Psiquiatria, Endocrinologia, Gastroenterologia, Otorrinolaringologia e Oftalmologia.',
    },
    {
      q: 'Meus dados estão protegidos?',
      a: 'Sim. A Medicare segue rigorosamente a LGPD. Seus dados são criptografados, nunca compartilhados com terceiros sem autorização e armazenados em servidores seguros.',
    },
  ]

  return (
    <section id="faq" className="py-20 px-6" style={{ backgroundColor: 'white' }}>
      <div className="mx-auto max-w-2xl">
        <SectionLabel>Dúvidas</SectionLabel>
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0F172A', letterSpacing: '-0.01em' }}>
          Perguntas frequentes
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all"
              style={{ border: `1px solid ${open === i ? P : '#E2E8F0'}` }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ backgroundColor: open === i ? '#EFF6FF' : 'white' }}>
                <span className="text-sm font-semibold" style={{ color: open === i ? P : '#0F172A' }}>{item.q}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={open === i ? P : '#94A3B8'}
                  strokeWidth="2" strokeLinecap="round"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed" style={{ backgroundColor: '#EFF6FF' }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="px-6 py-14" style={{ backgroundColor: '#0F172A', color: '#94A3B8' }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${P}, ${S})` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <span className="text-white font-bold">Medicare</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Teleconsulta médica sob demanda. Conectando pacientes a médicos qualificados.
            </p>
            <div className="flex gap-3">
              {['in', 'ig', 'tw'].map(s => (
                <div key={s} className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#CBD5E1' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2.5 text-sm">
              {['Como funciona', 'Especialidades', 'Para médicos', 'Preços'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              {['Política de Privacidade', 'Termos de Uso', 'LGPD', 'Cookies'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2.5 text-sm">
              {['Central de Ajuda', 'Contato', 'Área do Médico', 'Status'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2026 Medicare. Todos os direitos reservados.</p>
          <p>Plataforma de teleconsulta — não substitui atendimento de emergência.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── HELPERS ─── */
function SectionLabel({ children, left }: { children: React.ReactNode; left?: boolean }) {
  return (
    <div className={`flex ${left ? '' : 'justify-center'} mb-3`}>
      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: '#EFF6FF', color: P, border: `1px solid #BFDBFE` }}>
        {children}
      </span>
    </div>
  )
}

/* ─── ICONS ─── */
const ic = (d: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const HeartbeatIcon = () => ic('M22 12h-4l-3 9L9 3l-3 9H2')
const HeartIcon = () => ic('M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z')
const ChildIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" /><path d="M12 7v7m-4 4h8M9 11l-2 7m9-7 2 7" />
  </svg>
)
const SkinIcon = () => ic('M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z')
const WomenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" /><path d="M12 13v8m-3-3h6" />
  </svg>
)
const BoneIcon = () => ic('M18.5 2.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L18.5 2.5z')
const BrainIcon = () => ic('M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 1 1 0-5.92 2.5 2.5 0 0 1 2.96-3.08A2.5 2.5 0 0 1 9.5 2M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 1 0 0-5.92 2.5 2.5 0 0 0-2.96-3.08A2.5 2.5 0 0 0 14.5 2z')
const MindIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
  </svg>
)
const ChemIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v11l3.5 6H5.5L9 14V3zM6 9h12" />
  </svg>
)
const DigestIcon = () => ic('M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z')
const EarIcon = () => ic('M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 0 1-7 0V8.5')
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const SparkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
)
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
)
