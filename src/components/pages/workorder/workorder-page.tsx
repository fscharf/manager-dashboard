import { workorderPriorityMap, workorderStatusMap } from '@core/domain/models'
import Link from 'next/link'
import { useEffect } from 'react'
import { Eye, Users } from 'react-feather'
import { selectors, thunks, useDispatch, useSelector } from 'store'

type Props = {
  renderMax?: number
}

const WorkorderPage = ({ renderMax }: Props) => {
  const { users } = useSelector(selectors.user.getState)
  const { assets } = useSelector(selectors.asset.getState)
  const { workorders } = useSelector(selectors.workorder.getState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.unit.getUnits())
    dispatch(thunks.asset.getAssets())
    dispatch(thunks.workorder.getWorkorders())
  }, [dispatch])

  return (
    <section className="flex flex-wrap gap-4">
      {workorders?.slice(0, renderMax || workorders.length).map(workorder => {
        const asset = assets.find(asset => asset.id === workorder.assetId)

        return (
          <Link
            href={`/workorders/${workorder.id}`}
            key={workorder.id}
            className="bg-neutral-800 p-4 rounded gap-6 flex base:w-full lg:w-[calc(50%_-_8px)] xl:w-[calc(25%_-_8px)] hover:bg-neutral-700 cursor-pointer"
          >
            <section className="flex gap-6 flex-col">
              <header>
                <h2 className="font-bold text-xl mb-4">
                  <span className="text-neutral-500">
                    #{workorder.id}&nbsp;
                  </span>
                  {workorder.title}
                </h2>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <small className="uppercase text-neutral-500 font-bold">
                      Status
                    </small>
                    <small className="bg-indigo-600 w-max p-2 rounded uppercase font-bold mt-2">
                      {workorderStatusMap.get(workorder.status)}
                    </small>
                  </div>
                  <div className="flex flex-col">
                    <small className="uppercase text-neutral-500 font-bold">
                      Prioridade
                    </small>
                    <small className="bg-red-600 w-max p-2 rounded uppercase font-bold mt-2">
                      {workorderPriorityMap.get(workorder.priority)}
                    </small>
                  </div>
                </div>
              </header>
              <div className="flex flex-col">
                <small className="uppercase text-neutral-500 font-bold">
                  Descrição
                </small>
                <span>{workorder.description}</span>
              </div>
              <div className="flex flex-col">
                <Users className="w-[24px] stroke-neutral-500 mb-2" />
                <span>
                  {users
                    .filter(user =>
                      workorder.assignedUserIds?.includes(user.id)
                    )
                    .map(user => user.name)
                    .join(', ')}
                </span>
              </div>
              <div className="flex flex-col">
                <small className="uppercase text-neutral-500 font-bold mb-2">
                  Ativo
                </small>

                <Link
                  className="p-2 rounded bg-indigo-600 w-max flex gap-2 font-bold hover:opacity-90"
                  href={`/assets/${asset?.id}`}
                  key={asset?.id}
                >
                  <Eye className="w-[24px]" />
                  {asset?.name}
                </Link>
              </div>
            </section>
          </Link>
        )
      })}
    </section>
  )
}

export default WorkorderPage
