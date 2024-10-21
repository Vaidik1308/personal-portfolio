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
import LetterAnimation from '../Reusable/LetterAnimation'


const HeroSection = () => {
  return (
    <section>
        <Wrapper className='md:w-[80%] mx-auto flex md:flex-row flex-col relative px-8'>
            <div className='  md:w-[90%] flex justify-center items-start  h-[70vh] flex-col'>
                <div className='md:w-[60%] mx-auto flex flex-col gap-5 justify-center w-full'>
                    <h1 className='flex flex-col text-4xl md:text-7xl w-[90%] leading-[3.5rem] md:leading-[4rem]'>
                        <span>Hi</span>
                        {/* <span>I'm Vaidik</span> */}
                        <div className='flex flex-wrap  items-end'>
                          <span className='  flex items-end '>
                            I'm a  
                          </span>
                          <div className='font-Playwrite font-[900] w-fit'>
                            <LetterAnimation text='Frontend' /> 
                          </div>  
                          <motion.div 
                            animate={{
                              x:-15,
                            }} 
                            transition={{
                              delay:1
                            }}
                            className='font-Playwrite font-[900] w-fit'>
                            {/* <LetterAnimation text='Frontend' />  */}
                            <LetterAnimation text='Developer'/>
                          </motion.div>  
                        </div>
                    </h1>
                    <div className='grid grid-cols-4 items-center gap-4 text-3xl  w-fit  inset-4 px-5 py-3 rounded-lg bg-gray-800' >
                        <motion.div
                          className="w-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ rotate: 360, scale: 1 }} // Changed to 360 degrees
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1 // Delay for the first icon
                          }}
                        >
                          <Link className='bg-white w-full  rounded-md text-red-500 p-1' href={"/"}>
                              <BiLogoGmail className='' />
                          </Link>
                        </motion.div>
                        <motion.div
                          className=" flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ rotate: 360, scale: 1 }} // Changed to 360 degrees
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2 // Delay for the second icon
                          }}
                        >
                          <Link className='bg-[#0B67C3]  text-white border-0 rounded-md p-1' href={"/"}>
                              <FaLinkedinIn className='' />
                          </Link>
                        </motion.div>
                        <motion.div
                          className="flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ rotate: 360, scale: 1 }} // Changed to 360 degrees
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3 // Delay for the third icon
                          }}
                        >
                          <Link className='' href={"/"}>
                              <FaSquareXTwitter size={40} />
                          </Link>
                        </motion.div>
                        <motion.button
                          whileHover={{
                              scale: 1.2,
                              transition: { duration: 0.1 },
                              rotate: 45
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            className="flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }} // Changed to 360 degrees
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                              delay: 0.4 // Delay for the GitHub icon
                            }}
                          >
                            <Link href={"/"}>
                                <FaGithub size={35} />
                            </Link>
                          </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className='w-[45%] md:flex hidden absolute right-0'>
                <Image src={ProfilePic} width={500} height={500} className='w-[100%] h-auto' alt='profilePic'/>
            </div>
        </Wrapper>
    </section>
  )
}

export default HeroSection