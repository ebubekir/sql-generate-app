import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'
import JoinOption from '@/app/(dashboard)/new-report/components/InnerJoin/JoinOption'

const JoinsList = () => {
  const { joinsList } = useReportReducer()

  return (
    <div className='flex flex-col space-y-2'>
      {joinsList?.map((item, idx) => <JoinOption key={idx} index={idx} />)}
    </div>
  )
}

export default JoinsList
