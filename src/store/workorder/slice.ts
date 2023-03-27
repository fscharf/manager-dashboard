import { Workorder, WorkorderStatus } from '@core/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { extraReducers } from './thunks'

export type State = {
  workorders: Workorder[]
  currentWorkorder: Workorder
  isLoading: boolean
}

export const initialState: State = {
  workorders: [],
  currentWorkorder: {} as Workorder,
  isLoading: false
}

export const slice = createSlice({
  name: 'workorder',
  initialState,
  reducers: {
    completeChecklistItem(state, action: PayloadAction<number>) {
      state.currentWorkorder.checklist[action.payload].completed = true
    },
    changeStatus(state, action: PayloadAction<WorkorderStatus>) {
      state.currentWorkorder.status = action.payload
    }
  },
  extraReducers
})

export const { actions, reducer } = slice
