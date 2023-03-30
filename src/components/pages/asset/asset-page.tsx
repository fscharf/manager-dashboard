import { assetModelMap, assetStatusMap } from '@core/domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Heart, Thermometer, Zap } from 'react-feather'
import { selectors, thunks, useDispatch, useSelector } from 'store'
import { formatPercent } from 'utils/number'

type Props = {
  renderMax?: number
}

const AssetPage = ({ renderMax }: Props) => {
  const { assets } = useSelector(selectors.asset.getState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.asset.getAssets())
  }, [dispatch])

  return (
    <section className="flex flex-wrap gap-4">
      {assets.slice(0, renderMax || assets.length).map(asset => {
        return (
          <Link
            href={`assets/${asset.id}`}
            key={asset.id}
            className="bg-neutral-800 p-4 rounded gap-6 flex base:w-full lg:w-[calc(50%_-_8px)] xl:w-[calc(25%_-_8px)] hover:bg-neutral-700 cursor-pointer relative"
          >
            <small className="absolute top-0 right-0 m-4 p-2 bg-indigo-700 uppercase font-bold rounded">
              {assetStatusMap.get(asset.status)}
            </small>
            <section className="flex flex-col">
              <Image
                className="object-cover rounded h-[125px] w-[125px] mb-4"
                src={asset.image}
                alt={asset.name}
                width={100}
                height={100}
              />
              <div className="flex gap-6 flex-wrap">
                <div className="flex flex-col">
                  <small className="uppercase text-neutral-500 font-bold">
                    Nome
                  </small>
                  <span className="text-lg">{asset.name}</span>
                </div>
                <div className="flex flex-col">
                  <small className="uppercase text-neutral-500 font-bold">
                    Modelo
                  </small>
                  <span className="text-lg">
                    <span>{assetModelMap.get(asset.model)}</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <small className="uppercase text-neutral-500 font-bold">
                    Sensores
                  </small>
                  <span className="text-lg">{asset.sensors.join(', ')}</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4 flex-wrap">
                <span
                  title="Saúde em %"
                  className="flex gap-2 items-center h-max bg-neutral-900 p-2 rounded"
                >
                  <Heart className="w-[24px] text-red-500" />
                  {formatPercent(asset.healthscore)}
                </span>
                <span
                  title="Temperatura Máx."
                  className="flex gap-2 items-center h-max bg-neutral-900 p-2 rounded"
                >
                  <Thermometer className="w-[24px] text-blue-500" />
                  {asset.specifications.maxTemp} ºC
                </span>
                {asset.specifications.power ? (
                  <span
                    title="Potência em kWh"
                    className="flex gap-2 items-center h-max bg-neutral-900 p-2 rounded"
                  >
                    <Zap className="w-[24px] text-orange-500" />
                    {asset.specifications.power} kWh
                  </span>
                ) : null}

                {asset.specifications.rpm ? (
                  <span
                    title="RPM"
                    className="flex gap-2 items-center h-max bg-neutral-900 p-2 rounded"
                  >
                    <small className="font-bold text-amber-500">RPM</small>
                    {asset.specifications.rpm}
                  </span>
                ) : null}
              </div>
            </section>
          </Link>
        )
      })}
    </section>
  )
}

export default AssetPage
