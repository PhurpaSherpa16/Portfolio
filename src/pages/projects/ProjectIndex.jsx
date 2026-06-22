import React, { useEffect } from 'react'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import { ProjectData } from '../../assets/Site'
import Icon from '../../utils/Icon'
import { MagneticElement } from '../../utils/MagneticCursor'
import { motion } from 'motion/react'
import { LuArrowLeft, LuArrowRight, LuExternalLink } from "react-icons/lu"
import { FaCheckCircle } from "react-icons/fa";


export default function ProjectIndex() {
    const location = useLocation()
    const { project_name } = useParams()
    
    // Fallback to location path split if useParams is not fully mapped
    const project_id = project_name || location.pathname.split("/")[2]

    const data = ProjectData.projects.find((project) => project.id === project_id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    if (!data) {
        return (
            <div className='min-h-screen flex flex-col justify-center items-center bg-(--primary_offwhite) text-(--primary_black) font-sans'>
                <h1 className='font-[vogluxe] text-3xl mb-4'>Project Not Found</h1>
                <Link to="/" className="text-(--primary_blue) hover:underline">Back to Projects</Link>
            </div>
        )
    }

    const currentIndex = ProjectData.projects.findIndex((project) => project.id === project_id)
    const totalProjects = ProjectData.projects.length
    const prevProject = ProjectData.projects[(currentIndex - 1 + totalProjects) % totalProjects]
    const nextProject = ProjectData.projects[(currentIndex + 1) % totalProjects]

    const renderMedia = () => {
        if (!data.file || data.file.length === 0) return null

        if (data.file.length === 1) {
            const file = data.file[0]
            return (
                <video 
                      src={file.link} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                  />
            )
        }

        // Multiple files (e.g. NGO has a video and an image)
        const videoFile = data.file.find(f => f.type === 'video' && f.case)
        const imageFile = data.file.find(f => f.type === 'image' && f.case)

        return (
            <div>
                {videoFile && (
                    <div className='w-full h-auto'>
                      <video src={videoFile.link} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="w-full h-full object-cover"
                      />
                    </div>
                )}
            </div>
        )
    }
    const navigate = useNavigate()
    

    return (
        <div className="min-h-screen bg-(--primary_offwhite) text-(--primary_black) font-sans">
            <div className="mainDiv pt-12 pb-8">
                {/* Back Button */}
                <div className="mb-8">
                      <button onClick={()=>navigate(`/#${project_id}`)} 
                          className="inline-flex items-center gap-2 text-sm text-(--primary_black)/50 hover:text-(--primary_blue) transition-colors group">
                          <LuArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                          <span>Back to Projects</span>
                      </button>
                </div>

                {/* Title */}
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
                    className="font-[vogluxe] text-5xl md:text-7xl lg:text-8xl text-(--primary_black) tracking-tight leading-none mb-12"
                >
                    {data.title}
                </motion.h1>

                {/* Meta details grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/10 text-sm">
                    <div>
                        <span className="text-black/40 text-[10px] uppercase tracking-wider block mb-2 font-bold">Role</span>
                        <span className="font-medium text-(--primary_black) block">{data.project_info?.role || "Solo Designer & Developer"}</span>
                    </div>
                    <div>
                        <span className="text-black/40 text-[10px] uppercase tracking-wider block mb-2 font-bold">Timeline</span>
                        <span className="font-medium text-(--primary_black) block">{data.project_info?.timeline || "2026"}</span>
                    </div>
                    <div>
                        <span className="text-black/40 text-[10px] uppercase tracking-wider block mb-2 font-bold">Standards</span>
                        <span className="font-medium text-(--primary_black) block">{data.project_info?.standards || "WCAG 2.1 AA"}</span>
                    </div>
                    <div>
                        <span className="text-black/40 text-[10px] uppercase tracking-wider block mb-2 font-bold">Website</span>
                        {data.liveLink ? (
                            <MagneticElement strength={0.15}>
                                <a 
                                    href={data.liveLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-1.5 font-semibold text-(--primary_blue) hover:underline"
                                >
                                    <span>Visit Live Site</span>
                                    <LuExternalLink className="size-3.5" />
                                </a>
                            </MagneticElement>
                        ) : (
                            <span className="text-black/50 block">N/A</span>
                        )}
                    </div>
                </div>

                <div className="py-12 md:py-16">
                    {renderMedia()}
                </div>

                {/* Story Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-8 border-t border-black/10">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-7 space-y-16">
                        {/* <div>
                            {renderMedia()}
                        </div> */}
                        {data.details_description && (
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">Overview</h3>
                                <p className="text-lg leading-relaxed text-(--primary_black)/80 font-light">
                                    {data.details_description}
                                </p>
                            </div>
                        )}

                        {data.problem_statement && (
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">The Problem</h3>
                                <p className="text-base leading-relaxed text-(--primary_black)/70">
                                    {data.problem_statement}
                                </p>
                            </div>
                        )}

                        {data.what_it_solves && (
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">The Solution</h3>
                                <p className="text-base leading-relaxed text-(--primary_black)/70">
                                    {data.what_it_solves}
                                </p>
                            </div>
                        )}

                        {data.objectives && data.objectives.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">Key Objectives</h3>
                                <ul className="space-y-4">
                                    {data.objectives.map((obj, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="text-xs font-semibold text-(--primary_blue) mt-1.5">0{index + 1}.</span>
                                            <p className="text-base text-(--primary_black)/70 m-0 leading-relaxed">{obj}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {data.research_discovery && data.research_discovery.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">Research & Discovery</h3>
                                <ul className="space-y-4">
                                    {data.research_discovery.map((rd, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FaCheckCircle className="size-5 text-(--primary_blue) shrink-0 mt-0.5" />
                                            <p className="text-base text-(--primary_black)/70 m-0 leading-relaxed">{rd}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {data.design_process && data.design_process.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">Design Process</h3>
                                <ul className="space-y-4">
                                    {data.design_process.map((dp, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="text-xs font-semibold text-black/30 mt-1.5">STEP {index + 1}</span>
                                            <p className="text-base text-(--primary_black)/70 m-0 leading-relaxed">{dp}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Tech & Architecture & Impact */}
                    <div className="lg:col-span-5 space-y-16">
                        {/* Tech Stack & Architecture */}
                        <div className="bg-black/2 border border-black/5 rounded-2xl p-6 md:p-8 space-y-6">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {data.tech.map((t, idx) => (
                                        <div key={idx} className="flex items-center gap-2 bg-white border border-black/5 rounded-full px-3 py-1.5 shadow-2xs">
                                            <Icon name={t} className="size-4 text-(--primary_black)" />
                                            <span className="text-xs font-medium text-(--primary_black) capitalize">{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {data.technical_architecture && Object.keys(data.technical_architecture).length > 0 && (
                                <div className="border-t border-black/10 pt-6 space-y-4">
                                    <h4 className="text-xs uppercase tracking-widest text-black/40 font-bold">Architecture</h4>
                                    <div className="space-y-4">
                                        {Object.entries(data.technical_architecture).map(([key, val]) => (
                                            <div key={key} className="text-sm">
                                                <span className="font-semibold text-(--primary_black) uppercase block mb-1 text-[11px] tracking-wider">{key}</span>
                                                <span className="text-black/60 block leading-relaxed">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Challenges & Solutions */}
                        {data.development_challenges && data.development_challenges.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">Challenges & Solutions</h3>
                                <div className="space-y-6">
                                    {data.development_challenges.map((item, index) => (
                                        <div key={index} className="border-l-2 border-(--primary_blue) pl-4 space-y-2">
                                            <p className="text-sm font-semibold text-(--primary_black) m-0 leading-tight">{item.challenge}</p>
                                            <p className="text-xs text-black/60 m-0 leading-relaxed">{item.solution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Results & Impact */}
                        {data.results_impact && (
                            <div className="space-y-6">
                                <h3 className="text-xs uppercase tracking-widest text-(--primary_blue) font-semibold">Results & Impact</h3>
                                
                                {data.results_impact.quantitative && data.results_impact.quantitative.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {data.results_impact.quantitative.map((stat, idx) => {
                                            const parts = stat.split(':')
                                            if (parts.length > 1) {
                                                return (
                                                    <div key={idx} className="bg-white border border-black/5 p-4 rounded-xl shadow-2xs">
                                                        <span className="block text-2xl font-bold text-(--primary_blue) tracking-tight mb-1">{parts[1].trim()}</span>
                                                        <span className="block text-[9px] text-black/45 leading-tight uppercase font-bold tracking-wider">{parts[0].trim()}</span>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div key={idx} className="bg-white border border-black/5 p-4 rounded-xl shadow-2xs col-span-2">
                                                    <span className="block text-xs text-black/60 leading-normal">{stat}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {data.results_impact.qualitative && data.results_impact.qualitative.length > 0 && (
                                    <div className="border-t border-black/5 pt-4">
                                        <h4 className="text-[10px] uppercase tracking-wider text-black/40 font-bold mb-3">Key Takeaways</h4>
                                        <ul className="space-y-2">
                                            {data.results_impact.qualitative.map((qual, idx) => (
                                                <li key={idx} className="text-xs text-black/65 flex items-start gap-2">
                                                    <span className="text-(--primary_blue)">•</span>
                                                    <span>{qual}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation (Next & Prev Cards) */}
                <div className="border-t border-black/10 mt-24 pt-16 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:divide-x md:divide-black/10">
                        {/* Prev Project */}
                        <div className="md:pr-12">
                            <MagneticElement strength={0.1}>
                                <Link 
                                    to={`/project/${prevProject.id}`} 
                                    className="group flex flex-col items-start text-left transition-all duration-300"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-3 flex items-center gap-2">
                                        <LuArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                                        Previous Project
                                    </span>
                                    <h4 className="font-[vogluxe] text-3xl md:text-4xl text-(--primary_black) group-hover:text-(--primary_blue) transition-colors duration-300">
                                        {prevProject.title}
                                    </h4>
                                    <p className="text-sm text-black/50 mt-2 max-w-md line-clamp-2 leading-relaxed">
                                        {prevProject.desc}
                                    </p>
                                </Link>
                            </MagneticElement>
                        </div>

                        {/* Next Project */}
                        <div className="md:pl-12 md:text-right">
                            <MagneticElement strength={0.1}>
                                <Link 
                                    to={`/project/${nextProject.id}`} 
                                    className="group flex flex-col items-start md:items-end text-left md:text-right transition-all duration-300"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-3 flex items-center gap-2 md:flex-row-reverse">
                                        <LuArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                        Next Project
                                    </span>
                                    <h4 className="font-[vogluxe] text-3xl md:text-4xl text-(--primary_black) group-hover:text-(--primary_blue) transition-colors duration-300">
                                        {nextProject.title}
                                    </h4>
                                    <p className="text-sm text-black/50 mt-2 max-w-md line-clamp-2 leading-relaxed md:ml-auto">
                                        {nextProject.desc}
                                    </p>
                                </Link>
                            </MagneticElement>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}