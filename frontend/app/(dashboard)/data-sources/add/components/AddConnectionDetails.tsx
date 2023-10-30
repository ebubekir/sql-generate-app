import TextInput from '@/app/components/FormInputs/TextInput'
import { useDispatch } from 'react-redux'

const AddConnectionDetails = () => {
  const dispatch = useDispatch()

  const updateState = (key: string, value: string): void => {
    dispatch({
      type: 'dispatchConnectionDetails',
      payload: {
        key,
        value,
      },
    })
  }

  return (
    <div className='w-full '>
      <TextInput label={'Host'} onChange={(e) => updateState('host', e.target.value)} />
      <TextInput
        label={'Username'}
        onChange={(e) => updateState('username', e.target.value)}
      />
      <TextInput
        label={'Password'}
        type={'password'}
        onChange={(e) => updateState('password', e.target.value)}
      />
      <TextInput label={'Database'} onChange={(e) => updateState('db', e.target.value)} />
      <TextInput label={'Port'} onChange={(e) => updateState('port', e.target.value)} />
    </div>
  )
}

export default AddConnectionDetails
