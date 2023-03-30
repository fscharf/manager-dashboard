import { Chart } from 'components/core'
import { useRoutes } from 'hooks'
import Link from 'next/link'
import { useEffect } from 'react'
import { Activity } from 'react-feather'
import { selectors, thunks, useDispatch, useSelector } from 'store'
import { formatPercent } from 'utils/number'

const HomePage = () => {
  const routes = useRoutes()
  const dispatch = useDispatch()
  const { assets } = useSelector(selectors.asset.getState)

  useEffect(() => {
    dispatch(thunks.asset.getAssets())
  }, [dispatch])

  const healthCheck = assets.reduce<number[]>((list, asset) => {
    list.push(asset.healthscore)
    return list
  }, [])

  return (
    <article className="overflow-hidden">
      <section className="flex gap-4 overflow-auto mb-8">
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
      <h2 className="font-bold text-2xl mb-4 flex gap-2">
        <Activity className="text-red-600" />
        Healthcheck
      </h2>
      <section className="max-w-[800px]">
        <Chart
          series={[
            {
              type: 'column',
              data: healthCheck,
              name: 'Saúde em %'
            }
          ]}
          categories={assets.map(asset => asset.name)}
          options={{
            tooltip: {
              borderWidth: 0,
              formatter: function () {
                return `Saúde de ${this.point.category}:<br/><b>${formatPercent(
                  this.y || 0
                )}</b>`
              }
            }
          }}
        />
      </section>
    </article>
  )
}

export default HomePage
