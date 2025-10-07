'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotionOrSmall } from '../hooks/useReducedMotionOrSmall'

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotionOrSmall()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Disable animations if reduced motion is preferred
  const animationProps = reduceMotion ? {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 1, scale: 1 },
    transition: { duration: 0 }
  } : {}

  const galleryImages = [
    { id: 1, src: '/pictures/IMG_3648.jpeg', alt: 'טל בן שבע - תמונה מקצועית 1' },
    { id: 2, src: '/pictures/IMG_4064.jpeg', alt: 'טל בן שבע - תמונה מקצועית 2' },
    { id: 3, src: '/pictures/IMG_4094.jpeg', alt: 'טל בן שבע - תמונה מקצועית 3' },
    { id: 4, src: '/pictures/IMG_4123.jpeg', alt: 'טל בן שבע - תמונה מקצועית 4' },
    { id: 5, src: '/pictures/IMG_4327.jpeg', alt: 'טל בן שבע - תמונה מקצועית 5' },
    { id: 6, src: '/pictures/IMG_4397.jpeg', alt: 'טל בן שבע - תמונה מקצועית 6' },
    { id: 7, src: '/pictures/IMG_4402.jpeg', alt: 'טל בן שבע - תמונה מקצועית 7' },
    { id: 8, src: '/pictures/IMG_4417.jpeg', alt: 'טל בן שבע - תמונה מקצועית 8' },
    { id: 9, src: '/pictures/IMG_4425.jpeg', alt: 'טל בן שבע - תמונה מקצועית 9' },
    { id: 10, src: '/pictures/IMG_4426.jpeg', alt: 'טל בן שבע - תמונה מקצועית 10' },
    { id: 11, src: '/pictures/IMG_4431.jpeg', alt: 'טל בן שבע - תמונה מקצועית 11' },
    { id: 12, src: '/pictures/IMG_4432.jpeg', alt: 'טל בן שבע - תמונה מקצועית 12' },
  ]

  useEffect(() => {
    if (!mounted || !isAutoPlaying || reduceMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [mounted, isAutoPlaying, galleryImages.length, reduceMotion])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            גלריה
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0, delay: 0.2 } : { duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            תמונות מקצועיות של טל בן שבע
          </motion.p>
        </div>
        
        <div className="gallery-carousel scroll-y-hidden">
          <div 
            className="carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="carousel-slide"
                {...animationProps}
                initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
              >
                <Image 
                  src={galleryImages[currentIndex].src} 
                  alt={galleryImages[currentIndex].alt}
                  width={800}
                  height={600}
                  priority
                  sizes="(min-width: 1024px) 800px, (min-width: 768px) 600px, 400px"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button 
              className="carousel-btn carousel-btn-prev"
              onClick={prevSlide}
              aria-label="תמונה קודמת"
              disabled={!mounted}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <button 
              className="carousel-btn carousel-btn-next"
              onClick={nextSlide}
              aria-label="תמונה הבאה"
              disabled={!mounted}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Play/Pause button - only show if not reduced motion */}
            {!reduceMotion && (
              <button 
                className="carousel-btn carousel-btn-play"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-label={isAutoPlaying ? "עצור" : "הפעל"}
                disabled={!mounted}
              >
                {isAutoPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Thumbnail navigation */}
          <div className="carousel-thumbnails">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                className={`thumbnail-btn ${mounted && index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`עבור לתמונה ${index + 1}`}
                disabled={!mounted}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  width={100}
                  height={75}
                  loading="lazy"
                  sizes="(min-width: 768px) 80px, 50px"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Slide counter */}
          <div className="carousel-counter">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{galleryImages.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
} 