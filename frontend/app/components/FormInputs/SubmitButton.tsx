import React from 'react'

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label: string
  result?: any
  autoFocus?: boolean | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  formAction?: string | undefined
  formEncType?: string | undefined
  formMethod?: string | undefined
  formNoValidate?: boolean | undefined
  formTarget?: string | undefined
  name?: string | undefined
  type?: 'submit' | 'reset' | 'button' | undefined
  value?: string | ReadonlyArray<string> | number | undefined
}

const RenderElement: React.FC<{ label: string; isLoading: boolean }> = ({
  label,
  isLoading,
}) => {
  if (isLoading) {
    return <span className='loading loading-spinner loading-sm'></span>
  }
  return <span>{label}</span>
}

const SubmitButton: React.FC<ButtonProps> = ({ result, label, ...props }) => {
  return (
    <button disabled={result.isLoading} {...props}>
      <RenderElement label={label} isLoading={result.isLoading} />
    </button>
  )
}

export default SubmitButton
