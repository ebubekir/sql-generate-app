'use client'

import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit/'
import { DataSourceType } from '@/types/data_source'

const nextStep = createAction('nextStep')

interface PayloadSchema {
  currentStep: number
  dataSourceCredentials: {
    host?: string
    username?: string
    password?: string
    db?: string
    port?: string
    schema?: string
  }
  dataSourceType: DataSourceType | string
  dataSourceName: string
  checkConnection: any
  nextStepAvailable: boolean
}

const initialState: PayloadSchema = {
  currentStep: 0,
  dataSourceCredentials: {
    host: '',
    username: '',
    password: '',
    db: '',
    port: '',
    schema: '',
  },
  dataSourceType: '',
  dataSourceName: '',
  checkConnection: null,
  nextStepAvailable: false,
}

export const dataSourceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(nextStep, (state) => {
      if (state.currentStep !== 3 && state.nextStepAvailable) {
        state.currentStep += 1
        state.nextStepAvailable = false
      }
    })
    .addCase('prevStep', (state) => {
      if (state.currentStep !== 0) {
        state.currentStep -= 1
      }
    })
    .addCase(
      'dispatchDataSourceType',
      (
        state,
        action: PayloadAction<
          {
            type: string
            dataSourceType: string
          },
          'dispatchDataSourceType'
        >
      ) => {
        state.dataSourceType = action.payload.dataSourceType
        state.nextStepAvailable = true
      }
    )
    .addCase(
      'dispatchDataSourceName',
      (
        state,
        action: PayloadAction<
          {
            type: string
            dataSourceName: string
          },
          'dispatchDataSourceName'
        >
      ) => {
        state.dataSourceName = action.payload.dataSourceName
      }
    )
    .addCase(
      'dispatchConnectionDetails',
      (
        state,
        action: PayloadAction<
          {
            type: string
            key: 'host' | 'username' | 'password' | 'db' | 'port' | 'schema'
            value: string
          },
          'dispatchConnectionDetails'
        >
      ) => {
        state.dataSourceCredentials[action.payload.key] = action.payload.value
        const values = Object.values(state.dataSourceCredentials)
        if (
          values.every((value) => value !== null && value !== undefined && value !== '')
        ) {
          state.nextStepAvailable = true
        }
      }
    )
    .addCase(
      'dispatchNextStepAvailable',
      (
        state,
        action: PayloadAction<
          { type: string; nextStepAvailable: boolean },
          'dispatchNextStepAvailable'
        >
      ) => {
        state.nextStepAvailable = action.payload.nextStepAvailable
      }
    )
})
