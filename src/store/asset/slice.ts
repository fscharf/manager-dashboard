import { Asset, AssetStatus } from '@core/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { extraReducers } from './thunks'

export type State = {
  assets: Asset[]
  currentAsset: Asset
  isLoading: boolean
}

export const initialState: State = {
  assets: [],
  currentAsset: {} as Asset,
  isLoading: false
}

export const slice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<AssetStatus>) => {
      state.currentAsset.status = action.payload
      state.currentAsset.healthHistory.push({
        status: action.payload,
        timestamp: new Date().toISOString()
      })
    }
  },
  extraReducers
})

export const { actions, reducer } = slice
