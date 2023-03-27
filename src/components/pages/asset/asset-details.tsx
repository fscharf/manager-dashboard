import { assetModelMap, AssetStatus, assetStatusMap } from '@core/domain/models'
import { Chart, Screen, Select } from 'components/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ArrowLeft, Clock, Heart, Thermometer, Users, Zap } from 'react-feather'
import { actions, selectors, thunks, useDispatch, useSelector } from 'store'
import { formatDate } from 'utils/date'
import { formatPercent } from 'utils/number'

const AssetDetails = () => {
  const dispatch = useDispatch()
  const { currentAsset } = useSelector(selectors.asset.getState)
  const { users } = useSelector(selectors.user.getState)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    dispatch(thunks.asset.getAssetById(Number(id)))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(thunks.user.getUsers())
  }, [dispatch])

  const selectItems = Array.from(assetStatusMap).map(([key, value]) => {
    return {
      label: value,
      value: key.toString()
    }
  })

  return (
    <Screen title={currentAsset.name}>
      <h2 className="font-bold text-2xl flex items-center flex-wrap gap-2 mb-6 sticky top-0 bg-neutral-900 py-2">
        <button
          className="transition-all hover:bg-neutral-700 p-2 rounded flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
        <span className="text-neutral-600">#{currentAsset.id}</span>{' '}
        {currentAsset.name}
      </h2>
      <article className="flex gap-8 flex-col">
        <section className="flex flex-wrap gap-10 bg-neutral-800 rounded p-4 base:w-full md:w-max">
          <Image
            className="object-cover rounded h-[150px] w-[150px] min-w-[150px]"
            src={currentAsset.image}
            alt={currentAsset.name}
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Nome
              </small>
              <span className="text-lg">{currentAsset.name}</span>
            </div>
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Modelo
              </small>
              <span className="text-lg">
                {assetModelMap.get(currentAsset.model)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Sensores
              </small>
              <span className="text-lg">
                {currentAsset.sensors?.join(', ')}
              </span>
            </div>
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Status
              </small>
              <Select
                onChange={value =>
                  dispatch(actions.asset.changeStatus(value as AssetStatus))
                }
                items={selectItems}
                defaultItem={{
                  label: assetStatusMap.get(currentAsset.status),
                  value: currentAsset.status
                }}
              />
            </div>
          </div>
        </section>

        <section className="flex overflow-auto gap-4">
          <span
            title="Saúde em %"
            className="flex flex-col justify-between gap-2 h-[150px] p-4 rounded w-[150px] min-w-[150px] bg-neutral-800"
          >
            <Heart className="w-[24px] text-red-500" />
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Saúde
              </small>
              {formatPercent(currentAsset.healthscore)}
            </div>
          </span>
          <span
            title="Temperatura Máx."
            className="flex flex-col justify-between gap-2 h-[150px] p-4 rounded w-[150px] min-w-[150px] bg-neutral-800"
          >
            <Thermometer className="w-[24px] text-blue-500" />
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Temp. Máx.
              </small>
              {currentAsset.specifications?.maxTemp} ºC
            </div>
          </span>
          {currentAsset.specifications?.power ? (
            <span
              title="Potência em kWh"
              className="flex flex-col justify-between gap-2 h-[150px] p-4 rounded w-[150px] min-w-[150px] bg-neutral-800"
            >
              <Zap className="w-[24px] text-orange-500" />
              <div className="flex flex-col">
                <small className="uppercase text-neutral-500 font-bold">
                  Potência
                </small>
                {currentAsset.specifications?.power} kWh
              </div>
            </span>
          ) : null}
          {currentAsset.specifications?.rpm ? (
            <span
              title="RPM"
              className="flex flex-col justify-between gap-2 h-[150px] p-4 rounded w-[150px] min-w-[150px] bg-neutral-800"
            >
              <small className="font-bold text-amber-500">RPM</small>
              <div className="flex flex-col">
                <small className="uppercase text-neutral-500 font-bold">
                  RPM
                </small>
                {currentAsset.specifications.rpm}
              </div>
            </span>
          ) : null}
        </section>
        <section className="flex flex-wrap gap-4">
          <div className="bg-neutral-800 p-4 rounded md:min-w-[300px] base:w-full md:w-max">
            <small className="font-bold uppercase text-neutral-500">
              <Users className="w-[24px] text-neutral-100" />
              Usuários
            </small>
            <div className="flex flex-col gap-2 mt-4">
              {users
                .filter(user => currentAsset.assignedUserIds?.includes(user.id))
                .map(user => user.name)
                .join(', ')}
            </div>
          </div>
          <div className="bg-neutral-800 p-4 rounded md:min-w-[300px] base:w-full md:w-max">
            <small className="font-bold uppercase text-neutral-500">
              <Clock className="w-[24px] text-neutral-100" />
              Histórico
            </small>
            <table className="mt-8 table">
              <tr>
                <th>Data</th>
                <th>Status</th>
              </tr>
              {Array.from(currentAsset.healthHistory || [])
                .sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                )
                .slice(0, 4)
                .map((history, key) => {
                  return (
                    <tr key={key}>
                      <td className="text-neutral-500">
                        {formatDate(new Date(history.timestamp || 0))}
                      </td>
                      <td>{assetStatusMap.get(history.status)}</td>
                    </tr>
                  )
                })}
            </table>
          </div>
        </section>
        <section>
          <Chart
            title="Métricas Uptime (Ligada)"
            categories={['Total de Coletas', 'Total de Horas de Coletas']}
            series={[
              {
                type: 'bar',
                data: [
                  currentAsset.metrics?.totalCollectsUptime,
                  currentAsset.metrics?.totalUptime
                ]
              }
            ]}
          />
          <small className="text-neutral-500">
            Última atualização:{' '}
            {formatDate(new Date(currentAsset.metrics?.lastUptimeAt || 0))}
          </small>
        </section>
      </article>
    </Screen>
  )
}

export default AssetDetails
