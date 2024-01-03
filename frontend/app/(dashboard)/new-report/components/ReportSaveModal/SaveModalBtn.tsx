import { useDispatch } from 'react-redux'
import { useReportReducer } from '@/app/(dashboard)/new-report/reducer'

const SaveModalBtn = () => {
  const reportReducer = useReportReducer()
  const dispatch = useDispatch()

  return (
    <button
      onClick={() => dispatch({ type: 'toggleSaveModal' })}
      disabled={!reportReducer.tableName}
      className='btn btn-accent text-white'
    >
      Save
    </button>
  )
}

export default SaveModalBtn
