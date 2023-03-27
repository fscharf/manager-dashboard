import {
  GetUserDetailsUseCase,
  GetUsersUseCase
} from '@core/application/usecases'
import { User } from '@core/domain/models'
import { container, Registry } from '@core/infra/container-registry'
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { State } from './slice'

export const getUsers = createAsyncThunk<User[], void>(
  'user/getUsers',
  async () => {
    const getUsersUseCase = container.get<GetUsersUseCase>(
      Registry.GetUsersUseCase
    )
    return getUsersUseCase.execute()
  }
)

export const getUserById = createAsyncThunk<User, number>(
  'user/getUserById',
  async id => {
    const getUserDetailsUseCase = container.get<GetUserDetailsUseCase>(
      Registry.GetUserDetailsUseCase
    )
    return getUserDetailsUseCase.execute(id)
  }
)

export const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(getUsers.pending, state => {
    state.isLoading = true
  })
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.isLoading = false
    state.users = action.payload
  })
  builder.addCase(getUserById.fulfilled, (state, action) => {
    state.currentUser = action.payload
  })
}
