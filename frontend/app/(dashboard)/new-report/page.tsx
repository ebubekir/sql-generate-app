'use client'

import TableList from '@/app/(dashboard)/new-report/components/TableList'
import ConditionList from '@/app/(dashboard)/new-report/components/ConditionList'
import GenerateReport from '@/app/(dashboard)/new-report/components/GenerateReport'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'

const NewReportPage = () => {
  const { result } = useReportReducer()

  return (
    <div className='flex space-x-2'>
      <div className='flex w-1/3 flex-col space-y-4 '>
        <TableList />
        <ConditionList />
        <GenerateReport />
      </div>
      <div className='w-full bg-secondary'>
        <pre>{result?.isLoading}</pre>
      </div>
    </div>
  )
}

export default NewReportPage
