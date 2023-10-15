'use client'

import TextInput from '@/app/components/FormInputs/TextInput'
import Link from 'next/link'
import { useReducer, useState } from 'react'
import { LoginForm } from '@/types/auth'
import SubmitButton from '@/app/components/FormInputs/SubmitButton'
import { signIn } from 'next-auth/react'
import ResultBadge from '@/app/components/ResultBadge'
import { useRouter } from 'next/navigation'

interface LoginStates {
  isLoading: boolean
  isError: boolean | null
}

const LoginPage = () => {
  const [inputs, dispatchInputs] = useReducer(
    (state: LoginForm, action: { [key: string]: string }) => {
      return {
        ...state,
        ...action,
      }
    },
    {
      email: '',
      password: '',
    }
  )
  const [loginStates, setLoginStates] = useState<LoginStates>({
    isLoading: false,
    isError: null,
  })
  const router = useRouter()

  const onLoginClick = async () => {
    const result = await signIn('credentials', {
      ...inputs,
      redirect: false,
    })
    if (result?.ok) {
      router.push("/")
      console.log('result', result)
      setLoginStates({
        isLoading: false,
        isError: null,
      })

    } else {
      setLoginStates({
        isLoading: false,
        isError: true,
      })
    }
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>Login</h1>
      <TextInput
        value={inputs.email}
        onChange={(e) => dispatchInputs({ email: e.target.value })}
        placeholder='Type your email...'
        label='E-Mail'
      />
      <TextInput
        value={inputs.password}
        onChange={(e) => dispatchInputs({ password: e.target.value })}
        placeholder='Type your password...'
        label='Password'
        type='password'
      />
      <ResultBadge result={loginStates} />
      <SubmitButton
        label={'LOGIN'}
        result={loginStates}
        className='btn btn-primary w-full'
        onClick={onLoginClick}
      />
      <Link href={'/register'} className='w-full'>
        <button className='btn btn-secondary w-full'>REGISTER</button>
      </Link>
    </>
  )
}

export default LoginPage
