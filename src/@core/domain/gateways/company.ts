import { Company } from '@core/domain/models'

export interface CompanyGateway {
  get(): Promise<Company[]>
  getById(id: number): Promise<Company>
}
