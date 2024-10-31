/* eslint-disable @typescript-eslint/no-explicit-any */


const InputField = ({ register, name, type = "text", placeholder, error }: {
    register: any,
    name: string
    type?: string
    placeholder: string
    error?: any
  }) => (
    
    <div>
      <input
        type={type}
        {...register(name)}
        className="w-full px-3 py-2 bg-transparent border-b border-[#052659]/20 focus:border-[#052659] focus:outline-none text-[#021024] transition-colors placeholder-[#052659]/50"
        placeholder={placeholder}
      />
      {error && (
        <p className="text-[#052659] text-xs">
          {error.message}
        </p>
      )}
    </div>
  )

export default InputField