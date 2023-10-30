import HeadSection from '@/app/(dashboard)/data-sources/add/components/HeadSection'
import StepContainer from '@/app/(dashboard)/data-sources/add/components/StepContainer'

const AddDataSource = () => {
  return (
    <div className='h-screen px-6'>
      <div className='w-full rounded-md bg-base-200  py-12 text-center'>
        <HeadSection />
        <StepContainer />
      </div>
    </div>
  )
}

export default AddDataSource
