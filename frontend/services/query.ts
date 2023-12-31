import { baseApi } from '@/services/base'
import {
  Expression,
  InnerJoin,
  LogicalOperator,
  Operator,
  Query,
  WhereClause,
  WhereGroup,
} from '@/types/query'

interface GenerateQuery {
  tableName: string
  query: Query
}

export const generateQueryRequest = ({
  tableName,
  columnList,
  conditions,
  joinsList,
}: {
  tableName: string
  columnList?: string[]
  conditions?: {
    [componentId: number]: {
      col: Expression
      op: Operator
      value: string | number | boolean | Array<string | number | boolean>
    }
  }
  joinsList: Array<InnerJoin>
}): GenerateQuery => {
  let whereGroup: WhereGroup | undefined = undefined
  let selections: Array<Expression> | undefined = undefined
  let innerJoins: Array<InnerJoin> | undefined = undefined
  try {
    if (conditions) {
      const conditionList: Array<WhereClause> = []
      Object.keys(conditions).map((idx) => {
        const condition = conditions[Number(idx)]
        const whereCondition: WhereClause = {
          col: condition.col,
          op: condition.op,
          value: condition.value,
        }
        conditionList.push(whereCondition)
      })
      whereGroup = {
        clause: conditionList,
        op: LogicalOperator.and,
      }
    }

    if (columnList) {
      selections = columnList.map(c => ({
        col: c
      }))
    }

    if (joinsList.length > 0) {
      innerJoins = joinsList.map((join) => ({
        table_name: join.table_name,
        where_clause: join.where_clause
      }))
    }


  } catch (e) {
    console.error('Condition error!!!', e)
  }

  return {
    tableName,
    query: {
      conditions: whereGroup,
      selections,
      inner_joins: innerJoins
    },
  }
}

export const queryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateQuery: builder.mutation<string, GenerateQuery>({
      query: (query: GenerateQuery) => ({
        url: 'query/generate',
        method: 'POST',
        body: {
          tableName: query.tableName,
          query: query.query,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled
        dispatch({
          type: 'storeResult',
          payload: { result },
        })
      },
    }),
  }),
})

export const { useGenerateQueryMutation } = queryApi
