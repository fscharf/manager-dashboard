import { WorkorderGateway } from '@core/domain/gateways'
import { Workorder } from '@core/domain/models'
import { AxiosInstance } from 'axios'

export class WorkorderHttpGateway implements WorkorderGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async get(): Promise<Workorder[]> {
    const response = await this.httpClient.get<Workorder[]>('/workorders')
    return response.data
  }

  async getById(id: number): Promise<Workorder> {
    const response = await this.httpClient.get<Workorder>(`/workorders/${id}`)
    return response.data
  }
}
