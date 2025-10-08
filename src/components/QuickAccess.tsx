'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function QuickAccess() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (!mounted) return
    
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const quickItems = [
    {
      icon: 'fas fa-video',
      text: 'דמו מקצועי',
      href: '#showreel'
    },
    {
      icon: 'fas fa-theater-masks',
      text: 'תיק עבודות',
      href: '#portfolio'
    },
    {
      icon: 'fas fa-envelope',
      text: 'צור קשר',
      href: '#contact'
    }
  ]

  return (
    <section className="quick-access">
      <div className="container">
        <div className="quick-grid">
          {quickItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="quick-item"
              onClick={(e) => {
                if (mounted && item.href.startsWith('#')) {
                  e.preventDefault()
                  scrollToSection(item.href.substring(1))
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              whileHover={mounted ? { y: -5 } : {}}
            >
              <i className={item.icon}></i>
              <span>{item.text}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 