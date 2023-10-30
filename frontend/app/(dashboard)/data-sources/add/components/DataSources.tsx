'use client'

import Image from 'next/image'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/app/store'

const dataSources: Array<{ name: 'POSTGRESQL' | 'MYSQL' | null; image: string }> = [
  {
    name: 'MYSQL',
    image: '/mysql.png',
  },
  {
    name: 'POSTGRESQL',
    image: '/postgresql.png',
  },
]

function getButtonStyle(selected?: string | null, itemValue?: string | null): string {
  return selected === itemValue ? 'bg-accent/30' : 'bg-base-100'
}

const DataSources = () => {
  const dispatch = useDispatch()
  const selectedDataSource = useAppSelector(state => state.dataSourceReducer.dataSourceType)


  return (
    <div className='flex flex-col place-items-center  w-full'>
      <div className='mt-4 flex  place-items-center  space-x-2'>
        {dataSources.map((item, key) => (
          <button
            key={key}
            onClick={() => {
              dispatch({
                type: 'dispatchDataSourceType',
                payload: { dataSourceType: item.name },
              })
            }}
            className={`btn flex h-96 w-96 flex-col space-y-4 rounded-md  hover:bg-base-300/20 ${getButtonStyle(
              selectedDataSource,
              item.name
            )}`}
          >
            <Image
              src={item.image}
              alt={item.name || 'data-source-image'}
              width={96}
              height={96}
            />
            <span>{item.name}</span>
            {item.name === selectedDataSource && (
              <CheckBadgeIcon className='h-5 w-5 text-accent-focus' />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DataSources
