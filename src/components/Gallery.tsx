'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // All gallery images including the new ones, shuffled
  const galleryImages = [
    { id: 1, src: '/pictures/downloadgram.org_491434446_18501168475009447_1493011779868230088_n.jpg', alt: 'טל בן שבע - תמונה 1' },
    { id: 2, src: '/pictures/downloadgram.org_491439042_18501168466009447_5320768253713339384_n.jpg', alt: 'טל בן שבע - תמונה 2' },
    { id: 3, src: '/pictures/downloadgram.org_490490090_18501168457009447_3419116011539670807_n.jpg', alt: 'טל בן שבע - תמונה 3' },
    { id: 4, src: '/pictures/downloadgram.org_491439782_18501168448009447_9075142343546875635_n.jpg', alt: 'טל בן שבע - תמונה 4' },
    { id: 5, src: '/pictures/downloadgram.org_490117213_18499787509009447_8118630689549531511_n.jpg', alt: 'טל בן שבע - תמונה 5' },
    { id: 6, src: '/pictures/downloadgram.org_490324044_18499787551009447_1244171286191995865_n.jpg', alt: 'טל בן שבע - תמונה 6' },
    { id: 7, src: '/pictures/downloadgram.org_490215812_18499787527009447_5823448968552371307_n.jpg', alt: 'טל בן שבע - תמונה 7' },
    { id: 8, src: '/pictures/IMG_4402.jpeg', alt: 'טל בן שבע - תמונה 8' },
    { id: 9, src: '/pictures/IMG_4417.jpeg', alt: 'טל בן שבע - תמונה 9' },
    { id: 10, src: '/pictures/IMG_4431.jpeg', alt: 'טל בן שבע - תמונה 10' },
    { id: 11, src: '/pictures/IMG_4425.jpeg', alt: 'טל בן שבע - תמונה 11' },
    { id: 12, src: '/pictures/IMG_4123.jpeg', alt: 'טל בן שבע - תמונה 12' },
    { id: 13, src: '/pictures/IMG_3648.jpeg', alt: 'טל בן שבע - תמונה 13' },
    { id: 14, src: '/pictures/IMG_4397.jpeg', alt: 'טל בן שבע - תמונה 14' },
    { id: 15, src: '/pictures/IMG_4064.jpeg', alt: 'טל בן שבע - תמונה 15' },
    { id: 16, src: '/pictures/IMG_4426.jpeg', alt: 'טל בן שבע - תמונה 16' },
    { id: 17, src: '/pictures/IMG_4327.jpeg', alt: 'טל בן שבע - תמונה 17' },
    { id: 18, src: '/pictures/IMG_4094.jpeg', alt: 'טל בן שבע - תמונה 18' },
    { id: 19, src: '/pictures/IMG_4432.jpeg', alt: 'טל בן שבע - תמונה 19' }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, galleryImages.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            גלריה
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            תמונות מקצועיות של טל בן שבע
          </motion.p>
        </div>
        
        <div className="gallery-carousel">
          <div className="carousel-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="carousel-slide"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image 
                  src={galleryImages[currentIndex].src} 
                  alt={galleryImages[currentIndex].alt}
                  width={800}
                  height={600}
                  priority
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <button 
              className="carousel-btn carousel-btn-next"
              onClick={nextSlide}
              aria-label="תמונה הבאה"
              disabled={!mounted}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Play/Pause button */}
            <button 
              className="carousel-btn carousel-btn-play"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "עצור" : "הפעל"}
              disabled={!mounted}
            >
              {isAutoPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>
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