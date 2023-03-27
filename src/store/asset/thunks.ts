import {
  GetAssetDetailsUseCase,
  GetAssetsUseCase
} from '@core/application/usecases'
import { Asset } from '@core/domain/models'
import { container, Registry } from '@core/infra/container-registry'
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { State } from './slice'

export const getAssets = createAsyncThunk<Asset[], void>(
  'assets/getAssets',
  async () => {
    const getAssetsUseCase = container.get<GetAssetsUseCase>(
      Registry.GetAssetsUseCase
    )
    return getAssetsUseCase.execute()
  }
)

export const getAssetById = createAsyncThunk<Asset, number>(
  'assets/getAssetById',
  async id => {
    const getAssetDetailsUseCase = container.get<GetAssetDetailsUseCase>(
      Registry.GetAssetDetailsUseCase
    )
    return getAssetDetailsUseCase.execute(id)
  }
)

export const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(getAssets.pending, state => {
    state.isLoading = true
  })
  builder.addCase(getAssets.fulfilled, (state, action) => {
    state.isLoading = false
    state.assets = action.payload
  })
  builder.addCase(getAssetById.fulfilled, (state, action) => {
    state.currentAsset = action.payload
  })
}
