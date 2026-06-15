import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
  label,
  type = "text",
  className = "",
  containerClassName = "",
  noWrapper = false,
  floating = false,
  ...props
}, ref) {

  const id = useId();

  // ── No wrapper ───────────────────────────────────────────────
  if (noWrapper) {
    return (
      <input
        type={type}
        className={className}
        ref={ref}
        id={id}
        {...props}
      />
    )
  }

  // ── Floating label ───────────────────────────────────────────
  if (floating) {
    return (
      <div className={`relative ${containerClassName}`}>
        <input
          type={type}
          id={id}
          ref={ref}
          placeholder=" "
          className={`
            block px-2.5 pb-2.5 pt-4 w-full
            text-sm text-gray-900 bg-transparent
            rounded-lg border-[1.5px] border-gray-300
            appearance-none
            focus:outline-none focus:ring-0 focus:border-[#f85606]
            peer
            ${className}
          `}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className="
              absolute text-sm text-gray-400 duration-300 transform
              -translate-y-4 scale-75 top-2 z-10 origin-[0]
              bg-white px-2
              peer-focus:px-2
              peer-focus:text-[#f85606]
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:-translate-y-1/2
              peer-placeholder-shown:top-1/2
              peer-focus:top-2
              peer-focus:scale-75
              peer-focus:-translate-y-4
              start-1
            "
          >
            {label}
          </label>
        )}
      </div>
    )
  }

  // ── Default (label on top) ───────────────────────────────────
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={className}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  )
})

export default Input