import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'

import * as assetSlice from './asset'
import * as companySlice from './company'
import * as unitSlice from './unit'
import * as userSlice from './user'
import * as workorderSlice from './workorder'

const rootReducer = combineReducers({
  asset: assetSlice.reducer,
  user: userSlice.reducer,
  workorder: workorderSlice.reducer,
  company: companySlice.reducer,
  unit: unitSlice.reducer
})

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useDispatch: () => AppDispatch = useReduxDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export const actions = Object.freeze({
  asset: assetSlice.actions,
  user: userSlice.actions,
  workorder: workorderSlice.actions,
  company: companySlice.actions,
  unit: unitSlice.actions
})

export const selectors = Object.freeze({
  asset: assetSlice.selectors,
  user: userSlice.selectors,
  workorder: workorderSlice.selectors,
  company: companySlice.selectors,
  unit: unitSlice.selectors
})

export const thunks = Object.freeze({
  asset: assetSlice.thunks,
  user: userSlice.thunks,
  workorder: workorderSlice.thunks,
  company: companySlice.thunks,
  unit: unitSlice.thunks
})

export default store
