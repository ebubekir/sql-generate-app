import StringValue from '@/app/(dashboard)/new-report/components/Condition/Value/StringValue'
import NumberValue from '@/app/(dashboard)/new-report/components/Condition/Value/NumberValue'
import { Expression, Operator } from '@/types/query'
import DateValue from '@/app/(dashboard)/new-report/components/Condition/Value/DateValue'

const OP_COMPONENTS = {
  VARCHAR: StringValue,
  TIMESTAMP: DateValue,
  DATETIME: DateValue,
  INTEGER: NumberValue,
}

const ValueRenderer = ({
  type,
  operator,
  col,
  tableName,
  onChange
}: {
  type: any
  operator?: Operator
  col?: Expression
  tableName?: string
  onChange: (val: any) => void
}) => {
  let Component
  if (Object.keys(OP_COMPONENTS).includes(type)) {
    // @ts-ignore
    Component = OP_COMPONENTS[type]
  } else {
    // @ts-ignore
    Component = OP_COMPONENTS[type]
  }

  return <Component operator={operator} col={col} tableName={tableName} onChange={onChange} />
}

export default ValueRenderer
