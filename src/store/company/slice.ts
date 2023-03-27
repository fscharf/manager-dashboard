import { Company } from '@core/domain/models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunks'

export type State = {
  companies: Company[]
  currentCompany: Company
  isLoading: boolean
}

export const initialState: State = {
  companies: [],
  currentCompany: {} as Company,
  isLoading: false
}

export const slice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers
})

export const { actions, reducer } = slice
