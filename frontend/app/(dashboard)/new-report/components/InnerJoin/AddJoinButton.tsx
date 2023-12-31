import { PlusIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'

const AddJoinButton = () => {
  const dispatch = useDispatch()

  const addJoinOption = () => {
    dispatch({ type: 'addJoinOption' })
  }

  return (
    <button onClick={addJoinOption} className='btn btn-sm mt-4 flex space-x-2'>
      <PlusIcon className='h-5 w-5' />
      <span>Add Join</span>
    </button>
  )
}

export default AddJoinButton
