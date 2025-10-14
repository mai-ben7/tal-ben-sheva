'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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
    <section id="home" className="hero">
      <div className="hero-split">
        {/* Text Section */}
        <div className="hero-text">
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
            שחקנית | רקדנית | זמרת
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
        </div>
        
        {/* Portrait Section */}
        <div className="hero-portrait">
          <div className="portrait-container">
            <motion.div
              {...animationProps}
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image 
                src="/pictures/tal-portrait.png" 
                alt="טל בן שבע - תמונת דיוקן מקצועית"
                width={600}
                height={900}
                priority
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 400px, 300px"
                className="portrait-image"
              />
            </motion.div>
            <div className="portrait-overlay"></div>
          </div>
        </div>
        
        {/* Actions Section (Buttons & Stats) */}
        <div className="hero-actions">
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
              צפה בשואוריל
            </a>
            <a 
              href="#contact" 
              className="btn btn-secondary"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
              aria-label="צור קשר עם טל בן שבע"
            >
              <i className="fas fa-envelope" aria-hidden="true"></i>
              ליצירת קשר
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
          
          </motion.div>
        </div>
      </div>
    </section>
  )
} 