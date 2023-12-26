import { combineReducers, createReducer, PayloadAction } from '@reduxjs/toolkit/'
import { conditionReducer } from '@/app/(dashboard)/new-report/components/Condition/reducer'
import { useAppSelector } from '@/app/store'

interface ReportReducerStateSchema {
  tableName?: string
  columnList?: string[]
  result?: any
}

const initialState: ReportReducerStateSchema = {}


export const reportReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    'dispatchTableName',
    (
      state,
      action: PayloadAction<{ type: string; table: string }, 'dispatchTableName'>
    ) => {
      state.tableName = action.payload.table
    }
  ).addCase(
    'dispatchColumnList', (state, action: PayloadAction<{type: string, columns: string[]}, 'dispatchColumnList'>) => {
      state.columnList = action.payload.columns
    }
  )
    .addCase('storeResult', (state, action: PayloadAction<{type: string, result: any}, 'storeResult'>) => {
      state.result = action.payload.result
    })
})


export const rootReportReducer = combineReducers({
  conditionReducer: conditionReducer,
  reportReducer: reportReducer
})


export const useConditionReducer = () => useAppSelector(state => state.rootReportReducer.conditionReducer)
export const useReportReducer = () => useAppSelector(state => state.rootReportReducer.reportReducer)



