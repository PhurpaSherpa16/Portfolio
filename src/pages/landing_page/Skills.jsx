import React, { useState, useEffect, useRef } from 'react'
import { 
  motion as Motion, 
  useScroll, 
  useVelocity, 
  useSpring, 
  useTransform, 
  useAnimationFrame, 
  useMotionValue, 
  useInView,
  AnimatePresence
} from 'framer-motion'
import Header from '../../components/header'
import Icon from '../../utils/Icon'
import Tag from '../../components/tag'
import { StaggerText } from '../../utils/Animation'


const data = {
    taglabel: 'Skills',
    title: 'Behind the Experience',
    supporting: 'A blend of modern development, design, and animation tools used to create engaging, performant, and thoughtfully crafted digital experiences.',
    skills: [
        { label: "React", icon: 'react' },
        { label: 'PostgreSQL', icon: 'postgreSQL' },
        { label: "TailwindCSS", icon: 'tailwindcss' },
        { label: 'Supabase', icon: 'supabase' },
        { label: "Framer", icon: 'framer' },
        { label: "Node", icon: 'node' },
        { label: "Figma", icon: 'figma' },
    ]
}

const skillConfig = {
  react: { color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.15)', border: 'rgba(97, 218, 251, 0.3)', textColor: 'text-sky-400' },
  tailwindcss: { color: '#151226', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)', textColor: 'text-cyan-400' },
  framer: { color: '#0055FF', bg: 'rgba(0, 85, 255, 0.15)', border: 'rgba(0, 85, 255, 0.3)', textColor: 'text-indigo-400' },
  node: { color: '#339933', bg: 'rgba(51, 153, 51, 0.15)', border: 'rgba(51, 153, 51, 0.3)', textColor: 'text-emerald-400' },
  figma: { color: '#F24E1E', bg: 'rgba(242, 78, 30, 0.15)', border: 'rgba(242, 78, 30, 0.3)', textColor: 'text-orange-400' },
  supabase: { color: '#3ECF8E', bg: 'rgba(62, 207, 142, 0.15)', border: 'rgba(62, 207, 142, 0.3)', textColor: 'text-green-400' },
  postgreSQL: { color: '#0064a4', bg: 'rgba(0, 100, 164, 0.15)', border: 'rgba(85, 33, 191, 0.3)', textColor: '#5521bf' },
}

