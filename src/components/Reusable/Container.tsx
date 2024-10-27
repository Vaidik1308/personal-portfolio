import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode;
    className?:string;
}

const Container = ({children,className}: Props) => {
  return (
    <div className={` w-[90%] md:w-[80%] mx-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container