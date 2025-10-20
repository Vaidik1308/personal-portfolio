"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BriefcaseBusiness, ChevronRight, Contact2, Folder, Laptop, Volume2, Wifi } from 'lucide-react';
import Image from 'next/image';
import {  RiShutDownLine } from 'react-icons/ri';


type ILink = {
    label: string;
    path: string;
    asset: {
        type: "image" | "video" | "icon";
        url?: string;
        icon?: React.ReactNode;
    }
}

const backgroundImage = "https://images.unsplash.com/photo-1561156772-a44477f220a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"

const HomePage = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [startMenuOpen, setStartMenuOpen] = useState(false)

    // Update time every second
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const links: ILink[] = [
        {
            label: "This PC",
            path: "/intro",
            asset: {
                type: "icon",
                icon: <Laptop className='size-6' />
            }
        },
        {
            label: "Experience",
            path: "/experience",
            asset: {
                type: "icon",
                icon: <BriefcaseBusiness className='size-6' />
            }
        },
        {
            label: "Projects",
            path: "/projects",
            asset: {
                type: "icon",
                icon: <Folder className='size-6' />
            }
        },
        {
            label: "Connect",
            path: "/connect",
            asset: {
                type: "icon",
                icon: <Contact2 className='size-6' />
            }
        },
    ]

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className='w-full max-h-full relative flex flex-col'
        >
            <div className='w-full h-screen flex flex-col justify-between overflow-hidden'>
                {/* Desktop Icons */}
                <div className='flex-1 p-8'>
                    <div className='flex flex-col gap-6 w-fit'>
                        {links.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                                <Link href={link.path}>
                                    <div className='flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer group'>
                                        <motion.div 
                                            className='text-white drop-shadow-lg'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {link.asset.icon || (
                                                <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center'>
                                                    <span className='text-2xl'>📁</span>
                                                </div>
                                            )}
                                        </motion.div>
                                        <span className='text-white text-sm font-medium drop-shadow-lg text-center group-hover:underline'>
                                            {link.label}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Windows Taskbar */}
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className='backdrop-blur-xl bg-black/40 border-t border-white/10 py-2'
                >
                    <div className='flex items-center justify-between px-4 h-14'>
                        {/* Start Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStartMenuOpen(!startMenuOpen)}
                            className='flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors'
                        >
                            <Image
                                src={"/windows.svg"}
                                alt='windows_icon'
                                width={20}
                                height={20}
                                className='size-8'
                            />
                        </motion.button>

                        {/* Center - Running Apps */}
                        <div className='flex items-center gap-2'>
                            {links.slice(0, 3).map((link) => (
                                <Link key={link.label} href={link.path}>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='p-2 rounded hover:bg-white/10 transition-colors'
                                    >
                                        <div className='text-white w-6 h-6'>
                                            {link.asset.icon}
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        {/* System Tray */}
                        <div className='flex items-center gap-3'>
                            {/* Theme Toggle */}
                            {/* <div className='scale-90'>
                                <ThemeToggle />
                            </div> */}

                            {/* Network Icon */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className='text-white p-1'
                            >
                                <Wifi className='size-4' />
                            </motion.button>

                            {/* Volume Icon */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className='text-white p-1'
                            >
                                <Volume2 className='size-4' />
                            </motion.button>

                            {/* Clock */}
                            <div className='text-white text-xs font-medium hidden md:flex flex-col items-end'>
                                <div>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                <div className='text-xs opacity-80'>
                                    {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Start Menu (when open) */}
                {startMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: 20 }}
                        className='absolute bottom-16 left-4 w-[50%] backdrop-blur-xl bg-black/20 border border-white/10 rounded-lg shadow-2xl'
                    >
                        <div className='p-6 flex flex-col gap-4'>
                            <div className='flex justify-between items-center w-full'>
                                <h3 className='text-white text-base font-normal mb-4'>Pinned</h3>

                                <button className='flex items-center gap-2 text-white text-sm font-normal bg-black/20 py-1 px-4 rounded-md hover:text-gray-400 duration-300'>
                                    All <ChevronRight className='size-4' />
                                </button>
                            </div>
                            <div className='grid grid-cols-6 gap-4'>
                                {links.map((link) => (
                                    <Link key={link.label} href={link.path} onClick={() => setStartMenuOpen(false)}>
                                        <div className='flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer'>
                                            <div className='text-white w-8 h-8'>
                                                {link.asset.icon}
                                            </div>
                                            <span className='text-white text-xs text-center'>{link.label}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className='p-6 flex flex-col gap-4'>
                            <div className='flex justify-between items-center w-full'>
                                <h3 className='text-white text-base font-normal mb-4'>Recommended</h3>

                                <button className='flex items-center gap-2 text-white text-sm font-normal bg-black/20 py-1 px-4 rounded-md hover:text-gray-400 duration-300'>
                                    More <ChevronRight className='size-4' />
                                </button>
                            </div>
                            <div className='grid grid-cols-6 gap-4'>
                                {links.slice(1, 3).map((link) => (
                                    <Link key={link.label} href={link.path} onClick={() => setStartMenuOpen(false)}>
                                        <div className='flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer'>
                                            <div className='text-white w-8 h-8'>
                                                {link.asset.icon}
                                            </div>
                                            <span className='text-white text-xs text-center'>{link.label}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className='w-full flex justify-between items-center bg-black/40 p-4'>
                            <div className='flex items-center gap-2'>
                                <div className='size-12 border border-gray-700 rounded-full flex justify-center items-center'>
                                    <Image src={"/profilePic.jpg"} width={100} height={100} alt='profile_pic' className='w-full h-full object-contain rounded-full' />
                                </div>

                                <div className='text-white flex items-center'>
                                    Vaidik Singh Nirwan
                                </div>
                            </div>

                            <button className='p-3 hover:bg-zinc-700/20 rounded-md duration-300'>
                                <RiShutDownLine className='text-white'/>
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default HomePage