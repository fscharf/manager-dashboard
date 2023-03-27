import {
  GetCompanyDetailsUseCase,
  GetCompaniesUseCase
} from '@core/application/usecases'
import { Company } from '@core/domain/models'
import { container, Registry } from '@core/infra/container-registry'
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { State } from './slice'

export const getCompanies = createAsyncThunk<Company[], void>(
  'company/getCompanies',
  async () => {
    const getCompanysUseCase = container.get<GetCompaniesUseCase>(
      Registry.GetCompaniesUseCase
    )
    return getCompanysUseCase.execute()
  }
)

export const getCompanyById = createAsyncThunk<Company, number>(
  'company/getCompanyById',
  async id => {
    const getCompanyDetailsUseCase = container.get<GetCompanyDetailsUseCase>(
      Registry.GetCompanyDetailsUseCase
    )
    return getCompanyDetailsUseCase.execute(id)
  }
)

export const extraReducers = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(getCompanies.pending, state => {
    state.isLoading = true
  })
  builder.addCase(getCompanies.fulfilled, (state, action) => {
    state.isLoading = false
    state.companies = action.payload
  })
  builder.addCase(getCompanyById.fulfilled, (state, action) => {
    state.currentCompany = action.payload
  })
}
