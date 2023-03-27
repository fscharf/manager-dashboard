export interface Asset {
  assignedUserIds: number[]
  companyId: number
  healthHistory: HealthHistory[]
  healthscore: number
  id: number
  image: string
  metrics: AssetMetrics
  model: AssetModel
  name: string
  sensors: string[]
  specifications: AssetSpecifications
  status: AssetStatus
  unitId: number
}

export type HealthHistory = {
  status: AssetStatus
  timestamp: string
}

export enum AssetStatus {
  inOperation = 'inOperation',
  inDowntime = 'inDowntime',
  inAlert = 'inAlert',
  unplannedStop = 'unplannedStop',
  plannedStop = 'plannedStop'
}

export type AssetMetrics = {
  lastUptimeAt: string
  totalCollectsUptime: number
  totalUptime: number
}

export enum AssetModel {
  motor = 'motor',
  fan = 'fan'
}

export type AssetSpecifications = {
  maxTemp: number
  power: number
  rpm: number
}

export const assetStatusMap = new Map<AssetStatus, string>([
  [AssetStatus.inAlert, 'Em alerta'],
  [AssetStatus.inDowntime, 'Em parada'],
  [AssetStatus.inOperation, 'Em operação'],
  [AssetStatus.plannedStop, 'Parada planejada'],
  [AssetStatus.unplannedStop, 'Parada não planejada']
])

export const assetModelMap = new Map<AssetModel, string>([
  [AssetModel.fan, 'Ventilador'],
  [AssetModel.motor, 'Motor']
])
