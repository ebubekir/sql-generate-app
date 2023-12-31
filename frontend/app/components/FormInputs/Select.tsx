'use client'

import Select from 'react-select'

interface Option {
  label: string
  value: string | number | null
}

interface GroupOptions {
  label: string,
  options: Option[]
}

interface SelectProps {
  options?: Array<Option> | GroupOptions[]
  onChange?: (val: any) => void
  isDisabled?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isLoading?: boolean
  placeholder?: string
  isMulti?: boolean
}

const SelectOption = ({
  options,
  onChange,
  placeholder,
  isLoading = false,
  isDisabled = false,
  isClearable = true,
  isSearchable = true,
  isMulti = false
}: SelectProps) => {
  return (
    <Select
      className='basic-single'
      classNamePrefix='select'
      options={options}
      onChange={(val) => onChange && onChange(val)}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      styles={{
        menu: (baseStyles) => ({
          ...baseStyles,
          zIndex: 500,
          width: '250px'
        }),
      }}
      isMulti={isMulti}
    />
  )
}

export default SelectOption
