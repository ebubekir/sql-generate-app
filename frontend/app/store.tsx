'use client'

import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit/'
import { Provider } from 'react-redux'
import { baseApi } from '@/services/base'

// const loginReducer = createReducer({ username: null, pasword: null }, (builder) => {
//   builder.addCase('LOGIN', (state, action) => {
//     state.user
//   })
// })

export enum REDUCERS {
  api = 'api',
  authReducer = "authReducer"
}

const authReducer = createReducer({ loggedStatus: false, user: {} }, (builder) => {
  builder.addCase('LOGIN', (state, action: { type: 'LOGIN'; user: object }) => {
    state.loggedStatus = true
    state.user = action.user
  })
})

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export const getState = (reducerName: string) => store.getState()[reducerName as keyof typeof store.getState]


// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof rootReducer>

export const RTKProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)
