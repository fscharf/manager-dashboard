import { CompanyGateway } from '@core/domain/gateways'
import { Company } from '@core/domain/models'
import { AxiosInstance } from 'axios'

export class CompanyHttpGateway implements CompanyGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async get(): Promise<Company[]> {
    const response = await this.httpClient.get<Company[]>('/companies')
    return response.data
  }

  async getById(id: number): Promise<Company> {
    const response = await this.httpClient.get<Company>(`/companies/${id}`)
    return response.data
  }
}
