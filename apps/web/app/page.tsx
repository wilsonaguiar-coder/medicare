'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const T = '#17B890'   // teal primary
const N = '#0A2342'   // navy dark
const BG = '#FFFFFF'

export default function HomePage() {
  return (
    <div style={{ backgroundColor: BG, color: N, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <EmergencyBanner />
      <Header />
      <Hero />
      <HowItWorks />
      <Specialties />
      <TechSection />
      <ForDoctors />
      <Faq />
      <Footer />
    </div>
  )
}

/* ─── EMERGENCY BANNER ─── */
function EmergencyBanner() {
  return (
    <div className="text-center text-xs py-1.5 px-4" style={{ backgroundColor: '#FFF1F2', color: '#BE123C' }}>
      <strong>Atenção:</strong> Esta plataforma não se destina a emergências médicas. Em caso de risco à vida, acione o <strong>SAMU – 192</strong>.
    </div>
  )
}

/* ─── HEADER ─── */
function Header() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4 bg-white" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medicare" width={36} height={36} priority />
          <span className="text-lg font-bold" style={{ color: N }}>Medicare</span>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" style={{ color: '#475569' }}>
          <a href="#como-funciona" className="hover:text-slate-900 transition-colors">Como funciona</a>
          <a href="#especialidades" className="hover:text-slate-900 transition-colors">Especialidades</a>
          <a href="#medicos" className="hover:text-slate-900 transition-colors">Para médicos</a>
          <a href="/sobre" className="hover:text-slate-900 transition-colors">Sobre nós</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">Dúvidas</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/consulta/nova" className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: T }}>
            Agendar consulta
          </Link>
        </div>
      </div>
    </header>
  )
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="px-6 py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: '#F8FFFE' }}>
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-10 lg:gap-8 items-center">

        {/* Left — text */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-6"
            style={{ backgroundColor: '#E6FAF6', color: T, border: `1px solid #A7F3E0` }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: T }} />
            Telemedicina moderna, segura e acessível
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight" style={{ color: N, letterSpacing: '-0.02em' }}>
            Consulte um médico<br />
            <span style={{ color: T }}>online em poucos<br />minutos</span>
          </h1>

          <p className="text-base mb-8 leading-relaxed max-w-md" style={{ color: '#64748B' }}>
            Teleconsultas seguras com médicos verificados. Envie exames, converse
            por vídeo e receba orientações sem sair de casa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/consulta/nova"
              className="rounded-xl px-7 py-3.5 text-sm font-semibold text-white text-center transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: T, boxShadow: `0 4px 20px ${T}50` }}>
              Agendar consulta
            </Link>
            <Link href="/auth/register?role=doctor"
              className="rounded-xl px-7 py-3.5 text-sm font-semibold text-center transition-all hover:bg-slate-50"
              style={{ border: '1.5px solid #E2E8F0', color: N }}>
              Sou médico e quero me cadastrar
            </Link>
          </div>

          <div className="flex flex-wrap gap-5 text-sm" style={{ color: '#64748B' }}>
            {[
              { icon: <CheckIcon />, label: 'Médicos verificados' },
              { icon: <VideoSmIcon />, label: 'Atendimento por vídeo' },
              { icon: <LockIcon />, label: 'Pagamento seguro' },
              { icon: <ShieldSmIcon />, label: 'Proteção de dados' },
            ].map(item => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span style={{ color: T }}>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div className="hidden lg:flex justify-center items-center flex-shrink-0">
          <Image
            src="/heroimg.png"
            alt="Consulta médica online pelo Medicare"
            width={500}
            height={560}
            priority
            className="object-contain"
          />
        </div>

      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    {
      icon: <SearchIcon />,
      title: 'Escolha a especialidade',
      desc: 'Selecione o profissional adequado para sua necessidade.',
    },
    {
      icon: <UploadIcon />,
      title: 'Envie documentos',
      desc: 'Anexe exames, laudos e receitas para auxiliar no atendimento.',
    },
    {
      icon: <VideoIcon />,
      title: 'Fale com um médico',
      desc: 'Realize sua consulta por vídeo com segurança e praticidade.',
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-12" style={{ color: N }}>Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: '#F8FFFE', border: '1px solid #E6FAF6' }}>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: '#E6FAF6', color: T }}>
                {step.icon}
              </div>
              <h3 className="font-semibold mb-2 text-sm" style={{ color: N }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{step.desc}</p>
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
    { label: 'Clínica Geral',        icon: <HeartbeatIcon /> },
    { label: 'Pediatria',            icon: <ChildIcon /> },
    { label: 'Dermatologia',         icon: <SkinIcon /> },
    { label: 'Cardiologia',          icon: <HeartIcon /> },
    { label: 'Ginecologia',          icon: <WomenIcon /> },
    { label: 'Ortopedia',            icon: <BoneIcon /> },
    { label: 'Neurologia',           icon: <BrainIcon /> },
    { label: 'Psiquiatria',          icon: <MindIcon /> },
    { label: 'Endocrinologia',       icon: <ChemIcon /> },
    { label: 'Gastroenterologia',    icon: <GutIcon /> },
    { label: 'Otorrinolaringologia', icon: <EarIcon /> },
  ]

  return (
    <section id="especialidades" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold" style={{ color: N }}>Especialidades disponíveis</h2>
          <a href="#especialidades" className="text-sm font-semibold hover:underline" style={{ color: T }}>Ver todas</a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {specs.map(s => (
            <div key={s.label}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl cursor-pointer transition-all hover:shadow-md group"
              style={{ border: '1px solid #E2E8F0' }}>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ color: T }}>
                {s.icon}
              </div>
              <span className="text-xs font-medium text-center leading-tight" style={{ color: '#475569' }}>{s.label}</span>
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
    { title: 'Resumo inteligente de documentos', desc: 'A inteligência artificial organiza e resume laudos e exames enviados.', icon: <SparkIcon />, color: '#7C3AED', bg: '#F5F3FF' },
    { title: 'Prontuário digital', desc: 'Histórico clínico centralizado para maior segurança, agilidade e continuidade do cuidado.', icon: <DocIcon />, color: T, bg: '#E6FAF6' },
    { title: 'Segurança dos dados', desc: 'Proteção das informações com padrões modernos de segurança e conformidade com a LGPD.', icon: <ShieldIcon />, color: '#0369A1', bg: '#E0F2FE' },
    { title: 'Atendimento por vídeo', desc: 'Consultas online com qualidade, estabilidade e conexão segura de ponta a ponta.', icon: <VideoIcon />, color: '#D97706', bg: '#FEF3C7' },
  ]

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-12" style={{ color: N }}>Tecnologia que auxilia o atendimento</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(c => (
            <div key={c.title} className="rounded-2xl p-5 bg-white hover:shadow-md transition-shadow"
              style={{ border: '1px solid #E2E8F0' }}>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: c.bg, color: c.color }}>
                {c.icon}
              </div>
              <h3 className="font-semibold text-sm mb-2 leading-snug" style={{ color: N }}>{c.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{c.desc}</p>
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
    <section id="medicos" className="py-20 px-6" style={{ backgroundColor: N }}>
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-6"
            style={{ backgroundColor: `${T}25`, color: T, border: `1px solid ${T}40` }}>
            Para médicos
          </div>
          <h2 className="text-3xl font-bold text-white mb-5" style={{ letterSpacing: '-0.01em' }}>
            Mais pacientes,<br />mais flexibilidade
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: '#94A3B8' }}>
            Atenda remotamente, organize sua agenda e amplie sua atuação profissional.
            Receba <strong className="text-white">80% do valor</strong> de cada consulta diretamente.
          </p>
          <Link href="/auth/register?role=doctor"
            className="inline-flex rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: T }}>
            Quero me cadastrar
          </Link>
        </div>

        {/* Right — Dashboard mockup */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0F2D4A' }}>
          <div className="flex" style={{ minHeight: 320 }}>
            {/* Sidebar */}
            <div className="w-36 flex-shrink-0 py-4 px-3" style={{ backgroundColor: N, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1.5 mb-5 px-1">
                <Image src="/logo.png" alt="Medicare" width={22} height={22} />
                <span className="text-white text-xs font-bold">Medicare</span>
              </div>
              <p className="text-xs mb-3 font-medium px-1" style={{ color: '#64748B' }}>Painel do médico</p>
              {[
                { label: 'Atendimentos', active: true },
                { label: 'Agenda', active: false },
                { label: 'Pacientes', active: false },
                { label: 'Mensagens', active: false },
                { label: 'Financeiro', active: false },
                { label: 'Relatórios', active: false },
                { label: 'Configurações', active: false },
              ].map(item => (
                <div key={item.label}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 cursor-pointer"
                  style={{
                    backgroundColor: item.active ? `${T}20` : 'transparent',
                    color: item.active ? T : '#64748B',
                  }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.active ? T : 'transparent' }} />
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm font-semibold">Fila de atendimentos</h3>
                <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}>
                  Todos <span>▾</span>
                </div>
              </div>

              {/* Patient queue */}
              {[
                { name: 'Ana Clara Silva', age: '32 anos', time: '09:30', status: 'Analisado', color: T },
                { name: 'João Pedro Costa', age: '45 anos', time: '10:00', status: 'Analisado', color: T },
                { name: 'Mariana Oliveira', age: '26 anos', time: '10:30', status: 'Analisado', color: T },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 mb-1 rounded-lg px-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, #1a6bb5, ${T})` }}>
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{p.name}</p>
                      <p className="text-xs" style={{ color: '#64748B' }}>{p.age}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-xs">{p.time}</p>
                    <span className="text-xs font-medium" style={{ color: T }}>{p.status}</span>
                  </div>
                </div>
              ))}

              {/* Summary */}
              <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: 'rgba(23,184,144,0.1)', border: `1px solid ${T}30` }}>
                <p className="text-xs font-semibold text-white mb-2">Resumo do dia</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Consultas realizadas</p>
                    <p className="text-white font-bold text-sm">12</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Receita hoje</p>
                    <p className="font-bold text-sm" style={{ color: T }}>R$ 1.680,00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  const items = [
    { q: 'Quanto tempo demora para ser atendido?', a: 'Em média menos de 10 minutos após o pagamento. Nos horários de pico pode levar um pouco mais.' },
    { q: 'Posso enviar exames e laudos?', a: 'Sim. Você pode anexar PDFs e imagens antes ou durante a consulta. Nossa IA organiza as informações para o médico.' },
    { q: 'Como funciona o pagamento?', a: 'Aceitamos Pix e cartão de crédito. O pagamento é feito antes da consulta. Você recebe comprovante para o IRPF.' },
    { q: 'Posso solicitar receita médica?', a: 'Sim. O médico pode emitir receitas e encaminhamentos digitais com validade legal ao final da consulta.' },
    { q: 'Quais especialidades estão disponíveis?', a: 'Clínica Geral, Pediatria, Dermatologia, Cardiologia, Ginecologia, Ortopedia, Neurologia, Psiquiatria, Endocrinologia, Gastroenterologia e Otorrinolaringologia.' },
    { q: 'Meus dados estão protegidos?', a: 'Sim. Seguimos rigorosamente a LGPD. Seus dados são criptografados e nunca compartilhados sem autorização.' },
  ]

  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-10" style={{ color: N }}>Perguntas frequentes</h2>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all"
              style={{ border: `1px solid ${open === i ? T : '#E2E8F0'}` }}>
              <button className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ backgroundColor: open === i ? '#F0FDF9' : 'white' }}>
                <span className="text-sm font-medium" style={{ color: open === i ? T : N }}>{item.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={open === i ? T : '#94A3B8'} strokeWidth="2" strokeLinecap="round"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#475569', backgroundColor: '#F0FDF9' }}>
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
    <footer className="px-6 py-12" style={{ backgroundColor: N, color: '#64748B' }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-lg p-1 flex-shrink-0" style={{ backgroundColor: 'white' }}>
                <Image src="/logo.png" alt="Medicare" width={26} height={26} />
              </div>
              <span className="text-white font-bold text-sm">Medicare</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">Teleconsulta médica sob demanda. Conectando pacientes a médicos qualificados.</p>
          </div>
          {[
            {
              title: 'Plataforma',
              links: [
                { label: 'Como funciona',   href: '#como-funciona' },
                { label: 'Especialidades',  href: '#especialidades' },
                { label: 'Para médicos',    href: '#medicos' },
                { label: 'Agendar consulta', href: '/consulta/nova' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { label: 'Política de Privacidade', href: '/privacidade' },
                { label: 'Termos de Uso',           href: '/termos' },
                { label: 'Conformidade LGPD',       href: '/lgpd' },
              ],
            },
            {
              title: 'Suporte',
              links: [
                { label: 'Perguntas frequentes', href: '#faq' },
                { label: 'Contato',              href: 'mailto:contato@medicare.med.br' },
                { label: 'Área do médico',       href: '/auth/login' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white text-xs font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p>© 2026 Medicare. Todos os direitos reservados.</p>
          <p>Plataforma de teleconsulta — não substitui atendimento de emergência.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── ICONS ─── */
const Ico = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const CheckIcon = () => <Ico d="M20 6 9 17l-5-5" size={14} />
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const VideoSmIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
)
const ShieldSmIcon = () => <Ico d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={14} />
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)
const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
)
const SparkIcon = () => <Ico d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)
const ShieldIcon = () => <Ico d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
const HeartbeatIcon = () => <Ico d="M22 12h-4l-3 9L9 3l-3 9H2" />
const HeartIcon = () => <Ico d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
const ChildIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.5" /><path d="M12 8v6m-3 4h6M9.5 11l-1.5 7m7.5-7 1.5 7" />
  </svg>
)
const SkinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
  </svg>
)
const WomenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" /><path d="M12 13v8m-3-3h6" />
  </svg>
)
const BoneIcon = () => <Ico d="M18.5 2.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L18.5 2.5z" />
const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5-0.5 2.5 2.5 0 0 1-3-2.5 3 3 0 1 1 0-6 2.5 2.5 0 0 1 3-2.5A2.5 2.5 0 0 1 9.5 2M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 5-0.5 2.5 2.5 0 0 0 3-2.5 3 3 0 1 0 0-6 2.5 2.5 0 0 0-3-2.5A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
)
const MindIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)
const ChemIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v9l4 7H5l4-7V3z" /><line x1="6" y1="9" x2="18" y2="9" />
  </svg>
)
const GutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 5 5 5 8c0 2 1 3.5 1 5 0 2-2 3-2 5a4 4 0 0 0 4 4c2 0 3-1 4-1s2 1 4 1a4 4 0 0 0 4-4c0-2-2-3-2-5 0-1.5 1-3 1-5 0-3-3-6-7-6z" />
  </svg>
)
const EarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 1 1 12 0c0 3-2 4-3 6-1 1.5-.5 3-2 4a2 2 0 0 1-3-1" />
    <path d="M10 13a2 2 0 1 0 2-2" />
  </svg>
)
