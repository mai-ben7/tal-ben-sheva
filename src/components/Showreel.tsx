'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Showreel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="showreel" className="showreel">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            דמו מקצועי
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            הצגת הטווח המקצועי שלי - דרמה, קומדיה, מוזיקל וטלוויזיה
          </motion.p>
        </div>
        
        <div className="showreel-content">
          <motion.div 
            className="showreel-video"
            initial={{ opacity: 0, x: -50 }}
            whileInView={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <video 
              controls 
              poster="/pictures/IMG_4402.jpeg"
              title="טל בן שבע - דמו מקצועי"
              className="showreel-video-player"
            >
              <source src="/videos/vid1.mp4" type="video/mp4" />
              הדפדפן שלך לא תומך באלמנט הוידאו.
            </video>
          </motion.div>
          
          <motion.div 
            className="showreel-info"
            initial={{ opacity: 0, x: 50 }}
            whileInView={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>טל בן שבע - דמו משחק</h3>
            <p>
              אוסף מהביצועים הטובים ביותר שלי המציג את הטווח שלי בדרמה, קומדיה, תיאטרון מוזיקלי ומשחק למסך. 
              משייקספיר קלאסי ועד יצירות עכשוויות, הדמו הזה מדגים את הגמישות והמחויבות שלי לסיפור אותנטי.
            </p>
            
            <div className="showreel-highlights">
              <div className="highlight-item">
                <i className="fas fa-theater-masks"></i>
                <span>תיאטרון קלאסי ועכשווי</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-music"></i>
                <span>תיאטרון מוזיקלי</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-video"></i>
                <span>משחק למסך</span>
              </div>
            </div>
            
            <div className="showreel-cta">
              <a href="#contact" className="btn btn-primary">
                הזמן לאודישן
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 