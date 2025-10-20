"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '../Reusable/ThemeToggle';
import { BriefcaseBusiness, Contact2, Folder, Laptop } from 'lucide-react';

type Props = {}

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

const HomePage = (props: Props) => {
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
                            className='flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition-colors'
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                            </svg>
                            <span className='text-white font-medium hidden sm:inline'>Start</span>
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
                            <div className='scale-90'>
                                <ThemeToggle />
                            </div>

                            {/* Network Icon */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className='text-white p-1'
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                                </svg>
                            </motion.button>

                            {/* Volume Icon */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className='text-white p-1'
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                                </svg>
                            </motion.button>

                            {/* Clock */}
                            <div className='text-white text-sm font-medium hidden md:flex flex-col items-end'>
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
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className='absolute bottom-16 left-4 w-96 backdrop-blur-xl bg-black/60 border border-white/10 rounded-lg shadow-2xl p-6'
                    >
                        <h3 className='text-white text-lg font-semibold mb-4'>Pinned Apps</h3>
                        <div className='grid grid-cols-3 gap-4'>
                            {links.map((link) => (
                                <Link key={link.label} href={link.path} onClick={() => setStartMenuOpen(false)}>
                                    <div className='flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer'>
                                        <div className='text-white w-8 h-8'>
                                            {link.asset.icon}
                                        </div>
                                        <span className='text-white text-xs text-center'>{link.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default HomePage