import TextInput from '@/app/components/FormInputs/TextInput'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/app/store'
import { useAddDataSourceMutation } from '@/services/data_source'
import { useRouter } from 'next/navigation'

const FinishSetup = () => {
  const dispatch = useDispatch()
  const { dataSourceName, dataSourceType, dataSourceCredentials } = useAppSelector(
    (state) => state.dataSourceReducer
  )
  const [addDataSource, result] = useAddDataSourceMutation()
  const router = useRouter()

  const onFinishBtnClick = () => {
    addDataSource({
      // @ts-ignore
      credentials: dataSourceCredentials,
      type: dataSourceType,
      name: dataSourceName,
    })
      .then(() => {
        router.replace('/data-sources/list')
      })
      .catch(() => {
        console.log('error')
      })
  }

  return (
    <div className='items-left flex flex-col space-y-2'>
      <TextInput
        label={'Data Source Name'}
        placeholder='Give your data source a name...'
        onChange={(e) =>
          dispatch({
            type: 'dispatchDataSourceName',
            payload: {
              dataSourceName: e.target.value,
            },
          })
        }
      />
      <button
        className='btn btn-primary'
        disabled={
          dataSourceName === undefined ||
          dataSourceName === '' ||
          dataSourceName === null ||
          result.isLoading
        }
        onClick={() => onFinishBtnClick()}
      >
        {result.isLoading ? 'Loading...' : 'Finish Setup'}
      </button>
    </div>
  )
}

export default FinishSetup
