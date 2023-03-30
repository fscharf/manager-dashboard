import {
  workorderPriorityMap,
  WorkorderStatus,
  workorderStatusMap
} from '@core/domain/models'
import { Screen } from 'components/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CheckSquare,
  Eye,
  Square,
  UserCheck,
  UserPlus,
  Users
} from 'react-feather'
import { actions, selectors, thunks, useDispatch, useSelector } from 'store'

export default function Details() {
  const [isEditable, setIsEditable] = useState<boolean>(false)

  const dispatch = useDispatch()
  const { currentWorkorder } = useSelector(selectors.workorder.getState)
  const { users } = useSelector(selectors.user.getState)
  const { assets } = useSelector(selectors.asset.getState)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    dispatch(thunks.workorder.getWorkorderById(Number(id)))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(thunks.user.getUsers())
    dispatch(thunks.asset.getAssets())
  }, [dispatch])

  useEffect(() => {
    const checklistIsCompleted = currentWorkorder.checklist?.every(
      item => item.completed
    )

    if (checklistIsCompleted) {
      dispatch(actions.workorder.changeStatus(WorkorderStatus.completed))
    } else {
      dispatch(actions.workorder.changeStatus(WorkorderStatus.inProgress))
    }
  }, [currentWorkorder.checklist, dispatch])

  const asset = assets.find(asset => asset.id === currentWorkorder.assetId)

  return (
    <Screen title={currentWorkorder.title}>
      <h2 className="font-bold text-2xl flex items-center flex-wrap gap-2 mb-6 sticky top-0 bg-neutral-900 py-2">
        <button
          className="transition-all hover:bg-neutral-700 p-2 rounded flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
        <span className="text-neutral-600">#{currentWorkorder.id}</span>{' '}
        {currentWorkorder.title}
      </h2>
      <article className="flex gap-6 flex-col p-4 bg-neutral-800 md:w-max rounded base:w-full">
        <section className="flex flex-col">
          <small className="uppercase text-neutral-500 font-bold">Título</small>
          <span>{currentWorkorder.title}</span>
        </section>
        <section>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Status
              </small>
              <small className="bg-indigo-600 w-max p-2 rounded uppercase font-bold mt-2">
                {workorderStatusMap.get(currentWorkorder.status)}
              </small>
            </div>
            <div className="flex flex-col">
              <small className="uppercase text-neutral-500 font-bold">
                Prioridade
              </small>
              <small className="bg-red-600 w-max p-2 rounded uppercase font-bold mt-2">
                {workorderPriorityMap.get(currentWorkorder.priority)}
              </small>
            </div>
          </div>
        </section>
        <section className="flex flex-col">
          <small className="uppercase text-neutral-500 font-bold">
            Descrição
          </small>
          <span>{currentWorkorder.description}</span>
        </section>
        <section className="flex flex-col">
          <Users className="w-[24px] stroke-neutral-500 mb-2" />

          <div className="flex items-center gap-2">
            {isEditable ? (
              <div className="flex flex-wrap max-w-[300px] gap-2">
                {users.map(user => {
                  const isSelected = currentWorkorder.assignedUserIds?.includes(
                    user.id
                  )

                  return (
                    <span
                      className={`p-2 rounded cursor-pointer ${
                        isSelected
                          ? 'border border-green-600'
                          : 'bg-neutral-900 hover:opacity-90'
                      }`}
                      key={user.id}
                      onClick={() =>
                        isSelected
                          ? dispatch(actions.workorder.removeUser(user.id))
                          : dispatch(actions.workorder.addUser(user.id))
                      }
                    >
                      {user.name}
                    </span>
                  )
                })}
              </div>
            ) : (
              <span className="flex items-center gap-2">
                {users
                  .filter(user =>
                    currentWorkorder.assignedUserIds?.includes(user.id)
                  )
                  .map(user => user.name)
                  .join(', ')}
              </span>
            )}
            <button
              title="Editar responsáveis"
              className="bg-indigo-600 p-2 rounded"
              onClick={() => setIsEditable(!isEditable)}
            >
              {isEditable ? <UserCheck /> : <UserPlus />}
            </button>
          </div>
        </section>
        <section className="flex flex-col">
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
        </section>
      </article>
      <article className="flex gap-6 flex-col p-4 bg-neutral-800 md:w-max rounded base:w-full mt-4">
        <h4 className="font-bold text-lg">Checklist</h4>
        {currentWorkorder.checklist?.map((checklist, key) => {
          return (
            <section
              key={key}
              className="flex gap-2 cursor-pointer"
              onClick={() =>
                dispatch(actions.workorder.completeChecklistItem(key))
              }
            >
              {checklist.completed ? (
                <CheckSquare className="w-[24px] stroke-green-600" />
              ) : (
                <Square className="w-[24px] stroke-neutral-500" />
              )}
              <span
                className={`${
                  checklist.completed ? 'line-through text-neutral-500' : ''
                }`}
              >
                {checklist.task}
              </span>
            </section>
          )
        })}
      </article>
    </Screen>
  )
}
