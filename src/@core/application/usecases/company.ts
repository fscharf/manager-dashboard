import { CompanyGateway } from '@core/domain/gateways'
import { Company } from '@core/domain/models'

export class GetCompaniesUseCase {
  constructor(private companyGateway: CompanyGateway) {}

  async execute(): Promise<Company[]> {
    return this.companyGateway.get()
  }
}

export class GetCompanyDetailsUseCase {
  constructor(private companyGateway: CompanyGateway) {}

  async execute(id: number): Promise<Company> {
    return this.companyGateway.getById(id)
  }
}
