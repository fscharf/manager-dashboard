import { Screen } from 'components/core'
import { AssetPage } from 'components/pages'

export default function Assets() {
  const title = 'Ativos'
  return (
    <Screen title={title} pageTitle={title}>
      <AssetPage />
    </Screen>
  )
}
