import React from 'react'
import Wrapper from '../Reusable/Wrapper'
import Logo from '../Reusable/Logo'
import Navigation from '../partials/navigation/Navigation'
import { ThemeToggle } from '../Reusable/ThemeToggle'

const Header = () => {
  return (
    <header className='w-full border-b border-border'>
        <Wrapper className='flex justify-center md:justify-between gap-32 items-center'>
            <Logo/>
            <ul className='hidden md:flex gap-6 font-[500] items-center relative'>
                <Navigation/>
                <li>
                  <ThemeToggle />
                </li>
            </ul>
            <div className='md:hidden flex items-center gap-4'>
              <ThemeToggle />
            </div>
        </Wrapper>
    </header>
  )
}

export default Header