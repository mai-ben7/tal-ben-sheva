'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-split">
        {/* Left Side - Content */}
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            טל בן שבע
            <span className="star-animation">⭐</span>
          </motion.h1>
          
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            שחקנית | זמרת | רקדנית
          </motion.p>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            מוכשרת, מקצועית ומוכנה לעבודה
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <a 
              href="#showreel" 
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); scrollToSection('showreel') }}
            >
              <i className="fas fa-play"></i>
              צפה בדמו
            </a>
            <a 
              href="#contact" 
              className="btn btn-secondary"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
            >
              <i className="fas fa-phone"></i>
              צור קשר עכשיו
            </a>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
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
        <div className="hero-portrait">
          <div className="portrait-container">
            <motion.img 
              src="/pictures/tal-portrait.png" 
              alt="טל בן שבע" 
              className="portrait-image"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            />
            <div className="portrait-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 