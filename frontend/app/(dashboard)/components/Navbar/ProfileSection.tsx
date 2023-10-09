import Link from 'next/link'
import Image from 'next/image'

const ProfileSection = () => {
  return (
    <div className='dropdown-end dropdown'>
      <label tabIndex={0} className='avatar btn btn-circle btn-ghost'>
        <div className='w-10 rounded-full'>
          <Image src='/avatar.jpg' alt='profile-avatar' layout={'fill'} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
      >
        <li>
          <Link href={'/settings'}>Settings</Link>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default ProfileSection
