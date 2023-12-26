export interface Expression {
  col: string
  col_operator?: string
}

export enum Operator {
  eq = '__eq__',
  ne = '__ne__',
  gt = '__gt__',
  lt = '__lt__',
  ge = '__ge__',
  le = '__le__',
  in = 'in_',
  between = 'between',
  contains = 'contains',
  like = 'like',
}

export enum LogicalOperator {
  and = "and_",
  or = "or_"
}

export interface WhereClause {
  col: Expression
  op: Operator
  value: string | number | boolean | Array<any>
}

export interface WhereGroup {
  clause: Array<WhereClause>
  op: LogicalOperator
}

export interface Query {
  selections?: Array<Expression>
  conditions?: WhereGroup | WhereClause
}
