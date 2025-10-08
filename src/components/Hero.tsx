'use client'

import { motion } from 'framer-motion'
import { useReducedMotionOrSmall } from '../hooks/useReducedMotionOrSmall'

export default function Hero() {
  const reduceMotion = useReducedMotionOrSmall()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: reduceMotion ? 'auto' : 'smooth'
      })
    }
  }

  // Disable animations if reduced motion is preferred
  const animationProps = reduceMotion ? {
    initial: { opacity: 1, y: 0, scale: 1 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0 }
  } : {}

  return (
    <section id="home" className="hero body--no-scroll">
      <div className="hero-split overflow-y-hidden">
        {/* Left Side - Content */}
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            טל בן שבע
            <span className="star-animation">⭐</span>
          </motion.h1>
          
          <motion.p 
            className="hero-tagline"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            שחקנית | זמרת | רקדנית
          </motion.p>
          
          <motion.p 
            className="hero-subtitle"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            מוכשרת, מקצועית ומוכנה לעבודה
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <a 
              href="#showreel" 
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); scrollToSection('showreel') }}
              aria-label="צפה בדמו של טל בן שבע"
            >
              <i className="fas fa-play" aria-hidden="true"></i>
              צפה בדמו
            </a>
            <a 
              href="#contact" 
              className="btn btn-secondary"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
              aria-label="צור קשר עם טל בן שבע"
            >
              <i className="fas fa-phone" aria-hidden="true"></i>
              צור קשר עכשיו
            </a>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="stat-item">
              <span className="stat-number">בוגרת</span>
              <span className="stat-label">בית צבי</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">מוכשרת</span>
              <span className="stat-label">במשחק</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">זמינה</span>
              <span className="stat-label">לעבודה</span>
            </div>
          </motion.div>
        </div>
        
        {/* Right Side - Tal's Portrait */}
        <div className="hero-portrait ">
          <div className="portrait-container">
            <motion.img 
              src="/pictures/tal-portrait.png" 
              alt="טל בן שבע - תמונת דיוקן מקצועית" 
              className="portrait-image"
              {...animationProps}
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            />
            <div className="portrait-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 