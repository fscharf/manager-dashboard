import { Workorder } from '@core/domain/models'

export interface WorkorderGateway {
  get(): Promise<Workorder[]>
  getById(id: number): Promise<Workorder>
}
