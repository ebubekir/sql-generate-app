import Loading from '@/app/(dashboard)/components/Loading'
import Error from '@/app/(dashboard)/components/Error'
import DataSourceTable from '@/app/(dashboard)/data-sources/list/components/DataSourceTable'

const ListArea = ({
  isLoading,
  error,
  data,
  onSetAsDefaultClick,
}: {
  isLoading: boolean
  error?: object
  data?: any
  onSetAsDefaultClick: (id: number) => void
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
        <DataSourceTable data={data} onSetAsDefaultClick={onSetAsDefaultClick} />
      </div>
    )
  }
}

export default ListArea
