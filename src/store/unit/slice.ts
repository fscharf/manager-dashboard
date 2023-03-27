import { Unit } from '@core/domain/models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunks'

export type State = {
  units: Unit[]
  currentUnit: Unit
  isLoading: boolean
}

export const initialState: State = {
  units: [],
  currentUnit: {} as Unit,
  isLoading: false
}

export const slice = createSlice({
  name: 'unit',
  initialState,
  reducers: {},
  extraReducers
})

export const { actions, reducer } = slice
