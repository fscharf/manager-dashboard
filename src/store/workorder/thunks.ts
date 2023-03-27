import {
  GetWorkorderDetailsUseCase,
  GetWorkordersUseCase
} from '@core/application/usecases'
import { Workorder } from '@core/domain/models'
import { container, Registry } from '@core/infra/container-registry'
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { State } from './slice'

export const getWorkorders = createAsyncThunk<Workorder[], void>(
  'workorder/getWorkorders',
  async () => {
    const getWorkordersUseCase = container.get<GetWorkordersUseCase>(
      Registry.GetWorkordersUseCase
    )
    return getWorkordersUseCase.execute()
  }
)

export const getWorkorderById = createAsyncThunk<Workorder, number>(
  'workorder/getWorkorderById',
  async id => {
    const getWorkorderDetailsUseCase =
      container.get<GetWorkorderDetailsUseCase>(
        Registry.GetWorkorderDetailsUseCase
      )
    return getWorkorderDetailsUseCase.execute(id)
  }
)

export const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(getWorkorders.pending, state => {
    state.isLoading = true
  })
  builder.addCase(getWorkorders.fulfilled, (state, action) => {
    state.isLoading = false
    state.workorders = action.payload
  })
  builder.addCase(getWorkorderById.fulfilled, (state, action) => {
    state.currentWorkorder = action.payload
  })
}
