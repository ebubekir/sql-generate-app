import Link from 'next/link'
import React from 'react'

const BreadCrumb = ({ pathname }: { pathname: string }) => (
  <div className='breadcrumbs text-sm'>
    <ul>
      <li>
        <Link href={'/'}>Home</Link>
      </li>
      {pathname
        .split('/')
        .filter((i) => i.length > 0)
        .map((i, idx) => (
          <li key={idx}>
            <Link href={pathname} className='capitalize'>
              {i.replaceAll('/', '').replaceAll('-', ' ')}
            </Link>
          </li>
        ))}
    </ul>
  </div>
)

export default BreadCrumb
