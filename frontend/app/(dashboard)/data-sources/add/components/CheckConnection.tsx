import { useAppSelector } from '@/app/store'
import { useCheckConnectionMutation } from '@/services/data_source'
import { useEffect } from 'react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'

const Body = ({ result }: { result: any }) => {
  if (result.isLoading) {
    return (
      <>
        <span className='loading loading-ring loading-lg'></span>
        <span>Connection is checking...</span>
      </>
    )
  }

  if (result.isError) {
    return (
      <>
        <ExclamationCircleIcon className='h-5 w-5' />
        <span>An error occurred.</span>
      </>
    )
  }

  if (result.isSuccess) {
    const { data } = result
    if (!data.connection_result) {
      return (
        <div className='flex flex-col items-center text-red-500'>
          <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
          <span>Connection failed. Error: </span>
          <code>{data.connection_error}</code>
        </div>
      )
    }

    return (
      <div className='flex flex-col items-center text-green-500'>
        <CheckCircleIcon className='h-12 w-12 text-green-500' />
        <span>Connection ok.</span>
      </div>
    )
  }

  return null
}

const CheckConnection = () => {
  const { dataSourceCredentials, dataSourceType } = useAppSelector(
    (state) => state.dataSourceReducer
  )

  const [checkConnection,result] = useCheckConnectionMutation()
  const dispatch = useDispatch()


  useEffect(() => {
    checkConnection({
      type: dataSourceType,
      // @ts-ignore
      credentials: dataSourceCredentials,
    })
  }, [])

  if (result.isSuccess) {
    const { data } = result
    if (data?.connection_result) {
      dispatch({
        type: 'dispatchNextStepAvailable',
        payload: {
          nextStepAvailable: true
        }
      })
    } else {
      dispatch({
        type: 'dispatchNextStepAvailable',
        payload: {
          nextStepAvailable: false
        }
      })
    }
  }



  return (
    <div className='space-x-y flex flex-col items-center'>
      <Body result={result} />
    </div>
  )
}

export default CheckConnection
