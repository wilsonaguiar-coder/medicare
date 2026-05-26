import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Aviso de emergência — obrigatório conforme especificação */}
      <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-center text-sm text-red-700">
        <strong>Atenção:</strong> Esta plataforma não se destina ao atendimento de emergências
        médicas. Em caso de risco imediato à vida, acione o{' '}
        <strong>SAMU pelo 192</strong>.
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="text-xl font-bold text-gray-900">Medicare</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
              Entrar
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Cadastrar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Consulta Médica Online{' '}
            <span className="text-blue-600">Quando Você Precisar</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Conecte-se com médicos qualificados por videochamada, de onde você estiver. Rápido,
            seguro e com receituário digital.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/consulta/nova"
              className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-700"
            >
              Iniciar Consulta
            </Link>
            <Link
              href="/auth/register?role=doctor"
              className="rounded-xl border border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50"
            >
              Sou Médico
            </Link>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Especialidades Disponíveis
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SPECIALTIES.map((s) => (
              <div
                key={s.key}
                className="flex flex-col items-center rounded-xl border border-gray-100 p-4 text-center hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="mb-2 text-2xl">{s.icon}</span>
                <span className="text-sm font-medium text-gray-700">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">Como Funciona</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-500">
        <p>© 2026 Medicare. Todos os direitos reservados.</p>
        <p className="mt-1">
          Plataforma de teleconsulta médica sob demanda — não substitui atendimento de emergência.
        </p>
      </footer>
    </main>
  )
}

const SPECIALTIES = [
  { key: 'clinical', label: 'Clínica Médica', icon: '🩺' },
  { key: 'pediatrics', label: 'Pediatria', icon: '👶' },
  { key: 'dermatology', label: 'Dermatologia', icon: '🔬' },
  { key: 'gynecology', label: 'Ginecologia', icon: '🌸' },
  { key: 'orthopedics', label: 'Ortopedia', icon: '🦴' },
  { key: 'psychiatry', label: 'Psiquiatria', icon: '🧠' },
  { key: 'cardiology', label: 'Cardiologia', icon: '❤️' },
  { key: 'neurology', label: 'Neurologia', icon: '⚡' },
  { key: 'endocrinology', label: 'Endocrinologia', icon: '⚗️' },
  { key: 'gastroenterology', label: 'Gastroenterologia', icon: '🫁' },
]

const STEPS = [
  {
    title: 'Cadastre-se e descreva seus sintomas',
    description: 'Crie sua conta gratuitamente e preencha o questionário de pré-triagem.',
  },
  {
    title: 'Pague e aguarde o médico',
    description: 'Realize o pagamento por Pix ou cartão. Um médico disponível aceitará em instantes.',
  },
  {
    title: 'Consulte por vídeo',
    description: 'Realize a consulta por videochamada e receba receitas e laudos digitais.',
  },
]
