import { Screen } from 'components/core'
import { UnitPage } from 'components/pages'

export default function Units() {
  const title = 'Unidades'
  return (
    <Screen pageTitle={title} title={title}>
      <UnitPage />
    </Screen>
  )
}
