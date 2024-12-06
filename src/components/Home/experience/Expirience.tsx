import Container from '@/components/Reusable/Container'
import React from 'react'
import ExperienceTimeline from './ExperienceTimeline'

const Experience = () => {
  return (
    <section>
      <Container className='text-white'>
        <h2>Experience.</h2>
        <div className='mx-4'>
          <ExperienceTimeline/>
        </div>
      </Container>
    </section>
  )
}

export default Experience