import { useEffect } from 'react'
import { selectors, thunks, useDispatch, useSelector } from 'store'

const UserPage = () => {
  const { users } = useSelector(selectors.user.getState)
  const { units } = useSelector(selectors.unit.getState)
  const { companies } = useSelector(selectors.company.getState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.user.getUsers())
    dispatch(thunks.unit.getUnits())
    dispatch(thunks.company.getCompanies())
  }, [dispatch])

  return (
    <section className="p-4 rounded bg-neutral-800 overflow-x-auto">
      <table className="table">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Unidade</th>
          <th>Empresa</th>
        </tr>
        {users.map(user => {
          const unit = units.find(unit => unit.id === user.unitId)
          const company = companies.find(
            company => company.id === user.companyId
          )

          return (
            <tr key={user.id}>
              <td className="text-neutral-500">#{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{unit?.name}</td>
              <td>{company?.name}</td>
            </tr>
          )
        })}
      </table>
    </section>
  )
}

export default UserPage
