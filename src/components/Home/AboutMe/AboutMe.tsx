import Container from '@/components/Reusable/Container'
import React from 'react'
import { Code, MapPin, School } from 'lucide-react'
import { aboutData } from '@/lib/data'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { TbBrand4Chan } from 'react-icons/tb'
import AnimatedElement from '@/components/Reusable/animated-element'
import { HeaderSection } from '@/components/Reusable/HeaderSection'


const AboutMe = () => {
  return (
    <section id='about' className=' md:mt-16'>
        <Container>
            <HeaderSection>About Me</HeaderSection>
            <AnimatedElement variant='fadeInUp' delay={0.1} duration={0.5} once={true} className='my-4 gap-4 shadow-lg bg-card p-4 rounded-lg'>
            Full Stack Developer passionate about Frontend <span className=''>💻</span>. I build clean, responsive apps using React <span>⚛️</span>, Next.js, TypeScript, Tailwind <span>🎨</span>, Node.js & Express. Interned at Zame ai, localwell, CFT Labs, ChatClient.ai & Taktys <span>🛠️</span>. I love creating smooth digital experiences <span>✨</span> and always aim to learn and grow <span>🚀</span>.









            </AnimatedElement>
            <AnimatedElement variant='fadeInUp' delay={0.4} duration={0.5} once={true} className='my-4 flex items-start gap-4 shadow-lg bg-card p-4 rounded-lg'>

              <div className='flex justify-start w-[100%] flex-col gap-2'>
                  <div className='flex w-full justify-between md:flex-row flex-col'>
                    <div className='flex items-center md:w-[60%]  gap-2'>
                      <Code size={16}/>
                      <span>
                        {aboutData.role}
                      </span>
                    </div>
                    <a target='_blank' href='https://drive.google.com/file/d/1YbjXs2ALW_TCBest6qYPfENCqL7vIOiZ/view?usp=sharing' className='flex items-center  px-2 h-[35px] md:h-auto justify-center gap-1 md:px-2 dark:bg-gray-800 bg-green-500 md:py-1 text-[0.75rem] md:text-[1rem] rounded-sm mt-2 md:mt-0 w-full md:w-fit hover:bg-accent duration-200 cursor-pointer text-white select-none'>
                      <IoDocumentTextOutline className=' text-[14px] md:text-[16px] '/>
                      <span className='cursor-pointer' >
                        Resume
                      </span>
                    </a>
                  </div>
                  <div className='flex md:flex-row flex-col items-start gap-2 w-full justify-between'>
                    <div className='flex items-start gap-2'>
                      <School size={16} className='mt-1 '/>
                      <span className='flex flex-col'>{aboutData.education.college.name} </span>
                    </div>
                    <div className='flex flex-col gap-2 md:items-end '>
                      <div className='flex items-start gap-1'>
                      <TbBrand4Chan size={16} className='mt-1'/>
                        {aboutData.education.college.branch}
                      </div>
                      <span className='dark:bg-gray-800 bg-green-500 text-white dark:text-white text-sm  px-4 rounded-md py-1 flex items-center gap-1 w-fit'> <MapPin size={16}/>{aboutData.location}</span>
                    </div>
                  </div>
              </div>
            </AnimatedElement>
        </Container>
    </section>
  )
}

export default AboutMe