import { useEffect } from 'react'
import { selectors, thunks, useDispatch, useSelector } from 'store'

const UnitPage = () => {
  const { units } = useSelector(selectors.unit.getState)
  const { companies } = useSelector(selectors.company.getState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.unit.getUnits())
    dispatch(thunks.company.getCompanies())
  }, [dispatch])

  return (
    <section className="p-4 rounded bg-neutral-800 w-max overflow-hidden">
      <table className="table">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Empresa</th>
        </tr>
        {units.map(unit => {
          const company = companies.find(
            company => company.id === unit.companyId
          )

          return (
            <tr key={unit.id}>
              <td className="text-neutral-500">#{unit.id}</td>
              <td>{unit.name}</td>
              <td>{company?.name}</td>
            </tr>
          )
        })}
      </table>
    </section>
  )
}

export default UnitPage
