import { Screen } from 'components/core'
import { WorkorderPage } from 'components/pages'

export default function Workorders() {
  const title = 'Ordens de Serviço'
  return (
    <Screen title={title} pageTitle={title}>
      <WorkorderPage />
    </Screen>
  )
}
