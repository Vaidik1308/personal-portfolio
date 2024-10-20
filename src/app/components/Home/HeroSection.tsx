'use client'
import React from 'react'
import Wrapper from '../Reusable/Wrapper'
import Image from 'next/image'

// import ProfilePic from '../../../../public/profilePic.jpg'
import ProfilePic from '../../../../public/banner_charater.png'
import Link from 'next/link'
import { BiLogoGmail } from 'react-icons/bi'
import { FaGithub, FaLinkedin, FaLinkedinIn } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import {motion } from 'framer-motion'


const HeroSection = () => {
  return (
    <section>
        <Wrapper className='w-[80%] mx-auto flex relative'>
            <div className='w-[90%] flex justify-center items-center h-[70vh] flex-col'>
                <div className='w-[80%] mx-auto flex flex-col gap-5'>
                    <h1 className='flex flex-col text-7xl w-[70%]'>
                        <span>Hi</span>
                        {/* <span>I'm Vaidik</span> */}
                        <span>I'm a Frontend Developer</span>
                    </h1>
                    <div className='flex items-center gap-4 text-3xl w-fit inset-4 px-5 py-3 rounded-lg bg-gray-800' >
                        <Link className='bg-white p-1 rounded-md text-red-500 ' href={"/"}>
                            <BiLogoGmail className='' />
                        </Link>
                        <Link className='bg-[#0B67C3] p-1 text-white border-0 rounded-md' href={"/"}>
                            <FaLinkedinIn className='' />
                        </Link>
                        <Link className='' href={"/"}>
                            <FaSquareXTwitter size={40} />
                        </Link>
                        <motion.button
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.1 },
                            rotate:45
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                        <Link href={"/"}>
                            <FaGithub size={35}/>
                        </Link>
                        </motion.button>
                        
                        <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
    >
        <motion.button
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 0.1 },
                            rotate:45
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                        <Link className='' href={"/"}>
                            <FaSquareXTwitter size={40} />
                        </Link>
                        </motion.button>
    </motion.div>
                    </div>
                </div>
            </div>
            <div className='w-[50%] absolute right-0'>
                <Image src={ProfilePic} width={500} height={500} className='w-[100%] h-auto' alt='profilePic'/>
            </div>
        </Wrapper>
    </section>
  )
}

export default HeroSection