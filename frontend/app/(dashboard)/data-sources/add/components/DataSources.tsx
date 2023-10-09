'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CheckBadgeIcon } from '@heroicons/react/20/solid'

const dataSources: Array<{ name: 'postgresql' | 'mysql' | null; image: string }> = [
  {
    name: 'mysql',
    image: '/mysql.png',
  },
  {
    name: 'postgresql',
    image: '/postgresql.png',
  },
]

function getButtonStyle(selected: string | null, itemValue: string | null): string {
  return selected == itemValue ? 'bg-accent/30' : 'bg-base-100'
}

const DataSources = () => {
  const [selected, setSelected] = useState<'mysql' | 'postgresql' | null>(null)
  return (
    <div className='flex flex-col place-items-center space-y-4'>
      <div className='m-auto mt-4 flex w-fit place-items-center  space-x-2'>
        {dataSources.map((item, key) => (
          <button
            key={key}
            onClick={() => setSelected(item.name)}
            className={`btn flex h-96 w-96 flex-col space-y-4 rounded-md  hover:bg-base-300/20 ${getButtonStyle(
              selected,
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
            {item.name === selected && (
              <CheckBadgeIcon className='h-5 w-5 text-accent-focus' />
            )}
          </button>
        ))}
      </div>
      <button className='btn float-right w-64  bg-base-100'>Next</button>
    </div>
  )
}

export default DataSources
