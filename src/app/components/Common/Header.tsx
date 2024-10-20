import React from 'react'
import Wrapper from '../Reusable/Wrapper'
import Logo from '../Reusable/Logo'
import Link from 'next/link'


const Header = () => {
  return (
    <header className='w-full border-gray-800 border-b'>
        <Wrapper className='flex justify-between items-center'>
            <Logo/>
            <ul>
                <li className='flex gap-6 font-[500] items-center'>
                    <Link className='hover:text-gray-500 duration-200' href={"/"}>Home</Link>
                    <Link className='hover:text-gray-500 duration-200' href={"/"}>About Me</Link>
                    <Link className='hover:text-gray-500 duration-200' href={"/"}>Projects</Link>
                    <Link className='hover:text-gray-500 duration-200' href={"/"}>Experience</Link>
                    <Link className='hover:text-gray-500 duration-200' href={"/"}>Contact Me</Link>
                </li>
            </ul>
        </Wrapper>
    </header>
  )
}

export default Header