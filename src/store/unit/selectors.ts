import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'

const rootSelect = (state: RootState) => state.unit

export const getState = createSelector(rootSelect, state => state)
