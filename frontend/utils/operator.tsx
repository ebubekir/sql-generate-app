import { Operator } from '@/types/query'

const COMMON_OPERATORS = [
  {
    label: 'equals to',
    value: Operator.eq,
  },
  {
    label: 'not equals to',
    value: Operator.ne,
  },
]

const OP_LIST = {
  VARCHAR: [
    ...COMMON_OPERATORS,
    {
      label: "in",
      value: Operator.in
    },
    {
      label: "contains",
      value: Operator.contains
    }
  ],
  INTEGER: [
    ...COMMON_OPERATORS,
    {
      label: "greater than",
      value: Operator.gt
    },
    {
      label: "less than",
      value: Operator.lt
    },
    {
      label: "greater than or equal to",
      value: Operator.ge
    },
    {
      label: "less than or equal to",
      value: Operator.le
    },
    {
      label: "between",
      value: Operator.between
    },
  ],
  TIMESTAMP: [
    {
      label: "between",
      value: Operator.between
    },
    ...COMMON_OPERATORS
  ]

}

export default function getAvailableOperators(type: string): Array<any> {
  if (Object.keys(OP_LIST).includes(type)) { // @ts-ignore
    return OP_LIST[type]
  }

  return OP_LIST.INTEGER
}
