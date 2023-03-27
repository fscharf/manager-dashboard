import {
  GetUnitDetailsUseCase,
  GetUnitsUseCase
} from '@core/application/usecases'
import { Unit } from '@core/domain/models'
import { container, Registry } from '@core/infra/container-registry'
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { State } from './slice'

export const getUnits = createAsyncThunk<Unit[], void>(
  'unit/getUnits',
  async () => {
    const getUnitsUseCase = container.get<GetUnitsUseCase>(
      Registry.GetUnitsUseCase
    )
    return getUnitsUseCase.execute()
  }
)

export const getUnitById = createAsyncThunk<Unit, number>(
  'unit/getUnitById',
  async id => {
    const getUnitDetailsUseCase = container.get<GetUnitDetailsUseCase>(
      Registry.GetUnitDetailsUseCase
    )
    return getUnitDetailsUseCase.execute(id)
  }
)

export const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(getUnits.pending, state => {
    state.isLoading = true
  })
  builder.addCase(getUnits.fulfilled, (state, action) => {
    state.isLoading = false
    state.units = action.payload
  })
  builder.addCase(getUnitById.fulfilled, (state, action) => {
    state.currentUnit = action.payload
  })
}
