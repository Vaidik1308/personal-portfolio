'use client'
import React from 'react'
import Wrapper from '../Reusable/Wrapper'
import Image from 'next/image'

// import ProfilePic from '../../../../public/profilePic.jpg'
import ProfilePic from '../../../public/banner_charater.png'
import Link from 'next/link'
import { BiLogoGmail } from 'react-icons/bi'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import {motion } from 'framer-motion'
import LetterAnimation from '../Reusable/LetterAnimation'


const HeroSection = () => {
  return (
    <section>
        <Wrapper className='md:w-[80%] mx-auto flex md:flex-row flex-col relative px-8'>
            <div className='  md:w-[90%] flex justify-center items-start  md:h-[70vh] flex-col'>
                <div className='md:w-[70%] mx-auto flex flex-col gap-5 justify-center w-full'>
                    <h1 className=' flex-col text-7xl md:text-7xl w-[90%] md:w-[100%] leading-[4rem] flex'>
                        <div> 
                          <span className='motion-preset-slide-down-sm motion-delay-200'>
                            Hi 
                          </span>
                          <span className='motion-preset-fade-lg motion-delay-700 motion-duration-700'>
                          👋!
                          </span>
                        </div>
                        {/* <span>I'm Vaidik</span> */}
                        <div className='flex flex-wrap  items-end mt-2 md:mt-0'>
                          <span className='  flex items-end md:mb-0 mb-2 motion-preset-slide-down-sm motion-delay-1000'>
                            I'm 
                          </span>
                          <div className='font-Playwrite font-[900] w-fit'>
                            <LetterAnimation text='Vaidik' /> 
                          </div>   
                        </div>
                    </h1>
                    <ul className='flex flex-col gap-1 list-disc pl-6'>
                      <li>Frontend Software Engineer <span className='bg-gray-700 py-1 p-1 rounded-sm'>Crafting Seamless User Experience</span> </li>
                      <li>focussed on building pixel perfect web apps </li>
                    </ul>
                    <motion.div 
                      className='grid grid-cols-4 md:mt-0 mt-4 items-center gap-4 text-3xl mx-auto md:mx-0 w-fit  inset-4 px-5 py-3 rounded-lg bg-gray-800' 
                      initial={{ scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }} // Changed to 360 degrees
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1 // Delay for the first icon
                          }}
                    >
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
                    </motion.div>
                </div>
            </div>
            <div className='w-[45%] md:flex hidden absolute z-10 -right-[5%]'>
                <Image src={ProfilePic} width={500} height={500} className='w-[100%] h-auto ' alt='profilePic'/>
            </div>
            <motion.div 
              initial={{
                x:100,
                opacity:0
              }}
              animate={{
                x:0,
                opacity:1
              }}
              transition={{
                type:"spring",
                delay:1
              }}
              className='absolute size-[25rem] z-[5] bg-green-700 right-[0%] bottom-[5%] md:flex hidden rounded-full' />
        </Wrapper>
    </section>
  )
}

export default HeroSection