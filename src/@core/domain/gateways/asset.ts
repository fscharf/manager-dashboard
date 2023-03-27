import { Asset } from '@core/domain/models'

export interface AssetGateway {
  get(): Promise<Asset[]>
  getById(id: number): Promise<Asset>
}