function SkillNode({ skill }) {
  const [hovered, setHovered] = useState(false);
  const config = skillConfig[skill.icon] || { color: '#fff', bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', textColor: 'text-(--primary_blue)' };

  return (
    <Motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.15, y: -2 }}
      className="w-full h-full relative flex items-center justify-center rounded-full shadow-lg transition-shadow duration-300"
      style={{
        background: `radial-gradient(circle at center, ${config.bg} 0%, rgba(15, 23, 42, 0.05) 100%)`,
        border: `1px solid ${config.border}`,
        boxShadow: hovered ? `0 0 25px ${config.color}60, inset 0 0 10px ${config.color}30` : `0 4px 12px rgba(0,0,0,0.1)`
      }}
    >
      <Icon name={skill.icon} className={`size-8 md:size-9 ${config.textColor}`} />
      
      <AnimatePresence>
        {hovered && (
          <Motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 z-20 bg-slate-900/95 border border-white/10 text-white text-[11px] font-medium py-1.5 px-3 rounded-full shadow-2xl pointer-events-none whitespace-nowrap">
            {skill.label}
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
}

function SpinningSkillsCircle() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const [radius, setRadius] = useState(180);
  const [nodeSize, setNodeSize] = useState(90);
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 640) {
        setRadius(140);
        setNodeSize(90);
      } else if (window.innerWidth < 768) {
        setRadius(165);
        setNodeSize(80);
      } else {
        setRadius(215);
        setNodeSize(90);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Delay rotation until all icons finish their fly-in entry stagger animations
  useEffect(() => {
    let timer;
    if (isInView) {
      timer = setTimeout(() => {
        setCanRotate(true);
      }, 2700);
    } else {
      timer = setTimeout(() => {
        setCanRotate(false);
      }, 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInView]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 300 });

  const rotation = useMotionValue(0);

  useAnimationFrame((time, delta) => {
    if (!isInView || !canRotate) return;
    
    // Base speed: 18 degrees per second
    let speed = 18;
    
    // Add velocity component (from scroll velocity)
    const vel = Math.abs(smoothVelocity.get());
    speed += vel * 0.04;
    
    // Clamp speed to avoid excessive/glitched rotations
    const maxSpeed = 360; 
    const currentSpeed = Math.min(speed, maxSpeed);
    
    const rotationStep = currentSpeed * (delta / 1000);
    rotation.set(rotation.get() + rotationStep);
  });

  const counterRotation = useTransform(rotation, (val) => -val);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] select-none">
      {/* Central decorative core */}
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm z-10">
        <div className="text-center select-none relative z-10">
          <span className="text-xs md:text-sm uppercase tracking-widest text-white font-bold block">Core</span>
          <span className="text-xs md:text-sm font-extrabold text-white">Stack</span>
        </div>
        <Motion.div className="absolute size-30 bg-violet-400 rounded-full z-0 filter blur-lg "
        initial={{
            scale: 0.6,
        }}
        animate={{
            scale: 1,
        }}
        transition={{
            duration: 3,
            ease: 'easeIn',
        }}/>
        {[0, 1, 2, 3].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute inset-0 rounded-full bg-(--primary_blue) 
            border border-white/60 pointer-events-none"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 2.2],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4.0,
              repeat: Infinity,
              ease: 'easeOut',
              repeatType: 'loop',
              delay: i * 1.0,
            }}
          />
        ))}
      </div>

      {/* Rotating orbit */}
      <Motion.div style={{ rotate: rotation }}
        className="w-full h-full relative flex items-center justify-center">
        {data.skills.map((skill, index) => {
          const angle = (index / data.skills.length) * 2 * Math.PI;
          // Destination coordinates in orbit
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <Motion.div
              key={index}
              className="absolute select-none"
              style={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
                left: '50%',
                top: '50%',
                marginLeft: `-${nodeSize / 2}px`,
                marginTop: `-${nodeSize / 2}px`,
                rotate: counterRotation
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={isInView ? { 
                x: [0, 0, x], 
                y: [0, -radius, y], 
                opacity: [0, 1, 1] 
              } : { 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              transition={{ duration: 1.5,
                times: [0, 0.4, 1],
                delay: index * 0.2,
                ease: "easeInOut"
              }}>
              <SkillNode skill={skill} />
            </Motion.div>
          );
        })}
      </Motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className='overflow-hidden bg-(--primary_blue)/5 py-24 h-fit flex items-center justify-center' id='skill'>
        <div className='mainDiv flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8'>
            <div className='w-full lg:w-1/2 flex items-center justify-center min-h-[350px] sm:min-h-[400px] py-10 md:min-h-[500px]'>
                <SpinningSkillsCircle />
            </div>
            <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                <Motion.div
                  initial={{opacity:0, translateY:50}}
                  whileInView={{opacity:1, translateY:0}}
                  transition={{duration:1, delay:0.3, ease:"easeOut"}}
                  viewport={{once: true, amount:0.3}}
                  className='space-y-12 lg:space-y-16'>
                      <div className='flex items-center justify-center md:justify-normal'>
                          <Tag label={data.taglabel} className={'bg-(--primary_blue)/10 text-(--primary_blue)'}/>
                      </div>
              
                      <div>
                          <h1 className={`text-center!! md:text-left text-(--primary_blue) 
                            flex items-center justify-center flex-col md:items-start`}>
                            <StaggerText text={'Behind the'} className={'heroText'}/>
                            <StaggerText text={'Experience'} className={'heroText'}/>
                          </h1>
                          <p className={`text-center md:text-left text-(--primary_blue)/60 w-full`}>{data.supporting}</p>
                      </div>
                  </Motion.div>
            </div>
        </div>
    </div>
  )
}


