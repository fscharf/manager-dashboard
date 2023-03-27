import { Screen } from 'components/core'
import Link from 'next/link'
import { Home } from 'react-feather'

export default function FourOhFour() {
  return (
    <Screen pageTitle="404 - Página não encontrada">
      <Link
        href="/"
        className="p-2 rounded bg-indigo-700 flex gap-2 items-center w-max hover:opacity-90"
      >
        <Home />
        Voltar ao início
      </Link>
    </Screen>
  )
}
