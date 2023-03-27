import { UnitGateway } from '@core/domain/gateways'
import { Unit } from '@core/domain/models'

export class GetUnitsUseCase {
  constructor(private unitGateway: UnitGateway) {}

  async execute(): Promise<Unit[]> {
    return this.unitGateway.get()
  }
}

export class GetUnitDetailsUseCase {
  constructor(private unitGateway: UnitGateway) {}

  async execute(id: number): Promise<Unit> {
    return this.unitGateway.getById(id)
  }
}
