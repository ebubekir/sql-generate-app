'use client'

import TableList from '@/app/(dashboard)/new-report/components/TableList'
import ConditionList from '@/app/(dashboard)/new-report/components/ConditionList'
import GenerateReport from '@/app/(dashboard)/new-report/components/GenerateReport'
import Result from '@/app/(dashboard)/new-report/components/Result/Result'
import ColumnSelection from '@/app/(dashboard)/new-report/components/ColumnSelection'
import ReportSaveModal from '@/app/(dashboard)/new-report/components/ReportSaveModal/ReportSaveModal'
import SaveModalBtn from '@/app/(dashboard)/new-report/components/ReportSaveModal/SaveModalBtn'
import ReportTypeSelection from '@/app/(dashboard)/new-report/components/ReportTypeSelection'
import ReportTypeConfig from '@/app/(dashboard)/new-report/components/ReportTypeConfig/ReportTypeConfig'

const NewReportPage = () => {
  return (
    <div className='flex space-x-2'>
      <div className='flex w-1/3 flex-col space-y-4 '>
        <TableList />
        <ColumnSelection />
        <ConditionList />
        <ReportTypeSelection />
        <ReportTypeConfig />
        <GenerateReport />
        <SaveModalBtn />
      </div>
      <Result />
      <ReportSaveModal />
    </div>
  )
}

export default NewReportPage
