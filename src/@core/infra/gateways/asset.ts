import { AssetGateway } from '@core/domain/gateways'
import { Asset } from '@core/domain/models'
import { AxiosInstance } from 'axios'

export class AssetHttpGateway implements AssetGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async get(): Promise<Asset[]> {
    const response = await this.httpClient.get<Asset[]>('/assets')
    return response.data
  }

  async getById(id: number): Promise<Asset> {
    const response = await this.httpClient.get<Asset>(`/assets/${id}`)
    return response.data
  }
}
