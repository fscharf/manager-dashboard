import { User } from '@core/domain/models'

export interface UserGateway {
  get(): Promise<User[]>
  getById(id: number): Promise<User>
}
