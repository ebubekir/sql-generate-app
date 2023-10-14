'use client'
import TextInput from '@/app/components/FormInputs/TextInput'
import Link from 'next/link'
import { useRegisterMutation } from '@/services/auth'
import { RegisterSchema } from '@/types/auth'
import { useReducer } from 'react'
import ResultBadge from '@/app/components/ResultBadge'
import SubmitButton from '@/app/components/FormInputs/SubmitButton'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const [register, result] = useRegisterMutation()
  const [inputs, dispatchInputs] = useReducer(
    (state: RegisterSchema, action: { [key: string]: string }) => {
      return {
        ...state,
        ...action,
      }
    },
    {
      email: '',
      password: '',
      full_name: '',
    }
  )
  const router = useRouter()
  const registerBtnClick = async () => {
    const result = await register({ ...inputs })
    if (!('error' in result)) {
      router.push('/login')
    }
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>Register</h1>
      <TextInput
        placeholder='Type your full name...'
        label='Full Name'
        value={inputs.full_name}
        onChange={(e) => dispatchInputs({ full_name: e.target.value })}
      />
      <TextInput
        placeholder='Type your email...'
        label='E-Mail'
        value={inputs.email}
        type={'email'}
        onChange={(e) => dispatchInputs({ email: e.target.value })}
      />
      <TextInput
        placeholder='Type your password...'
        label='Password'
        type='password'
        value={inputs.password}
        onChange={(e) => dispatchInputs({ password: e.target.value })}
      />
      <SubmitButton
        label={'REGISTER'}
        result={result}
        className='btn btn-primary w-full'
        onClick={registerBtnClick}
      />
      <Link href={'/login'} className='w-full'>
        <button className='btn w-full'>BACK</button>
      </Link>
      <ResultBadge result={result} />
    </>
  )
}

export default RegisterPage
