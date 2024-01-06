import { Report } from '@/types/report'
import ReportRenderer from '@/app/(dashboard)/reports/components/ReportRenderer'
import moment from 'moment'

const ReportBox = ({ report }: { report: Report }) => {
  return (
    <div className='w-full rounded-md bg-gray-100 transition delay-100 hover:bg-gray-200'>
      <div className='flex flex-col border-b-2 border-b-gray-300 p-4'>
        <h3 className='text-l font-bold'>{report.name}</h3>
        <small className='text-gray-400'>{moment(report.created_at).fromNow()}</small>
        <small className='text-gray-500'>{report.description}</small>
      </div>
      <div className='p-4'>
        <ReportRenderer report={report} />
      </div>
    </div>
  )
}

export default ReportBox
