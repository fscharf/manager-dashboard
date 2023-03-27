export interface Workorder {
  assetId: number
  assignedUserIds: number[]
  checklist: WorkorderChecklist[]
  description: string
  id: number
  priority: WorkorderPriority
  status: WorkorderStatus
  title: string
}

export type WorkorderChecklist = {
  completed: boolean
  task: string
}

export enum WorkorderPriority {
  high = 'high'
}

export enum WorkorderStatus {
  completed = 'completed',
  inProgress = 'in progress'
}

export const workorderPriorityMap = new Map<WorkorderPriority, string>([
  [WorkorderPriority.high, 'Alta']
])

export const workorderStatusMap = new Map<WorkorderStatus, string>([
  [WorkorderStatus.completed, 'Finalizado'],
  [WorkorderStatus.inProgress, 'Em progresso']
])
