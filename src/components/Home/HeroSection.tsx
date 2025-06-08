'use client'
import React from 'react'
import Wrapper from '../Reusable/Wrapper'
import Image from 'next/image'
import ProfilePic from '../../../public/banner_charater.png'
import { BiLogoGmail } from 'react-icons/bi'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import {motion } from 'framer-motion'
import LetterAnimation from '../Reusable/LetterAnimation'
import AnimatedElement from '../Reusable/animated-element'


const HeroSection = () => {
  return (
    <section className='md:min-h-[100vh]'>
        <Wrapper className='md:w-[80%] mx-auto flex md:flex-row flex-col relative px-8'>
            <div className='  md:w-[90%] flex justify-center items-start  md:h-[70vh] flex-col'>
                <div className='md:w-[70%] mx-auto flex flex-col gap-5 justify-center items-center md:items-start  w-full'>
                    <h1 className=' flex-col text-7xl md:text-7xl w-[90%] md:w-[100%] leading-[4rem] flex'>
                        <div className='flex'> 
                          <div className='motion-preset-slide-down-sm motion-delay-200'>
                            Hi 
                          </div>
                          <div className='flex items-center motion-preset-slide-right-lg'>
                            <div className='motion-preset-fade-lg motion-delay-700 motion-duration-700 motion-ease-spring-smooth  motion-rotate-loop-6'>
                            👋
                            </div>
                            <div>
                              !
                            </div>
                          </div>
                        </div>
                        {/* <span>I'm Vaidik</span> */}
                        <div className='flex flex-wrap  items-end mt-2 md:mt-0'>
                          <span className='  flex items-end md:mb-0 mb-2 motion-preset-slide-down-sm motion-delay-1000'>
                            {"I'm"} 
                          </span>
                          <div className='font-Playwrite font-[900] w-fit'>
                            <LetterAnimation text='Vaidik' /> 
                          </div>   
                        </div>
                    </h1>
                    <ul className='flex flex-col gap-1 list-none pl-4 md:pl-0'>
                      <AnimatedElement variant='fadeInUp' delay={0.1} duration={0.5} once={true} className='leading-8 flex flex-wrap'>
                        <li className='leading-8 flex flex-wrap'>Frontend Developer 
                          <span className='text-blue-500  rounded-sm  ml-1 text-[0.8rem] md:text-[1rem] flex items-center justify-center'>Crafting</span> 
                          <span className='text-green-500 rounded-sm  mx-1 text-[1rem] md:text-[1.2rem] flex items-center justify-center'>Seamless</span> 
                          <span className='text-red-500  rounded-sm  mr-1 text-[1.2rem] md:text-[1.4rem] flex items-center justify-center'>User Experience</span>
                        </li>
                      </AnimatedElement>
                      <AnimatedElement variant='fadeInUp' delay={0.2} duration={0.5} once={true} className='leading-8 flex flex-wrap'>
                        <li>Specializing in pixel perfect web applications</li>
                      </AnimatedElement>
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
                          <a className='bg-white w-full  rounded-md text-red-500 p-1' href={"mailto:vaidiksinghnirwan@gmail.com"} target='_blank'>
                              <BiLogoGmail className='' />
                          </a>
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
                          <a className='bg-[#0B67C3]  text-white border-0 rounded-md p-1' target='_blank' href={"https://www.linkedin.com/in/vaidik-singh-nirwan-b837351b2/"}>
                              <FaLinkedinIn className='' />
                          </a>
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
                          <a className='' href={"https://x.com/kriishnaa_13"} target='_blank'>
                              <FaSquareXTwitter size={40} />
                          </a>
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
                            <a href={"https://github.com/Vaidik1308"} target='_blank'>
                                <FaGithub size={35} />
                            </a>
                          </motion.div>
                    </motion.div>
                </div>
            </div>
            <AnimatedElement variant='fadeInRight' delay={0.1} duration={0.5} once={true} className='w-[45%] md:flex hidden absolute z-10 -right-[5%]'>
                <Image src={ProfilePic} width={500} height={500} className='w-[100%] h-auto ' alt='profilePic'/>
            </AnimatedElement>
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