import Loading from '@/app/(dashboard)/components/Loading'
import Error from '@/app/(dashboard)/components/Error'
import DataSourceTable from '@/app/(dashboard)/data-sources/list/components/DataSourceTable'

const ListArea = ({
  isLoading,
  error,
  data,
}: {
  isLoading: boolean
  error?: object
  data?: any
}) => {
  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (data) {
    return (
      <div className='py-8'>
        <DataSourceTable data={data} />
      </div>
    )
  }
}

export default ListArea
