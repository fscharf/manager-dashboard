import {
  GetAssetDetailsUseCase,
  GetAssetsUseCase,
  GetCompaniesUseCase,
  GetCompanyDetailsUseCase,
  GetUnitDetailsUseCase,
  GetUnitsUseCase,
  GetUserDetailsUseCase,
  GetUsersUseCase,
  GetWorkorderDetailsUseCase,
  GetWorkordersUseCase
} from '@core/application/usecases'
import { Container } from 'inversify'
import 'reflect-metadata'
import {
  AssetHttpGateway,
  CompanyHttpGateway,
  UnitHttpGateway,
  UserHttpGateway,
  WorkorderHttpGateway
} from './gateways'
import { httpClient } from './http-client'

export const Registry = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  AssetGateway: Symbol.for('AssetGateway'),
  UserGateway: Symbol.for('UserGateway'),
  WorkorderGateway: Symbol.for('WorkorderGateway'),
  CompanyGateway: Symbol.for('CompanyGateway'),
  UnitGateway: Symbol.for('UnitGateway'),
  GetAssetsUseCase: Symbol.for('GetAssetsUseCase'),
  GetAssetDetailsUseCase: Symbol.for('GetAssetDetailsUseCase'),
  GetUsersUseCase: Symbol.for('GetUsersUseCase'),
  GetUserDetailsUseCase: Symbol.for('GetUserDetailsUseCase'),
  GetWorkordersUseCase: Symbol.for('GetWorkorderUseCase'),
  GetWorkorderDetailsUseCase: Symbol.for('GetWorkorderDetailsUseCase'),
  GetCompaniesUseCase: Symbol.for('GetCompaniesUseCase'),
  GetCompanyDetailsUseCase: Symbol.for('GetCompanyDetailsUseCase'),
  GetUnitsUseCase: Symbol.for('GetUnitsUseCase'),
  GetUnitDetailsUseCase: Symbol.for('GetUnitDetailsUseCase')
}

export const container = new Container()

// HttpClient
container.bind(Registry.AxiosAdapter).toConstantValue(httpClient)

// HttpGateways
container.bind(Registry.AssetGateway).toDynamicValue(context => {
  return new AssetHttpGateway(context.container.get(Registry.AxiosAdapter))
})
container.bind(Registry.UserGateway).toDynamicValue(context => {
  return new UserHttpGateway(context.container.get(Registry.AxiosAdapter))
})
container.bind(Registry.WorkorderGateway).toDynamicValue(context => {
  return new WorkorderHttpGateway(context.container.get(Registry.AxiosAdapter))
})
container.bind(Registry.CompanyGateway).toDynamicValue(context => {
  return new CompanyHttpGateway(context.container.get(Registry.AxiosAdapter))
})
container.bind(Registry.UnitGateway).toDynamicValue(context => {
  return new UnitHttpGateway(context.container.get(Registry.AxiosAdapter))
})

// Usecases
container.bind(Registry.GetAssetsUseCase).toDynamicValue(context => {
  return new GetAssetsUseCase(context.container.get(Registry.AssetGateway))
})
container.bind(Registry.GetAssetDetailsUseCase).toDynamicValue(context => {
  return new GetAssetDetailsUseCase(
    context.container.get(Registry.AssetGateway)
  )
})
container.bind(Registry.GetUsersUseCase).toDynamicValue(context => {
  return new GetUsersUseCase(context.container.get(Registry.UserGateway))
})
container.bind(Registry.GetUserDetailsUseCase).toDynamicValue(context => {
  return new GetUserDetailsUseCase(context.container.get(Registry.UserGateway))
})
container.bind(Registry.GetWorkordersUseCase).toDynamicValue(context => {
  return new GetWorkordersUseCase(
    context.container.get(Registry.WorkorderGateway)
  )
})
container.bind(Registry.GetWorkorderDetailsUseCase).toDynamicValue(context => {
  return new GetWorkorderDetailsUseCase(
    context.container.get(Registry.WorkorderGateway)
  )
})
container.bind(Registry.GetCompaniesUseCase).toDynamicValue(context => {
  return new GetCompaniesUseCase(context.container.get(Registry.CompanyGateway))
})
container.bind(Registry.GetCompanyDetailsUseCase).toDynamicValue(context => {
  return new GetCompanyDetailsUseCase(
    context.container.get(Registry.CompanyGateway)
  )
})
container.bind(Registry.GetUnitsUseCase).toDynamicValue(context => {
  return new GetUnitsUseCase(context.container.get(Registry.UnitGateway))
})
container.bind(Registry.GetUnitDetailsUseCase).toDynamicValue(context => {
  return new GetUnitDetailsUseCase(context.container.get(Registry.UnitGateway))
})
