'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted])

  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    if (!mounted) return
    
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false) // Close mobile menu
  }

  return (
    <nav className={`navbar ${mounted && isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
            טל בן שבע
          </a>
        </div>
        
        <ul className={`nav-menu ${mounted && isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>בית</a></li>
          <li><a href="#showreel" onClick={(e) => { e.preventDefault(); scrollToSection('showreel') }}>דמו</a></li>
          <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio') }}>תיק עבודות</a></li>
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery') }}>גלריה</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>אודות</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>צור קשר</a></li>
        </ul>
        
        <div 
          className={`hamburger ${mounted && isMenuOpen ? 'active' : ''}`}
          onClick={() => mounted && setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
} 