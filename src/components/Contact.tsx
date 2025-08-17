'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Send email using mailto
      const subject = encodeURIComponent(`הודעה חדשה מ-${formData.name} - אתר טל בן שבע`)
      const body = encodeURIComponent(`
שלום,

קיבלתי הודעה חדשה מהאתר של טל בן שבע:

שם: ${formData.name}
אימייל: ${formData.email}

הודעה:
${formData.message}

---
נשלח מהאתר של טל בן שבע
      `)
      
      const mailtoLink = `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'tal942899@gmail.com'}?subject=${subject}&body=${body}`
      window.open(mailtoLink, '_blank')
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            צור קשר
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            מוכנה לעבודה ופתוחה להזדמנויות חדשות
          </motion.p>
        </div>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>בואו לעבוד יחד</h3>
            <p>
              אני תמיד מתרגשת לדון בהזדמנויות חדשות ופרויקטים יצירתיים. 
              בין אם אתם מנהלי ליהוק, סוכנים או אמנים עמיתים, אשמח לשמוע מכם.
            </p>
            
            <div className="contact-highlights">
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>זמינה מיידית לעבודה</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>ניסיון במגוון סגנונות</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle"></i>
                <span>מקצועית ואמינה</span>
              </div>
            </div>
          </motion.div>
          
          {!mounted ? (
            <div className="contact-form">
              <div className="form-group">
                <div className="form-placeholder" style={{ 
                  height: '50px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                  color: '#999'
                }}>
                  השם שלך
                </div>
              </div>
              
              <div className="form-group">
                <div className="form-placeholder" style={{ 
                  height: '50px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 15px',
                  color: '#999'
                }}>
                  האימייל שלך
                </div>
              </div>
              
              <div className="form-group">
                <div className="form-placeholder" style={{ 
                  height: '120px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '15px',
                  color: '#999'
                }}>
                  ההודעה שלך
                </div>
              </div>
              
              <div className="btn btn-primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                <i className="fas fa-paper-plane"></i>
                שלח הודעה
              </div>
            </div>
          ) : (
            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="השם שלך"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="האימייל שלך"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder="ההודעה שלך"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                {isSubmitting ? 'שולח...' : 'שלח הודעה'}
              </button>
              
              {submitStatus === 'success' && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#27ae60', marginTop: '1rem', textAlign: 'center' }}
                >
                  תודה! ההודעה נשלחה בהצלחה. נחזור אליך בקרוב.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  className="error-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#e74c3c', marginTop: '1rem', textAlign: 'center' }}
                >
                  שגיאה בשליחת ההודעה. אנא נסה שוב.
                </motion.div>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
} 