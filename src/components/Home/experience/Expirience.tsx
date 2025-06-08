import Container from '@/components/Reusable/Container'
import React from 'react'
import ExperienceTimeline from './ExperienceTimeline'
import { HeaderSection } from '@/components/Reusable/HeaderSection'



const Experience = () => {
  return (
    <section id='experience' className='mt-12'>
      <Container className='text-white flex flex-col gap-4 justify-center items-center w-full'>
        <div className='flex flex-col gap-2 justify-center items-center w-full'>
          <HeaderSection description='I have worked on a variety of projects, from small personal projects to large scale enterprise applications.'>Experience.</HeaderSection>
        </div>
        <div className='md:mx-4'>
          <ExperienceTimeline/>
        </div>
      </Container>
    </section>
  )
}

export default Experience