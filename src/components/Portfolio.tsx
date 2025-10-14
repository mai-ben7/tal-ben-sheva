'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import VideoModal from './VideoModal'

interface PortfolioProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export default function Portfolio({ activeTab = 'acting', setActiveTab }: PortfolioProps) {
  const [mounted, setMounted] = useState(false)
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

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const portfolioData = {
    acting: [
      {
        id: 1,
        title: 'הופעה מקצועית - טל בן שבע',
        description: 'הופעה מקצועית המציגה את הטווח הדרמטי והקולי של טל. ביצועים מרשימים המדגימים עומק רגשי וטכניקה מקצועית.',
        video: '/videos/tal1.mp4',
        poster: '/pictures/IMG_4417.webp',
        tags: ['משחק', 'תפקיד ראשי', 'דרמה'],
        featured: true,
        badge: 'תפקיד ראשי'
      },
      {
        id: 2,
        title: 'הופעה מוזיקלית קלאסית',
        description: 'ביצוע מוזיקלי מרגש של הדמות הקלאסית אופליה. הופעה מוזיקלית המדגישה פגיעות רגשית וחוזק קולי מעורר השראה.',
        video: '/videos/tal2.mp4',
        poster: '/pictures/IMG_4431.webp',
        tags: ['מוזיקלי', 'קלאסי']
      },
      {
        id: 3,
        title: 'Much Ado About Nothing - ביאטריס',
        description: 'הופעה מוזיקלית קומית של הדמות הנונה ביאטריס. ביצוע מוזיקלי מעולה המדגיש תזמון קומי ואינטליגנציה קולית.',
        video: '/videos/tal3.mp4',
        poster: '/pictures/IMG_4425.webp',
        tags: ['מוזיקלי', 'קומדיה']
      }
    ],
    singing: [
      {
        id: 4,
        title: 'שירה מקצועית - טל בן שבע',
        description: 'הופעה מוזיקלית מרשימה המציגה את הטווח הקולי והמקצועיות של טל. ביצועים קוליים מעולים עם נוכחות בימתית.',
        video: '/videos/tal3.mp4',
        poster: '/pictures/IMG_4123.jpeg',
        tags: ['שירה', 'מוזיקלי', 'הופעה'],
        featured: true,
        badge: 'הופעה מוזיקלית'
      },
      {
        id: 5,
        title: '"On My Own" - Les Misérables',
        description: 'ביצוע סולו אינטימי ומרגש המדגים שליטה קולית ועומק רגשי. הופעה מוזיקלית מעוררת השראה.',
        video: '/videos/tal2.mp4',
        poster: '/pictures/IMG_4397.jpeg',
        tags: ['סולו', 'מוזיקל']
      }
    ],
    dance: [
      {
        id: 6,
        title: 'ריקוד מקצועי - טל בן שבע',
        description: 'הופעת ריקוד מקצועית מרשימה המציגה תנועה זורמת וטכניקה מדויקת. ביצועים אנרגטיים עם שליטה מלאה בגוף.',
        video: '/videos/tal2.mp4',
        poster: '/pictures/IMG_4397.jpeg',
        tags: ['ריקוד', 'כוריאוגרפיה', 'הופעה'],
        featured: true,
        badge: 'כוריאוגרפיה'
      },
      {
        id: 7,
        title: 'הופעת ג\'אז קבוצתית',
        description: 'הופעה קבוצתית אנרגטית ומרשימה המציגה קצב ותיאום מושלם. ביצועים דינמיים עם אנרגיה מדבקת.',
        video: '/videos/tal1.mp4',
        poster: '/pictures/IMG_4402.jpeg',
        tags: ['ג\'אז', 'קבוצתי']
      }
    ]
  }

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
        
        <div className="portfolio-tabs">
          <button 
            className={`tab-btn ${mounted && activeTab === 'acting' ? 'active' : ''}`}
            onClick={() => setActiveTab?.('acting')}
            disabled={!mounted}
          >
            <i className="fas fa-theater-masks"></i>
            <span>משחק</span>
          </button>
          <button 
            className={`tab-btn ${mounted && activeTab === 'dance' ? 'active' : ''}`}
            onClick={() => setActiveTab?.('dance')}
            disabled={!mounted}
          >
            <i className="fas fa-sparkles"></i>
            <span>ריקוד</span>
          </button>
          <button 
            className={`tab-btn ${mounted && activeTab === 'singing' ? 'active' : ''}`}
            onClick={() => setActiveTab?.('singing')}
            disabled={!mounted}
          >
            <i className="fas fa-music"></i>
            <span>שירה</span>
          </button>
        </div>
        
        <motion.div 
          className="portfolio-content active"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="portfolio-grid">
            {portfolioData[activeTab as keyof typeof portfolioData].map((item, index) => (
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