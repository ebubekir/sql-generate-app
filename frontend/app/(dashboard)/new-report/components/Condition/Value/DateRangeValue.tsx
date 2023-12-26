import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import Modal from '@/app/components/Modal'
import moment from 'moment'
import { CalendarIcon } from '@heroicons/react/20/solid'

const DateRangeValue = ({ onChange }: { onChange: (dates: string[]) => void }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button className='btn btn-neutral' onClick={() => setIsOpen(true)}>
        <CalendarIcon className='h-5 w-5' />
        <span>
          {date[0].startDate && date[0].endDate
            ? `${moment(date[0].startDate).format('ll')} and  ${moment(
                date[0].endDate
              ).format('ll')}`
            : 'Select Date Range'}
        </span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={'Select Date Range'}>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            // @ts-ignore
            setDate([item.selection])
            onChange([
              moment(item.selection.startDate).format('YYYY-MM-DD'),
              moment(item.selection.endDate).format('YYYY-MM-DD'),
            ])
          }}
          moveRangeOnFirstSelection={false}
          // @ts-ignore
          ranges={date}
        />
      </Modal>
    </div>
  )
}

export default DateRangeValue
