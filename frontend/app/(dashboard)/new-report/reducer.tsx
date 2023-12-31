import { combineReducers, createReducer, PayloadAction } from '@reduxjs/toolkit/'
import { conditionReducer } from '@/app/(dashboard)/new-report/components/Condition/reducer'
import { useAppSelector } from '@/app/store'
import { InnerJoin, Operator } from '@/types/query'

interface ReportReducerStateSchema {
  tableName?: string
  tableList: string[]
  columnList?: string[]
  result?: any
  joinsList: {
    tableName?: string
    whereClause?: {
      col?: string
      op: Operator.eq
      value?: string
    }
  }[]
}

const initialState: ReportReducerStateSchema = {
  joinsList: [],
  tableList: [],
}

export const getCorrectJoinsList = (
  joinsList: {
    tableName?: string
    whereClause?: {
      col?: string
      op: Operator.eq
      value?: string
    }
  }[]
): Array<InnerJoin> =>{
  const correctJoins: Array<InnerJoin> = []

  joinsList.forEach(join => {
    if ('whereClause' in join) {
      if(join.tableName && join.whereClause?.col && join?.whereClause?.value) {
        correctJoins.push({
          table_name: join.tableName,
          where_clause: {
            col: { col: join.whereClause.col},
            op: Operator.eq,
            value : { col: join.whereClause.value}
          }
        })
      }
    }
  })

  console.log('correctJoins', correctJoins)

  return correctJoins
}

export const reportReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      'dispatchTableName',
      (
        state,
        action: PayloadAction<{ type: string; table: string }, 'dispatchTableName'>
      ) => {
        state.tableName = action.payload.table
      }
    )
    .addCase(
      'dispatchColumnList',
      (
        state,
        action: PayloadAction<{ type: string; columns: string[] }, 'dispatchColumnList'>
      ) => {
        state.columnList = action.payload.columns
      }
    )
    .addCase(
      'storeResult',
      (state, action: PayloadAction<{ type: string; result: any }, 'storeResult'>) => {
        state.result = action.payload.result
      }
    )
    .addCase('addJoinOption', (state) => {
      const tmpArr = [...state.joinsList]
      tmpArr.push({})
      state.joinsList = tmpArr
    })
    .addCase(
      'addTableToTableList',
      (
        state,
        action: PayloadAction<
          { type: string; tableName: string; index: number },
          'addTableToTableList'
        >
      ) => {
        const tmpArr = [...state.tableList]
        tmpArr[action.payload.index] = action.payload.tableName
        state.tableList = tmpArr
      }
    )
    .addCase(
      'updateJoinTableName',
      (
        state,
        action: PayloadAction<
          { type: string; index: number; tableName: string },
          'updateJoinTableName'
        >
      ) => {
        const tmpArr = [...state.joinsList]
        tmpArr[action.payload.index] = {
          ...tmpArr[action.payload.index],
          tableName: action.payload.tableName,
        }
        state.joinsList = tmpArr
      }
    )
    .addCase(
      'updateJoinCondition',
      (
        state,
        action: PayloadAction<
          { type: string; index: number; col?: string; value?: string },
          'updateJoinCondition'
        >
      ) => {
        const tmpArr = [...state.joinsList]
        tmpArr[action.payload.index] = {
          ...tmpArr[action.payload.index],
          whereClause: {
            col: action.payload.col,
            op: Operator.eq,
            value: action.payload.value,
          },
        }
        state.joinsList = tmpArr
      }
    )
})

export const rootReportReducer = combineReducers({
  conditionReducer: conditionReducer,
  reportReducer: reportReducer,
})

export const useConditionReducer = () =>
  useAppSelector((state) => state.rootReportReducer.conditionReducer)
export const useReportReducer = () =>
  useAppSelector((state) => state.rootReportReducer.reportReducer)
