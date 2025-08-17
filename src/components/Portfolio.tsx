'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('acting')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const portfolioData = {
    acting: [
      {
        id: 1,
        title: 'הופעה מקצועית - טל בן שבע',
        description: 'הופעה מקצועית המציגה את הטווח הדרמטי והקולי של טל.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_4417.jpeg',
        tags: ['משחק', 'תפקיד ראשי', 'דרמה'],
        featured: true,
        badge: 'תפקיד ראשי'
      },
      {
        id: 2,
        title: 'המלט - אופליה',
        description: 'ביצוע שייקספיר קלאסי המדגיש פגיעות רגשית וחוזק.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_4431.jpeg',
        tags: ['קלאסי', 'דרמה']
      },
      {
        id: 3,
        title: 'Much Ado About Nothing - ביאטריס',
        description: 'דמות שנונה וחדת לשון המדגישה תזמון קומי ואינטליגנציה.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_4425.jpeg',
        tags: ['קומדיה', 'שייקספיר']
      }
    ],
    singing: [
      {
        id: 4,
        title: 'שירה מקצועית - טל בן שבע',
        description: 'הופעה מוזיקלית המציגה את הטווח הקולי והמקצועיות של טל.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_4123.jpeg',
        tags: ['שירה', 'מוזיקלי', 'הופעה'],
        featured: true,
        badge: 'הופעה מוזיקלית'
      },
      {
        id: 5,
        title: '"On My Own" - Les Misérables',
        description: 'ביצוע סולו אינטימי המדגים שליטה קולית ועומק רגשי.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_3648.jpeg',
        tags: ['סולו', 'מוזיקל']
      }
    ],
    dance: [
      {
        id: 6,
        title: 'ריקוד מקצועי - טל בן שבע',
        description: 'הופעת ריקוד מקצועית המציגה תנועה זורמת וטכניקה מדויקת.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_4397.jpeg',
        tags: ['ריקוד', 'כוריאוגרפיה', 'הופעה'],
        featured: true,
        badge: 'כוריאוגרפיה'
      },
      {
        id: 7,
        title: 'הופעת ג\'אז קבוצתית',
        description: 'הופעה קבוצתית אנרגטית המציגה קצב ותיאום.',
        video: '/videos/vid1.mp4',
        poster: '/pictures/IMG_4064.jpeg',
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
            מגוון תפקידים ויכולות מקצועיות
          </motion.p>
        </div>
        
        <div className="portfolio-tabs">
          <button 
            className={`tab-btn ${mounted && activeTab === 'acting' ? 'active' : ''}`}
            onClick={() => setActiveTab('acting')}
            disabled={!mounted}
          >
            משחק
          </button>
          <button 
            className={`tab-btn ${mounted && activeTab === 'singing' ? 'active' : ''}`}
            onClick={() => setActiveTab('singing')}
            disabled={!mounted}
          >
            שירה
          </button>
          <button 
            className={`tab-btn ${mounted && activeTab === 'dance' ? 'active' : ''}`}
            onClick={() => setActiveTab('dance')}
            disabled={!mounted}
          >
            ריקוד
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="portfolio-video">
                  <video 
                    controls 
                    poster={item.poster}
                    title={item.title}
                    className="portfolio-video-player"
                  >
                    <source src={item.video} type="video/mp4" />
                    הדפדפן שלך לא תומך באלמנט הוידאו.
                  </video>
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
    </section>
  )
} 