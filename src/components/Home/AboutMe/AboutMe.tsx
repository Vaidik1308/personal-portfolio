import Container from '@/components/Reusable/Container'
import React from 'react'
import { Code, MapPin, School } from 'lucide-react'
import { aboutData } from '@/lib/data'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { TbBrand4Chan } from 'react-icons/tb'


const AboutMe = () => {
  return (
    <section>
        <Container>
            <h2>About Me</h2>
            <div className='my-4 gap-4 shadow-lg bg-gray-800 p-4 rounded-lg'>
            Full Stack Developer passionate about Frontend <span className=''>💻</span>. I build clean, responsive apps using React <span>⚛️</span>, Next.js, TypeScript, Tailwind <span>🎨</span>, Node.js & Express. Interned at CFT Labs, ChatClient.ai & Taktys <span>🛠️</span>. I love creating smooth digital experiences <span>✨</span> and always aim to learn and grow <span>🚀</span>.









            </div>
            <div className='my-4 flex items-start gap-4 shadow-lg bg-gray-800 p-4 rounded-lg'>

              <div className='flex justify-start w-[100%] flex-col gap-2'>
                  <div className='flex w-full justify-between'>
                    <div className='flex items-start md:items-center w-[60%] md:w-auto gap-2'>
                      <Code size={16}/>
                      <span>
                        {aboutData.role}
                      </span>
                    </div>
                    <div className='flex items-center w-fit px-2 h-[35px] md:h-auto md:w-fit justify-center gap-1 md:px-2 bg-gray-700 md:py-1 text-[0.75rem] md:text-[1rem] rounded-sm'>
                      <IoDocumentTextOutline className=' text-[14px] md:text-[16px]'/>
                      <a className='cursor-pointer' target='_blank' href='https://drive.google.com/file/d/1RCjO4PdloKZwVijaAo8yt_6jYLo3vKH7/view?usp=sharing'>
                        Resume
                      </a>
                    </div>
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
                      <span className='bg-gray-700 text-sm  px-4 rounded-md py-1 flex items-center gap-1 w-fit'> <MapPin size={16}/>{aboutData.location}</span>
                    </div>
                  </div>
              </div>
            </div>
        </Container>
    </section>
  )
}

export default AboutMe