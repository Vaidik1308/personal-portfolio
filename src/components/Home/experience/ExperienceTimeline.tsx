import { div } from 'framer-motion/client'
import { ArrowBigRight, MoveUpRight } from 'lucide-react'
import React from 'react'

type Props = {}

const ExperienceTimeline = (props: Props) => {
  return (
    <div className='my-4'>
        <ol className='flex flex-col gap-10'>
            <div className='border-l-[2px] border-white px-4'>
                <div className='w-full flex flex-col '>
                    <div className='w-full flex items-start md:items-center justify-between '>
                        <div className='flex flex-col gap-1'>
                            <h4 className='md:text-xl md:leading-3 flex items-start md:items-center gap-2'>
                                Frontend UI Developer
                                <span className='bg-gray-800 p-1 rounded-md text-xs  px-2'>Internship</span>
                            </h4>
                            <div className="flex text-gray-400 items-center gap-1 text-[0.85rem]">
                                <span>
                                    Oct, 2024
                                </span>
                                <span>-</span>
                                <span>
                                    Present 
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-1'>
                                {/* <span className='text-sm lowercase'>Internship</span> */}
                                <span className='bg-gray-300 text-black px-2 py-[2px] rounded-sm text-xs'>remote</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-md text-black px-2 md:px-4 text-xs md:text-sm'>
                            <span>at</span>
                            <a className='flex items-center gap-1 group' href="https://www.taktys.com/">
                                <span className='group-hover:text-gray-500 duration-200'>Taktys</span>
                                <MoveUpRight className='group-hover:rotate-45 duration-300' size={16}/>
                            </a>
                        </div>
                    </div>
                    <ul className='list-disc list-inside pl-2 text-sm mt-4 flex flex-col gap-2 text-gray-400'>
                        <li>
                            Developed the UI for taktys.
                        </li>
                        <li>
                            Utilized modern frameworks and libraries to streamline development.
                        </li>
                        <li>
                            Developing the modern dashboard for users.
                        </li>
                        <li>
                            Worked closely with backend developers to ensure seamless integration.
                        </li>
                        <li>
                            Developing reusable components which maintains code reusability.
                        </li>
                    </ul>
                    <div className='my-4 text-xs flex flex-wrap gap-2'>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Next Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>React Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Tailwind CSS</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Redux Toolkit</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Zustand</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Shadcn UI</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TypeScript</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Git Github</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TimescaleDB</span>
                    </div>
                </div>
            </div>
            <div className='border-l-[2px] border-white px-4'>
                <div className='w-full flex flex-col '>
                <div className='w-full flex items-start md:items-center justify-between '>
                        <div className='flex flex-col gap-1'>
                            <h4 className='md:text-xl md:leading-3 flex items-start md:items-center gap-2'>
                                Frontend UI Developer
                                <span className='bg-gray-800 p-1 rounded-md text-xs  px-2'>Internship</span>
                            </h4>
                            <div className="flex text-gray-400 items-center gap-1 text-[0.85rem]">
                                <span>
                                    Oct, 2024
                                </span>
                                <span>-</span>
                                <span>
                                    Present 
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-1'>
                                {/* <span className='text-sm lowercase'>Internship</span> */}
                                <span className='bg-gray-300 text-black px-2 py-[2px] rounded-sm text-xs'>remote</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-md text-black px-2 md:px-4 text-xs md:text-sm'>
                            <span>at</span>
                            <a className='flex items-center gap-1 group' href="https://www.taktys.com/">
                                <span className='group-hover:text-gray-500 duration-200'>Taktys</span>
                                <MoveUpRight className='group-hover:rotate-45 duration-300' size={16}/>
                            </a>
                        </div>
                    </div>
                    <ul className='list-disc list-inside pl-2 text-sm mt-4 flex flex-col gap-2 text-gray-400'>
                        <li>
                            Developed the UI for taktys.
                        </li>
                        <li>
                            Utilized modern frameworks and libraries to streamline development.
                        </li>
                        <li>
                            Developing the modern dashboard for users.
                        </li>
                        <li>
                            Worked closely with backend developers to ensure seamless integration.
                        </li>
                        <li>
                            Developing reusable components which maintains code reusability.
                        </li>
                    </ul>
                    <div className='my-4 text-xs flex flex-wrap gap-2'>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Next Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>React Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Tailwind CSS</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Redux Toolkit</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Zustand</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Shadcn UI</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TypeScript</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Git Github</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TimescaleDB</span>
                    </div>
                </div>
            </div>
            <div className='border-l-[2px] border-white px-4'>
                <div className='w-full flex flex-col '>
                <div className='w-full flex items-start md:items-center justify-between '>
                        <div className='flex flex-col gap-1'>
                            <h4 className='md:text-xl md:leading-3 flex items-start md:items-center gap-2'>
                                Frontend UI Developer
                                <span className='bg-gray-800 p-1 rounded-md text-xs  px-2'>Internship</span>
                            </h4>
                            <div className="flex text-gray-400 items-center gap-1 text-[0.85rem]">
                                <span>
                                    Oct, 2024
                                </span>
                                <span>-</span>
                                <span>
                                    Present 
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-1'>
                                {/* <span className='text-sm lowercase'>Internship</span> */}
                                <span className='bg-gray-300 text-black px-2 py-[2px] rounded-sm text-xs'>remote</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-md text-black px-2 md:px-4 text-xs md:text-sm'>
                            <span>at</span>
                            <a className='flex items-center gap-1 group' href="https://www.taktys.com/">
                                <span className='group-hover:text-gray-500 duration-200'>Taktys</span>
                                <MoveUpRight className='group-hover:rotate-45 duration-300' size={16}/>
                            </a>
                        </div>
                    </div>
                    <ul className='list-disc list-inside pl-2 text-sm mt-4 flex flex-col gap-2 text-gray-400'>
                        <li>
                            Developed and maintained the front-end of multiple client and admin web applications at CFT Labs.
                        </li>
                        <li>
                            Implemented front-end features for an Admin Analytics Page, enabling efficient data visualization and user
                            interaction.
                        </li>
                        <li>
                            Collaborated with cross-functional teams to deliver high-quality web applications within project timelines.
                        </li>
                    </ul>
                    <div className='my-4 text-xs flex flex-wrap gap-2'>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Next Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>React Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Tailwind CSS</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Shadcn UI</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>ChartsJs</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TypeScript</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Git Github</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>MongoDB</span>
                    </div>
                </div>
            </div>
            <div className='border-l-[2px] border-white px-4'>
                <div className='w-full flex flex-col '>
                <div className='w-full flex items-start md:items-center justify-between '>
                        <div className='flex flex-col gap-1'>
                            <h4 className='md:text-xl md:leading-3 flex items-start md:items-center gap-2'>
                                Frontend UI Developer
                                <span className='bg-gray-800 p-1 rounded-md text-xs  px-2'>Internship</span>
                            </h4>
                            <div className="flex text-gray-400 items-center gap-1 text-[0.85rem]">
                                <span>
                                    Oct, 2024
                                </span>
                                <span>-</span>
                                <span>
                                    Present 
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-1'>
                                {/* <span className='text-sm lowercase'>Internship</span> */}
                                <span className='bg-gray-300 text-black px-2 py-[2px] rounded-sm text-xs'>remote</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-md text-black px-2 md:px-4 text-xs md:text-sm'>
                            <span>at</span>
                            <a className='flex items-center gap-1 group' href="https://www.taktys.com/">
                                <span className='group-hover:text-gray-500 duration-200'>Taktys</span>
                                <MoveUpRight className='group-hover:rotate-45 duration-300' size={16}/>
                            </a>
                        </div>
                    </div>
                    <ul className='list-disc list-inside pl-2 text-sm mt-4 flex flex-col gap-2 text-gray-400'>
                        <li>
                            Developed the UI for new features.
                        </li>
                        <li>
                            Utilized modern frameworks and libraries to streamline development.
                        </li>
                        <li>
                            Revamped the landing page to create a more attractive UI.
                        </li>
                        <li>
                            Worked closely with backend developers to ensure seamless integration.
                        </li>
                        <li>
                            Developed reusable components which maintains code reusability.
                        </li>
                    </ul>
                    <div className='my-4 text-xs flex flex-wrap gap-2'>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Next Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>React Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Tailwind CSS</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Redux Toolkit</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Zustand</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Shadcn UI</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TypeScript</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Git Github</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TimescaleDB</span>
                    </div>
                </div>
            </div>
            <div className='border-l-[2px] border-white px-4'>
                <div className='w-full flex flex-col '>
                <div className='w-full flex items-start md:items-center justify-between '>
                        <div className='flex flex-col gap-1'>
                            <h4 className='md:text-xl md:leading-3 flex items-start md:items-center gap-2'>
                                Frontend UI Developer
                                <span className='bg-gray-800 p-1 rounded-md text-xs  px-2'>Internship</span>
                            </h4>
                            <div className="flex text-gray-400 items-center gap-1 text-[0.85rem]">
                                <span>
                                    Oct, 2024
                                </span>
                                <span>-</span>
                                <span>
                                    Present 
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-1'>
                                {/* <span className='text-sm lowercase'>Internship</span> */}
                                <span className='bg-gray-300 text-black px-2 py-[2px] rounded-sm text-xs'>remote</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 bg-gray-100 p-2 rounded-md text-black px-2 md:px-4 text-xs md:text-sm'>
                            <span>at</span>
                            <a className='flex items-center gap-1 group' href="https://www.taktys.com/">
                                <span className='group-hover:text-gray-500 duration-200'>Taktys</span>
                                <MoveUpRight className='group-hover:rotate-45 duration-300' size={16}/>
                            </a>
                        </div>
                    </div>
                    <ul className='list-disc list-inside pl-2 text-sm mt-4 flex flex-col gap-2 text-gray-400'>
                        <li>
                            Developed the UI for new features.
                        </li>
                        <li>
                            Utilized modern frameworks and libraries to streamline development.
                        </li>
                        <li>
                            Revamped the landing page to create a more attractive UI.
                        </li>
                        <li>
                            Worked closely with backend developers to ensure seamless integration.
                        </li>
                        <li>
                            Developed reusable components which maintains code reusability.
                        </li>
                    </ul>
                    <div className='my-4 text-xs flex flex-wrap gap-2'>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Next Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>React Js</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Tailwind CSS</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Redux Toolkit</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Zustand</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Shadcn UI</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TypeScript</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>Git Github</span>
                        <span className='bg-gray-700 p-2 rounded-md text-white'>TimescaleDB</span>
                    </div>
                </div>
            </div>
            
        </ol>
    </div>



  )
}

export default ExperienceTimeline