import React from 'react'

function Logo() {
  return (
    <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" width="140" height="50">
    <rect x="0" y="0" width="240" height="80" rx="12" fill="#f85606"/>
    <text
      x="28"
      y="57"
      fontFamily="system-ui, sans-serif"
      fontSize="52"
      fontWeight="700"
      fill="white"
      letterSpacing="-1"
    >
    Stor<tspan fill="#efefef" fontWeight="500" fontSize="56">/</tspan>e
    </text>
  </svg>
  )
}

export default Logo