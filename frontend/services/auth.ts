import { baseApi } from '@/services/base'
import { LoginResponse, RegisterSchema } from '@/types/auth'
import { retry } from '@reduxjs/toolkit/query/react'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, any>({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password },
      }),
      extraOptions: {
        backoff: () => {
          retry.fail({ fake: 'error' })
        },
      },
    }),

    register: builder.mutation<RegisterSchema, any>({
      query: (register: RegisterSchema) => ({
        url: 'register',
        method: 'POST',
        body: {
          ...register,
        },
      }),
    }),
  }),
  overrideExisting: false,
})


export const { useLoginMutation, useRegisterMutation } = authApi
export const { endpoints: { login, register } } = authApi
