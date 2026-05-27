import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import logo from '../../logo1.png'

const T = '#17B890'
const N = '#0A2342'
const BG = '#FFFFFF'

const values = [
  {
    title: 'Segurança em primeiro lugar',
    desc: 'A proteção das informações dos pacientes é uma prioridade. Utilizamos práticas modernas de segurança e privacidade para garantir a confidencialidade dos dados tratados na plataforma.',
  },
  {
    title: 'Tecnologia a serviço das pessoas',
    desc: 'Utilizamos tecnologia para simplificar processos e melhorar a experiência dos usuários, sem substituir o julgamento clínico dos profissionais de saúde.',
  },
  {
    title: 'Transparencia',
    desc: 'Valorizamos relações claras, honestas e responsáveis com pacientes, médicos e parceiros.',
  },
  {
    title: 'Qualidade assistencial',
    desc: 'Buscamos proporcionar um ambiente que favoreça atendimentos organizados, seguros e alinhados às melhores práticas da telemedicina.',
  },
  {
    title: 'Inovação contínua',
    desc: 'Estamos em constante evolução para oferecer recursos que tornem a jornada de atendimento mais eficiente para todos os envolvidos.',
  },
]

const steps = [
  'O paciente realiza seu cadastro gratuitamente.',
  'Escolhe a especialidade médica desejada.',
  'Pode enviar exames, laudos e documentos relevantes.',
  'Realiza o pagamento da consulta.',
  'Um médico disponível realiza o atendimento por vídeo.',
  'O histórico da consulta permanece disponível na plataforma para acesso posterior.',
]

export default function SobrePage() {
  return (
    <main style={{ backgroundColor: BG, color: N, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Header />
      <Hero />
      <Intro />
      <VisionMission />
      <Values />
      <HowItWorks />
      <AiSection />
      <PrivacySection />
      <FutureSection />
      <Closing />
    </main>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4 bg-white" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Medicare" width={36} height={36} priority />
          <span className="text-lg font-bold" style={{ color: N }}>Medicare</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" style={{ color: '#475569' }}>
          <Link href="/#como-funciona" className="hover:text-slate-900 transition-colors">Como funciona</Link>
          <Link href="/#especialidades" className="hover:text-slate-900 transition-colors">Especialidades</Link>
          <Link href="/#medicos" className="hover:text-slate-900 transition-colors">Para médicos</Link>
          <Link href="/sobre" className="transition-colors" style={{ color: T }}>Sobre nós</Link>
          <Link href="/#faq" className="hover:text-slate-900 transition-colors">Dúvidas</Link>
        </nav>

        <Link
          href="/consulta/nova"
          className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
          style={{ backgroundColor: T }}
        >
          Agendar consulta
        </Link>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="px-6 py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: '#F8FFFE' }}>
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_360px] gap-12 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-6"
            style={{ backgroundColor: '#E6FAF6', color: T, border: '1px solid #A7F3E0' }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: T }} />
            Saúde digital com cuidado humano
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight" style={{ color: N }}>
            Sobre a Medicare
          </h1>
          <p className="text-xl lg:text-2xl font-semibold mb-5 leading-snug" style={{ color: T }}>
            Saúde mais acessível, conectada e humana.
          </p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#64748B' }}>
            A Medicare nasceu para aproximar pacientes e profissionais de saúde por meio de uma plataforma séria,
            segura e preparada para uma experiencia de telemedicina mais simples.
          </p>
        </div>

        <div className="rounded-2xl p-7 bg-white shadow-sm" style={{ border: '1px solid #E6FAF6' }}>
          <div className="rounded-xl p-4 mb-5 inline-flex" style={{ backgroundColor: '#E6FAF6' }}>
            <Image src={logo} alt="Medicare" width={48} height={48} />
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
            Tecnologia para aproximar pessoas e saúde. Médicos verificados, atendimento seguro e cuidado onde você estiver.
          </p>
          <Link
            href="/consulta/nova"
            className="inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: T }}
          >
            Agendar consulta
          </Link>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <Section>
      <div className="max-w-3xl space-y-5 text-base leading-relaxed" style={{ color: '#475569' }}>
        <p>
          A Medicare nasceu com uma missão simples: tornar o acesso à saúde mais rápido, seguro e conveniente para
          milhões de pessoas.
        </p>
        <p>
          Acreditamos que a tecnologia deve aproximar pacientes e profissionais de saúde, eliminando barreiras
          geográficas, reduzindo o tempo de espera e proporcionando atendimento médico de qualidade onde quer que o
          paciente esteja.
        </p>
        <p>
          Por meio da nossa plataforma, pacientes podem realizar consultas online com médicos verificados, enviar
          documentos e exames, receber orientações médicas e acessar seu histórico de atendimento de forma prática e
          segura.
        </p>
        <p>
          Ao mesmo tempo, oferecemos aos profissionais de saúde uma infraestrutura moderna para atender remotamente,
          organizar informações clínicas e ampliar seu alcance profissional através da telemedicina.
        </p>
      </div>
    </Section>
  )
}

