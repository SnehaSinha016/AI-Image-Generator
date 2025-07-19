import React from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange,isSurpriseMe,handleSurpriseMe,inputClassName}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 dark:text-gray-100">
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-gray-500" >
        {labelName}
          </label>
          {isSurpriseMe && (
            <button type="button" onClick={handleSurpriseMe} className="font-semibold text-xs bg-blue-400 py-1 px-2 rounded-[5px] text-black">
                Suprise Me
            </button>
          )}
      </div>
      <input type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className={`bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 dark:bg-gray-300 dark:text-gray-900 ${inputClassName}`}
      />
    </div>
  )
}

export default FormField
