import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Leia os Termos de Uso da plataforma Medicare antes de utilizar os serviços.',
}

const N = '#0A2342'
const T = '#17B890'

export default function TermosPage() {
  return (
    <div style={{ backgroundColor: '#F8FAFC', color: N, fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh' }}>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs font-semibold mb-2" style={{ color: T }}>Legal</p>
        <h1 className="text-3xl font-bold mb-1" style={{ color: N }}>Termos de Uso</h1>
        <p className="text-sm mb-10" style={{ color: '#64748B' }}>Última atualização: 26/05/2026</p>

        <div className="bg-white rounded-2xl p-8 space-y-8" style={{ border: '1px solid #E2E8F0' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
            Ao utilizar a plataforma Medicare, o usuário declara ter lido e concordado com os presentes Termos de Uso.
          </p>

          <Section n="1" title="Objeto">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              A Medicare disponibiliza ambiente digital destinado à intermediação de teleconsultas médicas entre pacientes
              e profissionais regularmente habilitados.
            </p>
            <div className="mt-3 rounded-xl p-4" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-sm" style={{ color: '#475569' }}>
                <strong style={{ color: N }}>A Medicare não presta diretamente serviços médicos.</strong>{' '}
                Os serviços médicos são prestados exclusivamente pelos profissionais cadastrados e habilitados na plataforma.
              </p>
            </div>
          </Section>

          <Section n="2" title="Cadastro">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>O usuário declara que:</p>
            <Items items={['Possui capacidade civil', 'Fornecerá informações verdadeiras', 'Manterá seus dados atualizados', 'É responsável pela confidencialidade de sua conta']} />
          </Section>

          <Section n="3" title="Consultas Médicas">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              As consultas serão realizadas remotamente através da plataforma. A disponibilidade de profissionais dependerá
              da especialidade e dos horários cadastrados. A Medicare não garante atendimento imediato.
            </p>
          </Section>

          <Section n="4" title="Limitações do Serviço">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>A plataforma não substitui:</p>
            <Items items={['Hospitais', 'Prontos-socorros', 'Unidades de emergência', 'Serviços de resgate']} />
            <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: '#FFF1F2', border: '1px solid #FECDD3' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#BE123C' }}>
                <strong>Em caso de emergência médica</strong>, o usuário deverá procurar atendimento presencial imediato
                ou acionar o SAMU pelo telefone <strong>192</strong>.
              </p>
            </div>
          </Section>

          <Section n="5" title="Responsabilidade Médica">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              O profissional de saúde é o único responsável:
            </p>
            <Items items={['Pelo diagnóstico', 'Pela conduta médica', 'Pelas prescrições', 'Pelos documentos emitidos', 'Pelas orientações clínicas fornecidas']} />
            <p className="text-sm mt-3" style={{ color: '#475569' }}>
              A Medicare atua exclusivamente como intermediadora tecnológica.
            </p>
          </Section>

          <Section n="6" title="Pagamentos">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Os pagamentos serão processados por parceiros especializados. A consulta somente será iniciada após
              confirmação do pagamento.
            </p>
          </Section>

          <Section n="7" title="Cancelamentos e Reembolsos">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              As regras específicas de cancelamento e reembolso serão disponibilizadas em política própria.
            </p>
          </Section>

          <Section n="8" title="Propriedade Intelectual">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Todo o conteúdo da plataforma pertence à Medicare ou aos seus licenciantes. É proibida a reprodução
              sem autorização prévia.
            </p>
          </Section>

          <Section n="9" title="Suspensão de Contas">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              A Medicare poderá suspender ou encerrar contas que:
            </p>
            <Items items={['Utilizem informações falsas', 'Pratiquem fraudes', 'Violem a legislação vigente', 'Descumpram estes Termos']} />
          </Section>

          <Section n="10" title="Foro">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Fica eleito o foro da comarca da sede da Medicare para dirimir eventuais controvérsias decorrentes
              destes Termos.
            </p>
          </Section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs">
          <Link href="/privacidade" className="hover:underline" style={{ color: T }}>Política de Privacidade</Link>
          <Link href="/lgpd" className="hover:underline" style={{ color: T }}>Conformidade LGPD</Link>
        </div>
      </main>
      <FooterSimples />
    </div>
  )
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold mb-4 pb-2" style={{ color: N, borderBottom: '1px solid #F1F5F9' }}>
        <span style={{ color: T }}>{n}.</span> {title}
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
