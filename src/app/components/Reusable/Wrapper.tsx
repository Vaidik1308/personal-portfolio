import React, { ReactNode } from 'react'

type Props = {
    className?:string;
    children:ReactNode;
}

const Wrapper = ({className,children}: Props) => {
  return (
    <div className={` px-4 py-8 w-full ${className}`}>
        {children}
    </div>
  )
}

export default Wrapper