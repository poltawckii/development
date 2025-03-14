"use client"
import React from 'react'
interface CenterProps {
    children: React.ReactNode[]
}
function Center(props: CenterProps) {
  return (
    <div className='Center'>
      {props.children[0]}
      {props.children[1]}
      {props.children[2]}
    </div>
  )
}

export default Center