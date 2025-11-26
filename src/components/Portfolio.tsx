'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import VideoModal from './VideoModal'

export default function Portfolio() {
  const [modalVideo, setModalVideo] = useState<{
    isOpen: boolean
    videoSrc: string
    title: string
    poster?: string
  }>({
    isOpen: false,
    videoSrc: '',
    title: '',
    poster: ''
  })

  const openVideoModal = (videoSrc: string, title: string, poster?: string) => {
    setModalVideo({
      isOpen: true,
      videoSrc,
      title,
      poster
    })
  }

  const closeVideoModal = () => {
    setModalVideo({
      isOpen: false,
      videoSrc: '',
      title: '',
      poster: ''
    })
  }

  const allVideos = [
    {
      id: 1,
      title: 'הופעה מקצועית - טל בן שבע',
      description: 'הופעה מקצועית המציגה את הטווח הדרמטי והקולי של טל. ביצועים מרשימים המדגימים עומק רגשי וטכניקה מקצועית.',
      video: '/videos/tal1.mp4',
      poster: '/pictures/IMG_4417.webp',
      tags: ['משחק', 'תפקיד ראשי', 'דרמה'],
      featured: true,
      badge: 'תפקיד ראשי'
    }
  ]

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            תיק עבודות
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            אוסף מהביצועים הטובים ביותר שלי במשחק, שירה וריקוד
          </motion.p>
        </div>
        
        {/* Temporarily hiding category tabs until more videos are available */}
        <motion.div 
          className="portfolio-content active"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="portfolio-grid">
            {allVideos.map((item, index) => (
              <motion.div
                key={item.id}
                className={`portfolio-item ${item.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div 
                  className="portfolio-video"
                  onClick={() => openVideoModal(item.video, item.title, item.poster)}
                  style={{ cursor: 'pointer' }}
                >
                  <video 
                    poster={item.poster}
                    title={item.title}
                    className="portfolio-video-player"
                    style={{ pointerEvents: 'none' }}
                  >
                    <source src={item.video} type="video/mp4" />
                    הדפדפן שלך לא תומך באלמנט הוידאו.
                  </video>
                  <div className="portfolio-video-overlay">
                    <div className="play-button">
                      <i className="fas fa-play"></i>
                    </div>
                    <p>לחץ לצפייה</p>
                  </div>
                </div>
                
                <div className="portfolio-info">
                  {item.badge && (
                    <div className="portfolio-badge">{item.badge}</div>
                  )}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="portfolio-tags">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={closeVideoModal}
        videoSrc={modalVideo.videoSrc}
        title={modalVideo.title}
        poster={modalVideo.poster}
      />
    </section>
  )
} 