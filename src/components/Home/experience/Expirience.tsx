import Container from '@/components/Reusable/Container'
import Wrapper from '@/components/Reusable/Wrapper'
import React from 'react'
import ExperienceTimeline from './ExperienceTimeline'

type Props = {}

const Experience = (props: Props) => {
  return (
    <section>
      <Container className='text-white'>
        <h2>Experience.</h2>
        <div>
          <ExperienceTimeline/>
        </div>
      </Container>
    </section>
  )
}

export default Experience