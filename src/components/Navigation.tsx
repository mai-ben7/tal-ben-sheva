'use client'

import { useState, useEffect } from 'react'
import { useReducedMotionOrSmall } from '../hooks/useReducedMotionOrSmall'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotionOrSmall()

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
        behavior: reduceMotion ? 'auto' : 'smooth'
      })
    }
    setIsMenuOpen(false) // Close mobile menu
  }

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav className={`navbar ${mounted && isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
            aria-label="חזרה לדף הבית"
          >
            טל בן שבע ⭐
          </a>
        </div>
        
        <ul className={`nav-menu ${mounted && isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>בית</a></li>
          <li><a href="#showreel" onClick={(e) => { e.preventDefault(); scrollToSection('showreel') }}>דמו</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>אודות</a></li>
          <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio') }}>תיק עבודות</a></li>
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery') }}>גלריה</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>צור קשר</a></li>
        </ul>
        
        <button 
          className={`hamburger ${mounted && isMenuOpen ? 'active' : ''}`}
          onClick={() => mounted && setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
} 