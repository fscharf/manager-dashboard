import { User } from '@core/domain/models'
import { createSlice } from '@reduxjs/toolkit'
import { extraReducers } from './thunks'

export type State = {
  users: User[]
  currentUser: User
  isLoading: boolean
}

export const initialState: State = {
  users: [],
  currentUser: {} as User,
  isLoading: false
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers
})

export const { actions, reducer } = slice
