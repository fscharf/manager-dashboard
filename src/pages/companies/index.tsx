import { Screen } from 'components/core'
import { CompanyPage } from 'components/pages'

export default function Companies() {
  const title = 'Empresas'
  return (
    <Screen pageTitle={title} title={title}>
      <CompanyPage />
    </Screen>
  )
}
