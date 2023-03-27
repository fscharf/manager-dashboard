import { UserGateway } from '@core/domain/gateways'
import { User } from '@core/domain/models'
import { AxiosInstance } from 'axios'

export class UserHttpGateway implements UserGateway {
  constructor(private readonly httpClient: AxiosInstance) {}

  async get(): Promise<User[]> {
    const response = await this.httpClient.get<User[]>('/users')
    return response.data
  }

  async getById(id: number): Promise<User> {
    const response = await this.httpClient.get<User>(`/users/${id}`)
    return response.data
  }
}
