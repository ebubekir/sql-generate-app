import TextInput from '@/app/components/FormInputs/TextInput'
import Link from 'next/link'

const RegisterPage = () => {
  return (
    <>
      <h1 className='text-2xl font-bold'>Register</h1>
      <TextInput placeholder='Type your full name...' label='Full Name' />
      <TextInput placeholder='Type your email...' label='E-Mail' />
      <TextInput placeholder='Type your password...' label='Password' type='password' />
      <button className='btn btn-primary w-full'>REGISTER</button>
      <Link href={'/login'} className='w-full'>
        <button className='btn w-full'>BACK</button>
      </Link>
    </>
  )
}

export default RegisterPage
