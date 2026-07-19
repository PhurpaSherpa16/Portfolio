import React from 'react'
import CTA from '../../components/cta'
import Icon from '../../utils/Icon'
import { IoMdArrowUp } from 'react-icons/io'
import {motion} from 'framer-motion'
import { socialItem, StaggerText } from '../../utils/Animation'
import { MagneticElement } from '../../utils/MagneticCursor'

export default function Footer() {
  return (
    <div className='relative'>
        <div className='relative h-fit 
        lg:h-[150vh]
        xl:h-[190vh]
        min-[1400px]:h-[160vh]!
        '>
            <div className='h-fit sticky top-0 pt-[70vh] md:pt-[52vh] lg:pt-[40vh]'>
                <FooterContent/>
            </div>
            <div className='absolute top-0 z-10 bg-(--primary_blue)'>
                <FooterPhilosophy/>
            </div>
        </div>
    </div>
  )
}

const FooterPhilosophy = () =>{
    return(
        <div className='relative w-screen overflow-hidden'>
            <motion.div 
            initial={{scale:4}}
            whileInView={{scale:1}}
            viewport={{ once: true, margin:'-400px'}}
            transition={{duration:1, ease:'easeInOut'}}
            className='absolute inset-0 flex items-center justify-center'>
                <div className='bg-(--primary_offwhite)/10 size-[800px] rounded-full shrink-0'/>
                <div className='bg-(--primary_offwhite)/10 size-[800px] rounded-full shrink-0'/>
                <div className='bg-(--primary_offwhite)/10 size-[800px] rounded-full shrink-0'/>
            </motion.div>
            <div className='flex flex-col md:flex-row items-center justify-between mainDiv relative z-10  py-16 space-y-8'>
                <div className='w-full md:w-2/3'>
                    <h1 className='text-(--primary_offwhite)'>
                        <div className='overflow-hidden flex justify-center md:justify-start'>
                            <StaggerText text="Good Design" className='heroText' margin='-100px'/>
                        </div>
                        <div className='overflow-hidden flex justify-center md:justify-start'>
                            <StaggerText text="isn’t " className='heroText' margin='-100px'/>
                        </div>
                        <div className='overflow-hidden flex justify-center md:justify-start'>
                            <StaggerText text="About More" className='heroText' margin='-100px'/>
                        </div>
                    </h1>
                </div>

                <div className='w-full md:w-1/3 space-y-8'>
                    <motion.p
                    variants={socialItem} 
                    initial="initial"
                    whileInView="animate"
                    custom={{ direction: "x", value: 30 }}
                    viewport={{once:true,margin:'-100px'}}
                    className='text-(--primary_offwhite) text-center md:text-right'>
                        {data.supporting}
                    </motion.p>

                    <motion.div
                    variants={socialItem}
                    initial="initial"
                    whileInView="animate"
                    custom={{ direction: "x", value: -30 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className='flex justify-center md:justify-end'>
                        <CTA label="Say Hello" className='bg-(--primary_offwhite)'
                            text_color='text-(--primary_blue)'
                            icon='border border-(--primary_offwhite) text-(--primary_offwhite)'/>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const FooterContent = () =>{
    return(
        <div className='mainDiv relative z-10  py-16 pt-32 space-y-8 md:space-y-16'>
            <div className='space-y-12'>
                {/* top */}
                <div className='flex justify-between'>
                    <a href={'#home'} className='flex items-start justify-center gap-2 bg-(--primary_blue) w-fit px-6 py-2.5'>
                        <div>
                            <img src="/white_logo.png" alt="logo"/>
                        </div>
                        <span className='text-(--primary_offwhite) font-black uppercase tracking-widest font-[vogluxe]'>Portfolio</span>
                    </a>
                    <div className='border-2 flex items-center justify-center size-8 border-(--primary_blue)'>
                        <MagneticElement strength={0.4}>
                            <a href={'#home'} className='text-(--primary_blue)' title='Back to Top'>
                                
                                <IoMdArrowUp className='rotate-0 size-6'/>
                            </a>
                        </MagneticElement>
                    </div>
                </div>

                {/* middle */}
                <div className='flex flex-col md:flex-row space-y-8 justify-between'>
                    <div className='space-y-8 w-full md:w-1/3'>
                        <p>{data.footer_supporting}</p>
                        <div className='flex gap-8'>
                            {data.social.map((social,index)=>{
                                return (
                                    <MagneticElement strength={0.4}>
                                        <a href={social.link} key={index} 
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-(--primary_black) inline-flex items-center justify-center
                                        hover:text-(--primary_blue) 
                                        hover:scale-105
                                        hover:-translate-y-1
                                        transition-all duration-300'
                                        title={social.label}>
                                            <Icon name={social.label.toLowerCase()} key={index}/>
                                        </a>
                                    </MagneticElement>
                                )
                            })}
                        </div>
                    </div>
                    {/* Quick Nav Link */}
                    <div className='w-full md:w-2/3 flex justify-between md:justify-end gap-16'>
                        <div className='space-y-4'>
                            <h3 className='font-bold text-(--primary_black)'>Menu</h3>
                            <div className='flex flex-col space-y-2'>
                                {data.menu.map((item,index)=>(
                                    <MagneticElement strength={0.4}>
                                        <a href={item.link} key={index} className='text-(--primary_black)'>{item.label}</a>
                                    </MagneticElement>
                                ))}
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <h3 className='font-bold text-(--primary_black) text-right md:text-start'>Reach Out</h3>
                            {data.contact.map((item,index)=>(
                                <MagneticElement strength={0.4}>
                                    <a href={item.link} key={index} className='text-(--primary_black)'>{item.label}</a>
                                </MagneticElement>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <hr className='border-(--primary_black)/20'/>
            
            {/* bottom */}
            <div className='flex justify-between'>
                <p className='text-sm'>{data.copyright}</p>
                <p className='text-sm'>{data.dev}</p>
            </div>
        </div>
    )
}



const data = {
    supporting:"I build digital experiences with a focus on clarity, motion, and thoughtful design. Whether it's a landing page, a content platform, or a web application, I aim to create interfaces that feel intuitive, refined, and purposeful. Good design isn't about adding more — it's about knowing what to leave out.",
    footer_supporting: "I build digital experiences with a focus on clarity, motion, and thoughtful design. Whether it's a landing page, a content platform, or a web application.",
    social:[
        {label:"Dribble",link:"https://dribbble.com/"},
        {label:"Linkedin",link:"https://www.linkedin.com/in/phurpa-sherpa/"},
        {label:"Github",link:"https://github.com/PhurpaSherpa16/"},
    ],
    menu:[
        {label:"Home",link:"#"},
        {label:"About Me",link:"#about_me"},
        {label:"Projects",link:"#project"},
        {label:"Skills",link:"#skill"},
    ],
    contact:[
        {label:"phurpasherpa900@gmail.com",link:"mailto:phurpasherpa900@gmail.com"},
    ],
    copyright:'© 2026 Portfolio',
    dev:'By ( Phurpa Sherpa )',
}

