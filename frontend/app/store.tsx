'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit/'
import { Provider } from 'react-redux'
import { baseApi } from '@/services/base'

// const loginReducer = createReducer({ username: null, pasword: null }, (builder) => {
//   builder.addCase('LOGIN', (state, action) => {
//     state.user
//   })
// })


export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})



store.dispatch({ type: 'add', payload: { user: 'ebubekir'}})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>


export const RTKProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    {children}
  </Provider>
)
