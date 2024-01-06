import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import { useDispatch } from 'react-redux'
import { RadioGroup } from '@headlessui/react'
import {
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
} from '@heroicons/react/20/solid'
import React from 'react'

const SQLIcon = ({ className }: { className: string }) => (
  <div className={className}>
    <span>SQL</span>
  </div>
)

const ReportTypeIcons: {[key: string]: React.FC} = {
  // @ts-ignore
  SQL: SQLIcon,
  TABLE: TableCellsIcon,
  PIE: ChartPieIcon,
  BAR: ChartBarIcon,
  LINE: PresentationChartLineIcon
}


const RenderIcon = ({ type }: {type: string}) => {
  const Component = ReportTypeIcons[type]
  // @ts-ignore
  return <Component className="w-5 h-5 text-center" />
}

const ReportTypeSelection = () => {
  const { reportType } = useReportReducer()
  const dispatch = useDispatch()
  return (
    <div className=''>
      <RadioGroup
        className='flex w-full space-x-2'
        value={reportType}
        onChange={(value) =>
          {
            dispatch({
              type: 'dispatchReportType',
              payload: {
                reportType: value,
              },
            })
          }
        }
        defaultChecked={true}
        defaultValue={reportType}
      >
        {Object.keys(ReportTypeIcons).map((item, index) => (
          <RadioGroup.Option
            key={index}
            value={item}
            className={
              ({ checked}) => `flex  h-8 w-1/5 cursor-pointer items-center  justify-center text-center rounded-md border-2  ${checked ? 'bg-blue-300 hover:bg-blue-200 border-blue-400 text-blue-700' : 'bg-slate-100 hover:bg-gray-100 border-gray-300 text-slate-400'}`
            }
          >
            <RenderIcon type={item} />
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  )
}

export default ReportTypeSelection
