import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/20/solid'

const Menu = () => (
  <div className='navbar-center hidden lg:flex'>
    <ul className='menu menu-horizontal px-1'>
      <li className='flex space-x-2 '>
        <Link href={'/new-report'} className='hover:bg-primary hover:text-white'>
          <PlusIcon className='h-5 w-5' />
          New Report
        </Link>
      </li>
      <li>
        <Link href={'/reports'}>Reports</Link>
      </li>
      <li>
        <Link href={'/data-sources/list'}>
          Data Sources <span className='badge'>0</span>
        </Link>
      </li>
    </ul>
  </div>
)

export default Menu
