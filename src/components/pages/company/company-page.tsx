import { useEffect } from 'react'
import { selectors, thunks, useDispatch, useSelector } from 'store'

const CompanyPage = () => {
  const { companies } = useSelector(selectors.company.getState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunks.company.getCompanies())
  }, [dispatch])

  return (
    <section className="p-4 rounded bg-neutral-800 w-max overflow-hidden">
      <table className="table">
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
        {companies.map(company => {
          return (
            <tr key={company.id}>
              <td className="text-neutral-500">#{company.id}</td>
              <td>{company.name}</td>
            </tr>
          )
        })}
      </table>
    </section>
  )
}

export default CompanyPage
