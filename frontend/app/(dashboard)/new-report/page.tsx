'use client'

import TableList from '@/app/(dashboard)/new-report/components/TableList'
import ConditionList from '@/app/(dashboard)/new-report/components/ConditionList'
import GenerateReport from '@/app/(dashboard)/new-report/components/GenerateReport'
import Result from '@/app/(dashboard)/new-report/components/Result/Result'
import ColumnSelection from '@/app/(dashboard)/new-report/components/ColumnSelection'

const NewReportPage = () => {
  return (
    <div className='flex space-x-2'>
      <div className='flex w-1/3 flex-col space-y-4 '>
        <TableList />
        <ColumnSelection />
        <ConditionList />
        <GenerateReport />
      </div>
      <Result />
    </div>
  )
}

export default NewReportPage
