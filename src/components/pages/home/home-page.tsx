import { useRoutes } from 'hooks'
import Link from 'next/link'

const HomePage = () => {
  const routes = useRoutes()
  return (
    <article className="overflow-hidden">
      <section className="flex gap-4 overflow-auto">
        {routes.slice(1).map(({ Icon, target, label }) => {
          return (
            <Link
              href={target}
              key={target}
              className="flex flex-col justify-between gap-2 h-[150px] p-4 rounded w-[150px] min-w-[150px] bg-neutral-800 hover:bg-neutral-700"
            >
              <Icon className="w-[24px] text-indigo-600" />
              <span className="uppercase font-bold">{label}</span>
            </Link>
          )
        })}
      </section>
      {/** TODO: Colocar um gráfico de healthcheck aqui */}
    </article>
  )
}

export default HomePage
