import { Expression, Operator } from '@/types/query'
import { createReducer, PayloadAction } from '@reduxjs/toolkit/'
import getAvailableOperators from '@/utils/operator'

export interface ConditionState {
  [componentId: number]: {
    col?: Expression
    colType?: string
    op?: Operator
    value?: string | number | boolean | Array<any>
    availableOperators?: Array<any>
  }
}

const initialState: ConditionState = {}

export interface CorrectCondition {
  col: Expression
  op: Operator
  value: string | number | boolean | Array<any>
}

export const getCorrectConditions = (conditions: ConditionState): Array<CorrectCondition> => {
  const corrects: Array<CorrectCondition> = []
  Object.keys(conditions).map((_, idx) => {
    const condition = conditions[idx]
    if (condition.col && condition.op && condition.value) {
      corrects.push({
        col: condition.col,
        op: condition.op,
        value: condition.value
      })
    }
  })
  return corrects
}

export const conditionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      'dispatchColumn',
      (
        state,
        action: PayloadAction<
          {
            id: number,
            type: string
            column: {
              value: string,
              type: string
            }
          },
          'dispatchColumn'
        >
      ) => {
        const componentId = action.payload.id
        state[componentId].col = {
          col: action.payload.column.value
        }
        state[componentId].colType = action.payload.column.type
        state[componentId].availableOperators = getAvailableOperators(action.payload.column.type)
        state[componentId].op = undefined
      }
    )
    .addCase('dispatchOperator', (
      state,
      action: PayloadAction<
        {
          id: number,
          type: string,
          operator: Operator
        }, 'dispatchOperator'>
    ) => {
      const componentId = action.payload.id
      state[componentId].op = action.payload.operator
    })
    .addCase('dispatchValue', (
      state,
      action: PayloadAction<
        {
          id: number
          type: string,
          value: any | any[]
        }, 'dispatchValue'>
    ) => {
      const componentId = action.payload.id
      state[componentId].value = action.payload.value
    })
    .addCase('addCondition', (state) => {
      const nextComponentId = Object.keys(state).length
      state[nextComponentId] = {
        col: undefined,
        op: undefined,
        value: undefined
      }
    })
})
