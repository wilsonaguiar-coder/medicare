import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conformidade LGPD',
  description: 'Programa de conformidade com a Lei Geral de Proteção de Dados (LGPD) da plataforma Medicare.',
}

const N = '#0A2342'
const T = '#17B890'

export default function LgpdPage() {
  return (
    <div style={{ backgroundColor: '#F8FAFC', color: N, fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh' }}>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs font-semibold mb-2" style={{ color: T }}>Legal</p>
        <h1 className="text-3xl font-bold mb-1" style={{ color: N }}>Conformidade LGPD</h1>
        <p className="text-sm mb-2" style={{ color: '#64748B' }}>Lei nº 13.709/2018 — Lei Geral de Proteção de Dados</p>

        <div className="rounded-xl px-4 py-3 mb-10 text-sm" style={{ backgroundColor: '#E6FAF6', border: `1px solid ${T}40`, color: '#065F46' }}>
          A Medicare reconhece que informações médicas constituem dados pessoais sensíveis e adota medidas compatíveis
          com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </div>

        <div className="bg-white rounded-2xl p-8 space-y-8" style={{ border: '1px solid #E2E8F0' }}>

          <Section title="Bases Legais Utilizadas">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              Os tratamentos realizados poderão fundamentar-se em:
            </p>
            <Items items={['Consentimento do titular', 'Execução de contrato', 'Tutela da saúde', 'Cumprimento de obrigação legal', 'Exercício regular de direitos']} />
          </Section>

          <Section title="Governança de Dados">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              A Medicare mantém processos destinados a:
            </p>
            <Items items={['Controle de acesso', 'Segregação de informações', 'Gestão de incidentes', 'Registro de operações de tratamento', 'Monitoramento de segurança', 'Rastreabilidade de acessos']} />
          </Section>

          <Section title="Segurança da Informação">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              São adotadas medidas como:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { label: 'Criptografia de tráfego (TLS)', icon: '🔒' },
                { label: 'Criptografia de dados armazenados', icon: '🗄️' },
                { label: 'Autenticação multifator para médicos', icon: '🔑' },
                { label: 'Backups periódicos', icon: '💾' },
                { label: 'Auditoria de acessos', icon: '📋' },
                { label: 'Monitoramento de incidentes', icon: '🛡️' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                  style={{ backgroundColor: '#F8FFFE', border: '1px solid #E6FAF6' }}>
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs" style={{ color: '#475569' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Direitos dos Titulares">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Os titulares poderão exercer seus direitos previstos na LGPD por meio dos canais oficiais
              disponibilizados pela Medicare. Consulte nossa{' '}
              <Link href="/privacidade#6" style={{ color: T }} className="hover:underline">
                Política de Privacidade
              </Link>{' '}
              para ver a lista completa de direitos.
            </p>
          </Section>

          <Section title="Encarregado pelo Tratamento de Dados (DPO)">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Entre em contato conosco nos canais de atendimento apresentados na{' '}
              <Link href="/" style={{ color: T }} className="hover:underline">página principal</Link>.
            </p>
          </Section>

          <div className="rounded-xl p-5" style={{ backgroundColor: '#F8FFFE', border: `1px solid ${T}30` }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: N }}>Compromisso</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              A Medicare compromete-se a revisar continuamente seus processos para garantir conformidade regulatória,
              proteção de dados pessoais e segurança das informações de pacientes e profissionais de saúde.
            </p>
          </div>

          <div className="rounded-xl p-4 text-xs leading-relaxed" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E' }}>
            <strong>Recomendação:</strong> Antes do lançamento comercial, recomenda-se a revisão formal destes documentos
            por advogado especializado em LGPD, Direito Digital e Direito Médico, para adequação a detalhes específicos
            da operação, política de retenção de prontuários e responsabilidades contratuais.
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs">
          <Link href="/privacidade" className="hover:underline" style={{ color: T }}>Política de Privacidade</Link>
          <Link href="/termos" className="hover:underline" style={{ color: T }}>Termos de Uso</Link>
        </div>
      </main>
      <FooterSimples />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold mb-4 pb-2" style={{ color: N, borderBottom: '1px solid #F1F5F9' }}>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Items({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: T }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 px-6 py-4 bg-white" style={{ borderBottom: '1px solid #F1F5F9' }}>
      <div className="mx-auto max-w-3xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medicare" width={32} height={32} />
          <span className="text-base font-bold" style={{ color: N }}>Medicare</span>
        </Link>
        <Link href="/" className="text-xs font-medium hover:underline" style={{ color: '#64748B' }}>
          ← Voltar ao início
        </Link>
      </div>
    </header>
  )
}

function FooterSimples() {
  return (
    <footer className="px-6 py-8 mt-10 text-center text-xs" style={{ backgroundColor: N, color: '#64748B' }}>
      <p>© 2026 Medicare. Todos os direitos reservados.</p>
      <p className="mt-1">Plataforma de teleconsulta — não substitui atendimento de emergência.</p>
    </footer>
  )
}
