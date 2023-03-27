import { UserGateway } from '@core/domain/gateways'
import { User } from '@core/domain/models'

export class GetUsersUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(): Promise<User[]> {
    return this.userGateway.get()
  }
}

export class GetUserDetailsUseCase {
  constructor(private userGateway: UserGateway) {}

  async execute(id: number): Promise<User> {
    return this.userGateway.getById(id)
  }
}
