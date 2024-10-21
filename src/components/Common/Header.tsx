import React from 'react'
import Wrapper from '../Reusable/Wrapper'
import Logo from '../Reusable/Logo'
import Navigation from '../partials/navigation/Navigation'


const Header = () => {
  return (
    <header className='w-full border-gray-800 border-b'>
        <Wrapper className='flex  justify-center md:justify-start gap-32 items-center'>
            <Logo/>
            <ul className=' hidden md:flex gap-6 font-[500] items-center relative'>
                
                <Navigation/>
            </ul>
        </Wrapper>
    </header>
  )
}

export default Header