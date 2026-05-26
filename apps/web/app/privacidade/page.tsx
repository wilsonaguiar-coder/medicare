import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Saiba como a Medicare coleta, utiliza e protege seus dados pessoais.',
}

const N = '#0A2342'
const T = '#17B890'

export default function PrivacidadePage() {
  return (
    <div style={{ backgroundColor: '#F8FAFC', color: N, fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100vh' }}>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs font-semibold mb-2" style={{ color: T }}>Legal</p>
        <h1 className="text-3xl font-bold mb-1" style={{ color: N }}>Política de Privacidade</h1>
        <p className="text-sm mb-10" style={{ color: '#64748B' }}>Última atualização: 26/05/2026</p>

        <div className="bg-white rounded-2xl p-8 space-y-8" style={{ border: '1px solid #E2E8F0' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
            A Medicare respeita a privacidade de seus usuários e está comprometida com a proteção dos dados pessoais
            tratados em sua plataforma. Esta Política descreve como coletamos, utilizamos, armazenamos e protegemos
            informações de pacientes, médicos e demais usuários.
          </p>

          <Section n="1" title="Dados Coletados">
            <Sub title="Dados de identificação">
              <Items items={['Nome completo', 'CPF', 'Data de nascimento', 'Sexo', 'Endereço', 'Telefone', 'E-mail']} />
            </Sub>
            <Sub title="Dados profissionais (médicos)">
              <Items items={['CRM', 'Especialidade', 'Documentos de validação profissional', 'Dados bancários para repasse financeiro']} />
            </Sub>
            <Sub title="Dados de saúde">
              <Items items={['Histórico médico informado pelo usuário', 'Sintomas relatados', 'Exames laboratoriais', 'Laudos médicos', 'Receitas', 'Relatórios clínicos', 'Informações registradas em consultas']} />
            </Sub>
            <Sub title="Dados técnicos">
              <Items items={['Endereço IP', 'Navegador utilizado', 'Sistema operacional', 'Logs de acesso', 'Informações de dispositivo']} />
            </Sub>
          </Section>

          <Section n="2" title="Finalidade do Tratamento">
            <Items items={['Cadastro de usuários', 'Realização de consultas médicas', 'Identificação dos participantes', 'Processamento de pagamentos', 'Emissão de documentos médicos', 'Armazenamento de prontuários', 'Suporte técnico', 'Prevenção a fraudes', 'Cumprimento de obrigações legais', 'Melhoria da plataforma']} />
          </Section>

          <Section n="3" title="Utilização de Inteligência Artificial">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              A Medicare poderá utilizar sistemas de Inteligência Artificial para:
            </p>
            <Items items={['Extração de texto', 'Organização documental', 'Resumo de documentos médicos', 'Apoio administrativo ao profissional de saúde']} />
            <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: '#F0FDF9', border: `1px solid ${T}30` }}>
              <p className="text-sm leading-relaxed" style={{ color: '#065F46' }}>
                <strong>Importante:</strong> A Inteligência Artificial não realiza diagnóstico médico e não substitui a análise clínica
                realizada pelo profissional responsável pelo atendimento. Toda decisão médica permanece sob responsabilidade
                exclusiva do profissional de saúde.
              </p>
            </div>
          </Section>

          <Section n="4" title="Compartilhamento de Dados">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>Os dados poderão ser compartilhados:</p>
            <Items items={['Com o médico responsável pelo atendimento', 'Com provedores de infraestrutura tecnológica', 'Com processadores de pagamento', 'Mediante obrigação legal ou determinação judicial', 'Quando autorizado pelo titular']} />
            <p className="text-sm mt-3 font-medium" style={{ color: N }}>A Medicare não comercializa dados pessoais de seus usuários.</p>
          </Section>

          <Section n="5" title="Armazenamento e Segurança">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>
              São adotadas medidas técnicas e administrativas adequadas para proteger os dados contra:
            </p>
            <Items items={['Acesso não autorizado', 'Vazamento', 'Alteração indevida', 'Destruição', 'Perda acidental']} />
          </Section>

          <Section n="6" title="Direitos do Titular">
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#475569' }}>Nos termos da LGPD, o usuário poderá solicitar:</p>
            <Items items={['Confirmação do tratamento', 'Acesso aos dados', 'Correção de informações', 'Anonimização quando aplicável', 'Portabilidade', 'Eliminação quando legalmente possível', 'Revogação do consentimento']} />
          </Section>

          <Section n="7" title="Contato">
            <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
              Solicitações relacionadas à privacidade poderão ser encaminhadas para nossos contatos apresentados na{' '}
              <Link href="/" style={{ color: T }} className="hover:underline">página inicial</Link>.
            </p>
          </Section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs" style={{ color: '#94A3B8' }}>
          <Link href="/termos" className="hover:underline" style={{ color: T }}>Termos de Uso</Link>
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

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#94A3B8' }}>{title}</p>
      {children}
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