function VisionMission() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
        <InfoBlock
          eyebrow="Nossa visão"
          title="Uma das principais plataformas brasileiras de saúde digital"
          desc="Construir uma plataforma que conecte pacientes e profissionais por meio de tecnologia confiável, segura e acessível, para que qualquer pessoa encontre atendimento médico qualificado quando precisar."
        />
        <InfoBlock
          eyebrow="Nossa missao"
          title="Facilitar o acesso à saúde através da tecnologia"
          desc="Promover consultas médicas online seguras, eficientes e centradas no paciente, reduzindo barreiras de acesso e contribuindo para uma experiência mais simples, humana e digital."
        />
      </div>
    </section>
  )
}

function Values() {
  return (
    <Section title="Nossos valores">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {values.map((value) => (
          <article key={value.title} className="rounded-2xl p-6 bg-white" style={{ border: '1px solid #E2E8F0' }}>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#E6FAF6', color: T }}>
              <CheckIcon />
            </div>
            <h3 className="font-semibold mb-2 text-sm" style={{ color: N }}>{value.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{value.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function HowItWorks() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: '#F8FFFE' }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-10" style={{ color: N }}>Como a Medicare funciona</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-2xl p-5 bg-white" style={{ border: '1px solid #E6FAF6' }}>
              <span className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#E6FAF6', color: T }}>
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{step}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed" style={{ color: '#64748B' }}>
          Todo o processo foi desenvolvido para ser intuitivo, seguro e acessível.
        </p>
      </div>
    </section>
  )
}

function AiSection() {
  return (
    <Section title="Inteligência Artificial como apoio, nunca como substituição">
      <div className="max-w-3xl space-y-5 text-base leading-relaxed" style={{ color: '#475569' }}>
        <p>
          A Medicare utiliza recursos de Inteligência Artificial para auxiliar na organização de informações e documentos
          enviados pelos pacientes.
        </p>
        <p>
          Essas ferramentas podem resumir documentos, estruturar informações e facilitar a análise prévia pelo
          profissional de saúde.
        </p>
        <p>
          Entretanto, a Inteligência Artificial não realiza diagnósticos nem substitui a avaliação médica. Todas as
          decisões clínicas permanecem sob responsabilidade exclusiva do profissional responsável pelo atendimento.
        </p>
      </div>
    </Section>
  )
}

function PrivacySection() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: N }}>
      <div className="mx-auto max-w-5xl">
        <div className="inline-flex rounded-full px-3 py-1 text-xs font-semibold mb-6" style={{ backgroundColor: `${T}25`, color: T, border: `1px solid ${T}40` }}>
          Privacidade e conformidade
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-5">Compromisso com privacidade e conformidade</h2>
        <div className="max-w-3xl space-y-5 text-base leading-relaxed" style={{ color: '#CBD5E1' }}>
          <p>Tratamos informações de saúde com o mais alto nível de responsabilidade.</p>
          <p>
            A Medicare adota medidas técnicas e administrativas voltadas à proteção dos dados pessoais e busca manter
            conformidade com a legislação brasileira aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD).
          </p>
        </div>
      </div>
    </section>
  )
}

function FutureSection() {
  return (
    <Section title="O futuro da saúde digital">
      <div className="max-w-3xl space-y-5 text-base leading-relaxed" style={{ color: '#475569' }}>
        <p>Estamos construindo uma plataforma preparada para acompanhar a evolução da medicina e da tecnologia.</p>
        <p>
          Nos próximos anos, pretendemos ampliar recursos, especialidades e serviços, sempre mantendo nosso compromisso
          com segurança, qualidade e acessibilidade.
        </p>
        <p>
          Acreditamos que o futuro da saúde será cada vez mais conectado, inteligente e centrado nas pessoas. E queremos
          fazer parte dessa transformação.
        </p>
      </div>
    </Section>
  )
}

function Closing() {
  return (
    <footer className="px-6 py-14" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src={logo} alt="Medicare" width={34} height={34} />
            <span className="font-bold" style={{ color: N }}>Medicare</span>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: N }}>Tecnologia para aproximar pessoas e saúde.</p>
          <p className="text-sm" style={{ color: '#64748B' }}>Médicos verificados. Atendimento seguro. Cuidado onde você estiver.</p>
        </div>
        <Link
          href="/consulta/nova"
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white text-center transition-all hover:opacity-90"
          style={{ backgroundColor: T }}
        >
          Começar agora
        </Link>
      </div>
    </footer>
  )
}

function Section({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <section className="px-6 py-20 bg-white">
      <div className="mx-auto max-w-6xl">
        {title && <h2 className="text-2xl font-bold mb-10" style={{ color: N }}>{title}</h2>}
        {children}
      </div>
    </section>
  )
}

function InfoBlock({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <article className="rounded-2xl p-7 bg-white" style={{ border: '1px solid #E2E8F0' }}>
      <p className="text-xs font-semibold mb-3" style={{ color: T }}>{eyebrow}</p>
      <h2 className="text-xl font-bold mb-4 leading-snug" style={{ color: N }}>{title}</h2>
      <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{desc}</p>
    </article>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
