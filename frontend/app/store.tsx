'use client'

import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit/'
import type { TypedUseSelectorHook } from 'react-redux'
import { Provider, useSelector } from 'react-redux'
import { baseApi } from '@/services/base'
import { dataSourceReducer } from '@/app/(dashboard)/data-sources/add/reducer'

const authReducer = createReducer({ loggedStatus: false, user: {} }, (builder) => {
  builder.addCase('USER', (state, action: { type: 'USER'; user: object }) => {
    state.user = action.user
  })
})

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  authReducer,
  dataSourceReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const getState = (reducerName: string) =>
  store.getState()[reducerName as keyof typeof store.getState]

const RTKProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

export default RTKProvider
