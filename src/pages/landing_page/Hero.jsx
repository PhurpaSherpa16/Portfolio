import React from 'react'
import Icon from '../../utils/Icon'
import { motion } from 'framer-motion'
import { socialItem, StaggerText } from '../../utils/Animation'
import { MagneticElement } from '../../utils/MagneticCursor'

export default function Hero() {

    return (
        <div className='w-full h-full scroll-m-20 overflow-hidden' id='home'>
            <div className='mainDiv h-full relative'>
                <div className='flex flex-col md:flex-row justify-center relative pt-8 md:pt-16 2xl:pt-24'>
                    {/* Hero Text */}
                    <div className='h-fit w-full md:w-fit'>
                        <h1>
                            <div className='overflow-hidden'>
                                <StaggerText text="Crafting Modern," className='heroText' />
                            </div>
                            <div className='overflow-hidden'>
                                <StaggerText text="Minimal" className='heroText'/>
                            </div>
                            <div className='overflow-hidden'>
                                <StaggerText text="Web Experiences" className='heroText' />
                            </div>
                        </h1>
                    </div>

                    {/* supporting */}
                    <div className='absolute w-full md:w-sm top-[calc(100%+4.7rem)] md:top-[calc(50%+1.7rem)] 
                md:left-[calc(50%+3.7rem)] md:-translate-y-1/2
                flex items-center justify-center'>
                        <motion.p 
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, delay: 1.1, ease: [0.87, 0, 0.13, 1]}}
                        className='text-center relative'>{supporting}</motion.p>
                        <div className='absolute -top-14 md:-top-32 pointer-events-none'>
                            <ArrowSvg />
                        </div>
                    </div>
                </div>
                {/* social and quick contact */}
                <div className='flex flex-col md:flex-row items-center md:items-stretch space-y-4 
            justify-between pt-[calc(56%+3.7rem)] md:pt-16 2xl:pt-24 pb-8'>
                    {/* social */}
                    <SocialBtn/>
                    <motion.div
                    variants={socialItem}
                    initial="initial"
                    animate="animate"
                    custom={{ direction: "x", value: 30 }}>
                        <MagneticElement strength={0.4}>
                            <a type="email" href="mailto:phurpasherpa.frontend.dev@gmail.com">phurpasherpa.frontend.dev@gmail.com</a>
                        </MagneticElement>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}


// site data, hero section
const supporting = <span><span className='text-(--primary_blue) font-bold'>Frontend developer</span> focused on building smooth, fast, modern websites with a focus on clarity, animation, and thoughtful interaction design</span>
const social = [
    { label: "Dribble", link: "/" },
    { label: "Linkedin", link: "/" },
    { label: "Github", link: "/" },
]


const ArrowSvg = () => (
    <motion.svg className='h-36 md:h-80 w-sm md:w-md' viewBox="0 0 442 177" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            initial={{ pathLength: 0, opacity:0 }}
            whileInView={{ pathLength: 1, opacity:1 }}
            transition={{ duration: 1, delay:0.6, ease: [0.87, 0, 0.13, 1] }}
            viewport={{ once: true }}
            d="M188.138 1.50027C250.638 36.5003 422.138 54.0003 438.138 96.5003C454.138 139 372.138 158 331.638 164C305.405 167.887 238.138 178 90.1381 146.5C-57.8619 115 6.0099 47.4058 90.1382 36.5003C171.138 26.0003 364.638 29.0003 389.138 17.5003" 
            stroke="#2238A7"
            strokeWidth="3"
            strokeLinecap="round" />
    </motion.svg>
)


const SocialBtn = () => {

    return (
        <motion.div 
        variants={socialItem}
        custom={{direction:'x', value:-30}}
        initial="initial"
        animate="animate"
        className='flex items-center gap-4'>
            {/* social icons */}
            {social.map((item, index)=>(
                <React.Fragment key={index}>
                    <MagneticElement strength={0.4}>
                        <motion.a 
                        href={item.link} 
                        target='_blank' 
                        custom={{ direction: "y", value: 20 }}
                        rel='noopener noreferrer'
                        className='text-(--primary_black)/60 inline-flex items-center justify-center
                        hover:text-(--primary_blue) 
                        hover:scale-105'
                        title={item.label}>
                            {item.label}
                        </motion.a>
                    </MagneticElement>
                    {index !== social.length -1 && (
                        <motion.div 
                        className='size-1 bg-(--primary_black)/60 rounded-full' />
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    )
}



