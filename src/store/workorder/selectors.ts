import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'

const rootSelect = (state: RootState) => state.workorder

export const getState = createSelector(rootSelect, state => state)
