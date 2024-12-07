import Image from 'next/image';
import React from 'react';
import BoyIcon from '../../../public/3d_boy.png';

const Logo = () => {
  
  return (
    <div className="text-xl font-[500] flex items-center gap-1">
      <Image src={BoyIcon} width={40} height={40} alt="boy_3d" />
      <h3 className="uppercase font-extrabold flex gap-0.5 motion-scale-in-50 motion-preset-slide-right-lg">
        <div className=' -motion-rotate-loop-12 motion-translate-y-loop-[20%] motion-duration-2000 motion-ease-in-out motion-delay-100'>V</div>
        <div className='motion-translate-y-loop-[20%] motion-duration-2000 motion-ease-in-out motion-delay-200'>a</div>
        <div className='motion-translate-y-loop-[20%] motion-duration-2000 motion-ease-in-out motion-delay-300'>i</div>
        <div className='motion-translate-y-loop-[20%] motion-duration-2000 motion-ease-in-out motion-delay-500'>d</div>
        <div className='motion-translate-y-loop-[20%] motion-duration-2000 motion-ease-in-out motion-delay-700'>i</div>
        <div className='motion-translate-y-loop-[20%] motion-duration-1500 motion-ease-in-out motion-delay-1000'>k</div>
      </h3>
    </div>
  );
};

export default Logo;
