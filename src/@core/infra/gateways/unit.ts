import { UnitGateway } from '@core/domain/gateways'
import { Unit } from '@core/domain/models'
import { AxiosInstance } from 'axios'

export class UnitHttpGateway implements UnitGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async get(): Promise<Unit[]> {
    const response = await this.httpClient.get<Unit[]>('/units')
    return response.data
  }

  async getById(id: number): Promise<Unit> {
    const response = await this.httpClient.get<Unit>(`/units/${id}`)
    return response.data
  }
}
