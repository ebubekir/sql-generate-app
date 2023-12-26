import 'react-datepicker/dist/react-datepicker.css'
import { Operator } from '@/types/query'
import DateRangeValue from '@/app/(dashboard)/new-report/components/Condition/Value/DateRangeValue'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import SingleDateSelection from '@/app/(dashboard)/new-report/components/Condition/Value/SingleDateSelection'

const DateValue = ({
  operator,
  onChange,
}: {
  operator: Operator
  onChange: (date: string[] | string) => void
}) => {
  if (operator === 'between') {
    return <DateRangeValue onChange={onChange} />
  }

  return <SingleDateSelection onChange={onChange} />
}

export default DateValue
