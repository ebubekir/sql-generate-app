import HeadSection from '@/app/(dashboard)/data-sources/add/components/HeadSection'
import DataSources from '@/app/(dashboard)/data-sources/add/components/DataSources'

const AddDataSource = () => {
  return (
    <div className='h-screen'>
      <div className=' w-full rounded-md bg-base-200 px-4 py-12 text-center'>
        <HeadSection />
        <DataSources />
      </div>
    </div>
  )
}

export default AddDataSource
