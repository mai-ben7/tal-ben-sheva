'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const socialLinks = [
    {
      platform: 'instagram',
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/talbensheva',
      icon: 'fab fa-instagram'
    },
    {
      platform: 'tiktok',
      url: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@talbensheva',
      icon: 'fab fa-tiktok'
    },
    {
      platform: 'youtube',
      url: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@talbensheva',
      icon: 'fab fa-youtube'
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>טל בן שבע</h3>
            <p>שחקנית מקצועית | בוגרת בית צבי</p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={mounted ? { scale: 1.1, y: -3 } : {}}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Talbensheva@gmail.com'}`}
              className="footer-link"
            >
              <i className="fas fa-envelope"></i>
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Talbensheva@gmail.com'}
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; 2024 מאי בן שבע. כל הזכויות שמורות. |{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              האתר שלי
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 