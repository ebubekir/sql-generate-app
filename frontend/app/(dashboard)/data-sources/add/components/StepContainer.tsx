'use client'

import { useAppSelector } from '@/app/store'
import DataSources from '@/app/(dashboard)/data-sources/add/components/DataSources'
import BottomNavigation from '@/app/(dashboard)/data-sources/add/components/BottomNavigation'
import AddConnectionDetails from '@/app/(dashboard)/data-sources/add/components/AddConnectionDetails'
import CheckConnection from '@/app/(dashboard)/data-sources/add/components/CheckConnection'
import FinishSetup from '@/app/(dashboard)/data-sources/add/components/FinishSetup'

const stepComponents: { [key: number]: React.FC } = {
  0: DataSources,
  1: AddConnectionDetails,
  2: CheckConnection,
  3: FinishSetup,
}

const StepContainer = () => {
  const currentStep = useAppSelector((state) => state.dataSourceReducer.currentStep)
  const RenderComponent: React.FC<{ step: number }> = stepComponents[currentStep]

  return (
    <div className=' m-auto flex w-1/2 flex-col space-y-4'>
      <RenderComponent
        step={currentStep}
      />
      <BottomNavigation />
    </div>
  )
}

export default StepContainer
