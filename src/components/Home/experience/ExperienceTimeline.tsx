import { experienceData } from '@/lib/data'
import { MoveUpRight } from 'lucide-react'
import React from 'react'


const ExperienceTimeline = () => {
  return (
    <div className='my-4'>
        <ol className='flex flex-col gap-10'>
            {experienceData.map((item) =>(
                <div key={item.companyName} className='border-l-[2px] border-white px-4'>
                    <div className='w-full flex flex-col '>
                        <div className='w-full flex items-start md:items-center justify-between md:gap-0 gap-2 '>
                            <div className='flex flex-col gap-1'>
                                <h4 className='md:text-xl md:leading-3 flex items-start md:items-center gap-2'>
                                    {item.roleName}
                                    <span className='bg-gray-800 p-1 rounded-md text-xs  px-2'>{item.jobType}</span>
                                </h4>
                                <div className="flex text-gray-400 items-center gap-1 text-[0.85rem]">
                                    <span>
                                        {item.duration?.start}
                                    </span>
                                    <span>-</span>
                                    <span>
                                        {item.duration?.end ? item.duration.end : item.current ? "Present" :""}
                                    </span>
                                </div>
                                <div className='flex flex-col items-start gap-1'>
                                    {/* <span className='text-sm lowercase'>Internship</span> */}
                                    <span className='bg-gray-300 text-black px-2 py-[2px] rounded-sm text-xs'>{item.type}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-md text-black px-2 md:px-4 text-xs md:text-sm'>
                                <span>at</span>
                                <a className='flex items-center gap-1 group' href={item.companyLink}>
                                    <span className='group-hover:text-gray-500 duration-200'>{item.companyName}</span>
                                    <MoveUpRight className='group-hover:rotate-45 duration-300' size={16}/>
                                </a>
                            </div>
                        </div>
                        <ul className='list-disc list-inside pl-2 text-sm mt-4 flex flex-col gap-2 text-gray-400'>
                            {item.desc && item.desc.map((list,i) => (
                                <li key={i}>
                                    {list}
                                </li>
                            ))}
                        </ul>
                        <div className='my-4 text-xs flex flex-wrap gap-2'>
                            {item.skills && item.skills.map((skill,i) => (
                               
                                <span key={i} className='bg-gray-700 p-2 rounded-md text-white'>{skill}</span>  
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            
        </ol>
    </div>



  )
}

export default ExperienceTimeline