import { WorkorderGateway } from '@core/domain/gateways'
import { Workorder } from '@core/domain/models'

export class GetWorkordersUseCase {
  constructor(private workorderGateway: WorkorderGateway) {}

  async execute(): Promise<Workorder[]> {
    return this.workorderGateway.get()
  }
}

export class GetWorkorderDetailsUseCase {
  constructor(private workorderGateway: WorkorderGateway) {}

  async execute(id: number): Promise<Workorder> {
    return this.workorderGateway.getById(id)
  }
}
