import Column from '@/app/(dashboard)/new-report/components/Condition/Column'
import Operator from '@/app/(dashboard)/new-report/components/Condition/Operator'
import Value from '@/app/(dashboard)/new-report/components/Condition/Value'

const Condition = ({ id }: { id: number }) => {
  return (
    <div className=' mb-4 flex flex-col space-y-2 border-b-2 pb-4'>
      <Column id={id} />
      <div className='ml-4 flex flex-col space-y-2'>
        <Operator id={id} />
        <Value id={id} />
      </div>
    </div>
  )
}
export default Condition
