import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Painel do Médico' }

export default function PainelMedicoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dr. Carlos Lima</h1>
          <p className="text-gray-600">Dermatologia · CRM 12345/SP</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Disponível
          </span>
          <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
            Ficar Offline
          </button>
        </div>
      </div>

      {/* Cards financeiros */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: 'Consultas este mês', value: '18' },
          { label: 'Receita bruta', value: 'R$ 2.160' },
          { label: 'Repasse líquido', value: 'R$ 1.728' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chamada aguardando */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
              Novo Chamado — Psiquiatria
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">Maria Fernanda, 34 anos</p>
            <p className="mt-1 text-sm text-gray-600">
              Queixa: Ansiedade e insônia há 3 semanas. Sem medicamentos em uso.
            </p>
            <p className="mt-2 text-xs text-gray-500">3 documentos enviados · Resumo IA disponível</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              Aceitar (58s)
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Recusar
            </button>
          </div>
        </div>
      </div>

      {/* Histórico */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Consultas Recentes</h2>
          <button className="text-sm text-blue-600 hover:underline">Relatório mensal</button>
        </div>
        <div className="divide-y divide-gray-50">
          {CONSULTAS_MOCK.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{c.patient}</p>
                <p className="text-xs text-gray-500">{c.date} · {c.specialty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">R$ {c.amount}</p>
                <p className="text-xs text-gray-500">Repasse: R$ {c.repasse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CONSULTAS_MOCK = [
  { id: '1', patient: 'João Silva', specialty: 'Dermatologia', date: '25/05/2026', amount: '120,00', repasse: '96,00' },
  { id: '2', patient: 'Ana Souza', specialty: 'Dermatologia', date: '24/05/2026', amount: '120,00', repasse: '96,00' },
  { id: '3', patient: 'Pedro Costa', specialty: 'Dermatologia', date: '22/05/2026', amount: '120,00', repasse: '96,00' },
]
