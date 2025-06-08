'use client'
import Container from '@/components/Reusable/Container'
import React, { useEffect, useState } from 'react'
import { FaReact } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiPostgresql, SiGit, SiJavascript, SiPython, SiCplusplus, SiReact, SiFastapi, SiDart, SiSass } from 'react-icons/si';
import AnimatedElement from '@/components/Reusable/animated-element';
import { HeaderSection } from '@/components/Reusable/HeaderSection';

type Skill = {
    name: string;
    type: 'icon' | 'img';
    icon?: React.ReactNode;
    img?: string;
}

const SkillsSection = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);
    const skills:Skill[] = [
        {
            name: 'React',
            type:'icon',
            icon: <FaReact className='text-blue-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'Next.js',
            type:'icon',
            icon: <SiNextdotjs className='text-white' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'React Native',
            type:'icon',
            icon: <SiReact className='text-blue-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'TypeScript',
            type:'icon',
            icon: <SiTypescript className='text-blue-500' size={ isMobile ? 30 :50}/>
        },
        {
            name:"JavaScript",
            type:'icon',
            icon: <SiJavascript className='text-yellow-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'Tailwind',
            type:'icon',
            icon: <SiTailwindcss className='text-teal-500' size={ isMobile ? 30 :50}/>
        },
        {
            name:"SCSS",
            type:'icon',
            icon: <SiSass className='text-pink-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'Node.js',
            type:'icon',
            icon: <SiNodedotjs className='text-green-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'Express',
            type:'icon',
            icon: <SiExpress className='text-gray-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'MongoDB',
            type:'icon',
            icon: <SiMongodb className='text-green-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'PostgreSQL',
            type:'icon',
            icon: <SiPostgresql className='text-blue-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'Git',
            type:'icon',
            icon: <SiGit className='text-orange-500' size={ isMobile ? 30 :50}/>
        },
        {
            name: 'Python',
            type:'icon',
            icon: <SiPython className='text-yellow-500' size={ isMobile ? 30 :50}/>
        },
        {
            name:"FastAPI",
            type:'icon',
            icon: <SiFastapi className='text-green-500' size={ isMobile ? 30 :50}/>
        },
        {
            name:"C++",
            type:'icon',
            icon: <SiCplusplus className='text-blue-500' size={ isMobile ? 30 :50}/>
        },
        {
            name:"Dart",
            type:'icon',
            icon: <SiDart className='text-blue-500' size={ isMobile ? 30 :50}/>
        }
        
        

    ]
  return (
    <section id='skills' className='mt-12'>
    <Container className='text-white'>
      <HeaderSection>Skills.</HeaderSection>
      <div className='md:mx-4 md:flex md:flex-wrap md:gap-4 md:py-4 md:justify-center md:items-center py-4 grid grid-cols-3 gap-4'>
        {/* <ExperienceTimeline/> */}
        {
            skills.map((skill, index) => (
                <AnimatedElement
                    variant='fadeIn'
                    delay={index*0.1}
                    duration={0.5}
                    once={true}
                    key={index} 
                    className='flex items-center flex-col bg-gray-800 md:p-4 rounded-lg md:size-32 size-24 p-1 justify-center gap-5 hover:scale-105 transition-all duration-300 cursor-pointer hover:bg-gray-700'
                >
                    {skill.icon}
                    <span className='text-sm'>{skill.name}</span>
                </AnimatedElement>
            ))
        }
      </div>
    </Container>
  </section>
  )
}

export default SkillsSection