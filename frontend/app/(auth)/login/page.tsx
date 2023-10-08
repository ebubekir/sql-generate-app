import TextInput from '@/app/components/FormInputs/TextInput'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <>
      <h1 className='text-2xl font-bold'>Login</h1>
      <TextInput placeholder='Type your email...' label='E-Mail' />
      <TextInput placeholder='Type your password...' label='Password' type='password' />
      <button className='btn btn-primary w-full'>LOGIN</button>
      <Link href={'/register'} className='w-full'>
        <button className='btn btn-secondary w-full'>REGISTER</button>
      </Link>
    </>
  )
}

export default LoginPage
