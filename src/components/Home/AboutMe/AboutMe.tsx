import Container from '@/components/Reusable/Container'
import React from 'react'
import { Code, MapPin, School } from 'lucide-react'


const AboutMe = () => {
  return (
    <section>
        <Container>
            <h2>About Me</h2>
            <div className='my-4 flex items-start gap-4 shadow-lg bg-gray-800 p-4 rounded-lg'>
              <div className='flex justify-start w-[100%] flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <Code size={16}/>
                    <span>
                      Full Stack Developer
                    </span>
                  </div>
                  <div className='flex md:flex-row flex-col items-start gap-2 w-full justify-between'>
                    <div className='flex items-start gap-2'>
                      <School size={16}/>
                      <span className='flex flex-col'>Dayananda Sagar College of Engineering </span>
                    </div>
                    <div className='flex flex-col gap-1 items-end'>
                      <span>
                        Electronics and Communication Engineering
                      </span>
                      <span className='bg-gray-700 text-sm  px-4 rounded-md py-1 flex items-center gap-1'> <MapPin size={16}/> Bengaluru, Karnataka</span>
                    </div>
                  </div>
              </div>
            </div>
        </Container>
    </section>
  )
}

export default AboutMe