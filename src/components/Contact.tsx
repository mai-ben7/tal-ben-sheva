'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionOrSmall } from '../hooks/useReducedMotionOrSmall'

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const reduceMotion = useReducedMotionOrSmall()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Disable animations if reduced motion is preferred
  const animationProps = reduceMotion ? {
    initial: { opacity: 1, y: 0, x: 0 },
    whileInView: { opacity: 1, y: 0, x: 0 },
    transition: { duration: 0 }
  } : {}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="contact">
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
            צור קשר
          </motion.h2>
          
        </div>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            {...animationProps}
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            whileInView={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>בואו לעבוד יחד</h3>
            <p>
              אני תמיד מתרגשת לדון בהזדמנויות חדשות ופרויקטים יצירתיים. 
              בין אם אתם מנהלי ליהוק, סוכנים או אמנים עמיתים, אשמח לשמוע מכם.
            </p>
            
            <div className="contact-highlights">
              <div className="highlight-item">
                <i className="fas fa-check-circle" aria-hidden="true"></i>
                <span>זמינה מיידית לעבודה</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle" aria-hidden="true"></i>
                <span>ניסיון במגוון סגנונות</span>
              </div>
              <div className="highlight-item">
                <i className="fas fa-check-circle" aria-hidden="true"></i>
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
            </div>
          ) : (
            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              {...animationProps}
              initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              whileInView={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={reduceMotion ? { duration: 0, delay: 0.2 } : { duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="form-group">
                <label htmlFor="name" className="sr-only">שם</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="השם שלך"
                  required
                  minLength={2}
                  aria-describedby="name-error"
                />
                {submitStatus === 'error' && (
                  <div id="name-error" className="error-message" role="alert">
                    אנא הזן את שמך
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="sr-only">אימייל</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="האימייל שלך"
                  required
                  inputMode="email"
                  aria-describedby="email-error"
                />
                {submitStatus === 'error' && (
                  <div id="email-error" className="error-message" role="alert">
                    אנא הזן אימייל תקין
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="sr-only">הודעה</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="ההודעה שלך"
                  required
                  minLength={10}
                  aria-describedby="message-error"
                />
                {submitStatus === 'error' && (
                  <div id="message-error" className="error-message" role="alert">
                    אנא הזן הודעה של לפחות 10 תווים
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
                aria-describedby="submit-status"
              >
                {isSubmitting ? 'שולח...' : 'שלח הודעה'}
              </button>
              
              {submitStatus === 'success' && (
                <div id="submit-status" className="success-message" role="alert">
                  ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div id="submit-status" className="error-message" role="alert">
                  אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.
                </div>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
} 