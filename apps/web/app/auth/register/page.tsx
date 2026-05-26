import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cadastro' }

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="text-xl font-bold text-gray-900">Medicare</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Criar conta gratuita</h1>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex gap-2 rounded-lg bg-gray-100 p-1">
            <button className="flex-1 rounded-md bg-white py-2 text-sm font-medium text-gray-900 shadow-sm">
              Paciente
            </button>
            <button className="flex-1 rounded-md py-2 text-sm font-medium text-gray-600">
              Médico
            </button>
          </div>

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  placeholder="João"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Sobrenome</label>
                <input
                  type="text"
                  placeholder="Silva"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">CPF</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com.br"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Celular</label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <p className="text-xs text-gray-500">
              Ao continuar, você concorda com os{' '}
              <Link href="/termos" className="text-blue-600">
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link href="/privacidade" className="text-blue-600">
                Política de Privacidade
              </Link>
              .
            </p>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Criar conta
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Já tem conta?{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-700">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
