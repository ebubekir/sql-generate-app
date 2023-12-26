import { CalendarIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import Modal from '@/app/components/Modal'
import { Calendar } from 'react-date-range'
import { useState } from 'react'

const SingleDateSelection = ({ onChange }: { onChange: (date: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  return (
    <div>
      <button className='btn btn-neutral' onClick={() => setIsOpen(true)}>
        <CalendarIcon className='h-5 w-5' />
        <span>{moment(date).format('ll') || 'Select Date Range'}</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={'Select Date Range'}>
        <Calendar
          date={date}
          onChange={(item) => {
            setDate(item)
            onChange(moment(item).format('YYYY-MM-DD'))
          }}
        />
      </Modal>
    </div>
  )
}

export default SingleDateSelection
