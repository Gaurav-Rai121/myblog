import React from 'react'

function Button({
    children,
    type="button",
    bgcolor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${textColor} `} {...props}>{children}</button>
  )
}

export default Button