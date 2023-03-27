import { AssetGateway } from '@core/domain/gateways'
import { Asset } from '@core/domain/models'

export class GetAssetsUseCase {
  constructor(private assetGateway: AssetGateway) {}

  async execute(): Promise<Asset[]> {
    return this.assetGateway.get()
  }
}

export class GetAssetDetailsUseCase {
  constructor(private assetGateway: AssetGateway) {}

  async execute(id: number): Promise<Asset> {
    return this.assetGateway.getById(id)
  }
}
