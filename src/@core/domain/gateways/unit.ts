import { Unit } from '@core/domain/models'

export interface UnitGateway {
  get(): Promise<Unit[]>
  getById(id: number): Promise<Unit>
}
