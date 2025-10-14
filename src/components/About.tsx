'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotionOrSmall } from '../hooks/useReducedMotionOrSmall'

export default function About() {
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotionOrSmall()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Disable animations if reduced motion is preferred
  const animationProps = reduceMotion ? {
    initial: { opacity: 1, y: 0, x: 0 },
    whileInView: { opacity: 1, y: 0, x: 0 },
    transition: { duration: 0 }
  } : {}

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={mounted && !reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            אודותיי
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={mounted && !reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            שחקנית מקצועית עם תשוקה לאמנות
          </motion.p>
        </div>
        
        <div className="about-content">
          <motion.div 
            className="about-text"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            whileInView={mounted && !reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="about-intro">
              אני טל בן שבע, שחקנית נלהבת שסיימה לאחרונה את בית צבי - בית הספר לאמנויות הבמה 
              עם תואר בן 3 שנים במשחק. מבוססת בישראל, אני פתוחה להזדמנויות בינלאומיות ומתרגשת 
              להביא את החזון האמנותי שלי לקהלים גלובליים.
            </p>
            
            <div className="about-details">
              <div className="about-item">
                <h3>השכלה</h3>
                <p>בית צבי - בית הספר לאמנויות הבמה - תואר במשחק בן 3 שנים</p>
              </div>
              <div className="about-item">
                <h3>חוזקות אמנותיות</h3>
                <p>תיאטרון מוזיקלי, דרמה עכשווית, משחק קלאסי, הופעת ריקוד</p>
              </div>
              <div className="about-item">
                <h3>סגנון הופעה</h3>
                <p>
                  אני מאמינה ביצירת הופעות אותנטיות ומרגשות שמתחברות 
                  עמוקות עם הקהל. ההכשרה שלי ציידה אותי בטכניקות קלאסיות 
                  וגישות עכשוויות למשחק.
                </p>
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="resume-section">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary resume-btn"
              >
                <i className="fas fa-download" aria-hidden="true"></i>
                הורד קורות חיים
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-image"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            whileInView={mounted && !reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/pictures/tal-portrait.png" 
              alt="טל בן שבע - תמונת מקצועית"
              width={400}
              height={500}
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 350px, 300px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 