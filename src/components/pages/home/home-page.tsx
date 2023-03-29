import Link from 'next/link'
import { ArrowRight } from 'react-feather'
import { AssetPage } from '../asset'
import WorkorderPage from '../workorder/workorder-page'

const HomePage = () => {
  return (
    <>
      <h2 className="font-bold text-2xl mb-4">Ativos</h2>
      <AssetPage renderMax={3} />
      <Link
        href="/assets"
        className="p-2 rounded bg-indigo-700 flex gap-2 items-center w-max hover:opacity-90 mt-4 mb-8"
      >
        Ver todos ativos <ArrowRight />
      </Link>
      <h2 className="font-bold text-2xl mb-4">Ordens de Serviço</h2>
      <WorkorderPage renderMax={2} />
      <Link
        href="/workorders"
        className="p-2 rounded bg-indigo-700 flex gap-2 items-center w-max hover:opacity-90 mt-4"
      >
        Ver todas ordens de serviço <ArrowRight />
      </Link>
    </>
  )
}

export default HomePage
