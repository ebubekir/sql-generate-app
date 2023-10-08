import React from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, ...props }) => {
  return (
    <div className='form-control w-full'>
      {label && (
        <label className='label'>
          <span className='label-text'>{label}</span>
        </label>
      )}
      <input
        placeholder={placeholder}
        className='input input-bordered w-full '
        {...props}
      />
    </div>
  )
}

export default TextInput
