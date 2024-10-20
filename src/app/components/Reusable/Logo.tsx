import Image from 'next/image'
import React from 'react'

import BoyIcon from '../../../../public/3d_boy.png'

const Logo = () => {
  return (
    <div className='text-2xl font-[500] flex items-center gap-2'>
        <Image src={BoyIcon} width={40} height={40} alt='boy_3d'/>
        <h3 className='uppercase'>
            Vaidik. 
        </h3>
    </div>
  )
}

export default Logo