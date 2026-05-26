import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Painel do Paciente' }

export default function PainelPacientePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bom dia, João!</h1>
          <p className="text-gray-600">Aqui estão suas consultas e documentos.</p>
        </div>
        <a
          href="/consulta/nova"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nova Consulta
        </a>
      </div>

      {/* Cards resumo */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: 'Consultas realizadas', value: '3' },
          { label: 'Documentos enviados', value: '7' },
          { label: 'Último atendimento', value: '20/05/2026' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Histórico */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Histórico de Consultas</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {CONSULTAS_MOCK.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{c.specialty}</p>
                <p className="text-xs text-gray-500">Dr. {c.doctor} · {c.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={[
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  c.status === 'Concluída' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700',
                ].join(' ')}>
                  {c.status}
                </span>
                {c.status === 'Concluída' && (
                  <button className="text-xs text-blue-600 hover:underline">Recibo IRPF</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CONSULTAS_MOCK = [
  { id: '1', specialty: 'Clínica Médica', doctor: 'Ana Souza', date: '20/05/2026', status: 'Concluída' },
  { id: '2', specialty: 'Dermatologia', doctor: 'Carlos Lima', date: '10/05/2026', status: 'Concluída' },
  { id: '3', specialty: 'Psiquiatria', doctor: 'Marina Costa', date: '02/05/2026', status: 'Concluída' },
]
