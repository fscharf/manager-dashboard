import { Screen } from 'components/core'
import { UserPage } from 'components/pages'

export default function Users() {
  const title = 'Usuários'
  return (
    <Screen pageTitle={title} title={title}>
      <UserPage />
    </Screen>
  )
}
