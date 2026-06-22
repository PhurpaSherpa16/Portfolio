import React, { useEffect } from 'react'
import Hero from './landing_page/Hero'
import AboutMe from './landing_page/AboutMe'
import Projects from './landing_page/Projects'
import Skills from './landing_page/Skills'
import Footer from './landing_page/Footer'
import { useLocation } from 'react-router-dom'

export default function Index() {
  const location = useLocation()

  useEffect(()=>{
    if(location.hash){
      const element = document.querySelector(location.hash)
      if(element){
        element.scrollIntoView({behavior:'smooth',block:'start'})
      }
    }

  },[location])

  return (
    <div>
        <Hero/>
        <AboutMe/>
        <Projects/>
        <Skills/>
        <Footer/>
    </div>
  )
}
