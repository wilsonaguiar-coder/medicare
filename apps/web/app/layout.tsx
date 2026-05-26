import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Medicare — Consulta Médica Online',
    template: '%s | Medicare',
  },
  description:
    'Plataforma de teleconsulta médica sob demanda. Consulte um médico qualificado de onde você estiver.',
  keywords: ['teleconsulta', 'médico online', 'consulta médica', 'telemedicina'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
