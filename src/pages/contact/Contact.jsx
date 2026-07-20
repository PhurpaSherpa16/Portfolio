import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { BsLinkedin } from 'react-icons/bs'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { LuArrowLeft } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'

export default function Contact() {
    const navigate = useNavigate()

    return (
        <div className='w-full h-full scroll-m-20 overflow-hidden'>
            <div className='mainDiv min-h-[60vh] py-16'>
                <div className="mb-8 px-2">
                    <Link to={`/`} 
                        className="inline-flex items-center gap-2 text-sm text-(--primary_black)/50 hover:text-(--primary_blue) transition-colors group">
                        <LuArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        <span>Back to Home</span>
                    </Link>
                </div>
                <div className='min-h-[40vh] grid'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='relative w-full flex flex-col items-center justify-center'>
                            <FaLocationDot className='size-8 group-hover:animate-ping transition-all'/> 
                            <div className='grid place-items-center'>
                                <p>Based In</p>
                                <h1 className='text-center'>
                                    Kathmandu, Nepal
                                </h1>
                                <div className='flex items-center gap-2'>
                                    <div className='size-3 bg-green-500 rounded-full'/>
                                    <p>Available For Work</p>
                                </div>
                            </div>
                        </div>

                        <Link to={'https://www.linkedin.com/in/phurpa-sherpa/'} target="_blank" rel="noopener noreferrer"  className='grid place-items-center gap-4 w-full bg-(--primary_blue)/10 rounded relative py-16'>
                            <FaExternalLinkAlt className='size-8 absolute text-(--primary_blue) top-4 right-4 group-hover:animate-bounce transition-all'/>
                            <BsLinkedin className='size-24 text-(--primary_blue)'/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-(--primary_blue) min-h-[40vh] py-16 flex items-center justify-center'>
                <div className='mainDiv h-fit!'>
                    <h1 className='text-white font-sans font-bold 
                    text-[80px] md:text-[100px] lg:text-[120px] min-[1400px]:text-[140px]! 2xl:text-[170px] text-center'>Frontend Developer</h1>
                    <p className='text-white font-sans font-light text-center'>Minimal & Seamless Experience</p>
                </div>
            </div>
        </div>
    )
}
