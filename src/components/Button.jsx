import React from 'react'

function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "",
  className = "",
  variant = "", // new optional prop — "primary" | "outline" | "ghost"
  ...props
}) {

  const variants = {
    primary: "bg-[#f85606] text-white hover:bg-[#e04d00] active:scale-95 transition-all duration-150",
    outline: "bg-transparent border border-[#f85606] text-[#f85606] hover:bg-orange-50 active:scale-95 transition-all duration-150",
    ghost:   "bg-transparent border-none text-gray-500 hover:text-red-500 transition-all duration-150",
  }

  const variantClass = variants[variant] || "" // if no variant passed, empty string — no change

  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${textColor} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button