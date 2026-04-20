import { useState, useEffect } from 'react'
import {
  X,
  FileText,
  MessageSquare,
  Menu,
  Palette,
  Code,
  Video,
  ChevronUp,
  Zap,
  Layout,
  Globe,
  Database,
  Terminal,
  Layers,
  MousePointer,
  Sparkles,
  Film,
  Scissors,
  Music,
  Camera,
  Sun,
  Moon
} from 'lucide-react'
import { useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './App.css'

function Magnetic({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    setPosition({ x: x * strength, y: y * strength })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [activeService, setActiveService] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    const clock = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => {
      clearTimeout(timer)
      clearInterval(clock)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])



  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      reply_to: formData.email,
      message: formData.message,
    }

    try {
      // Note: User needs to replace 'YOUR_TEMPLATE_ID' and 'YOUR_PUBLIC_KEY' with their actual EmailJS credentials
      await emailjs.send(
        'service_fqwiofi',
        'template_k9kaeuy', // Updated Template ID
        templateParams,
        'FwfXTPQ9jkc5WhC6o' // Updated Public Key
      )
      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
      alert('Message sent successfully!')
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="portfolio">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="grain-overlay" />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{
              y: '-100%',
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
            }}
            className="preloader"
          >
            <div className="preloader-content">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                ROHIT VOODA
              </motion.h1>
              <div className="preloader-bar-container">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="preloader-bar"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="vignette" />



      {/* Navigation */}
      <nav className={`fixed-nav glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Magnetic>
            <a
              href="#home"
              className="logo-text"

            >
              rohitvooda
            </a>
          </Magnetic>

          <div className="nav-right">
            <ul className="desktop-nav">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Magnetic strength={0.2}>
                    <a
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>

            <Magnetic strength={0.5}>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </Magnetic>

            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav glass"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <motion.section
          id="home"
          className="hero"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="marquee-container">
            <div className="marquee-content">
              DESIGNER • DEVELOPER • EDITOR • CREATIVE • DESIGNER • DEVELOPER • EDITOR • CREATIVE •
            </div>
          </div>

          <div className="hero-visual-bg">
            <img src="https://images.unsplash.com/photo-1635776062127-d379bfcbb9c8?auto=format&fit=crop&q=80&w=2000" alt="Abstract Background" />
          </div>

          <motion.div className="prism-orb orb-1" animate={{ y: [0, 40, 0], x: [0, 20, 0] }} transition={{ duration: 20, repeat: Infinity }} />
          <motion.div className="prism-orb orb-2" animate={{ y: [0, -30, 0], x: [0, -40, 0] }} transition={{ duration: 25, repeat: Infinity }} />


          <div className="container hero-container">
            <motion.div
              style={{ y: y1, opacity: opacityHero }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="hero-content"
            >
              <div className="hero-top-info">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="availability-tag"
                >
                  <span className="dot" />
                  AVAILABLE FOR PROJECTS
                </motion.div>
                <div className="hero-sep" />
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="hero-loc text-muted"
                >
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
                </motion.span>
              </div>

              <h1
                className="name big-name"
              >
                <div className="name-row">
                  {"ROHIT".split("").map((char, i) => (
                    <motion.span
                      key={`rohit-${i}`}
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5 + (i * 0.04),
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="name-row">
                  {"VOODA".split("").map((char, i) => (
                    <motion.span
                      key={`vooda-${i}`}
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.7 + (i * 0.04),
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="hero-subtitle"
              >
                The Art of Digital Storytelling
              </motion.p>

              <div className="hero-actions">
                <Magnetic strength={0.3}>
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="btn btn-primary hero-btn"
                  >
                    GET IN TOUCH
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <motion.a
                    href="#services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 }}
                    className="hero-secondary-btn"
                  >
                    VIEW SERVICES
                  </motion.a>
                </Magnetic>
              </div>

            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="scroll-indicator"
          >
            <div className="mouse-icon">
              <div className="wheel" />
            </div>
            <span>SCROLL</span>
          </motion.div>

          <div className="hero-ambient">
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="ambient-blob blob-1"
            />
            <motion.div
              animate={{
                x: [0, -50, 0],
                y: [0, 40, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="ambient-blob blob-2"
            />
          </div>
          <div className="hero-bg-accent"></div>
        </motion.section>

        {/* About Section */}
        <section id="about" className="about-v4">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              className="bento-grid"
            >
              {/* Main Intro Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bento-card card-large card-header"
              >
                <h2 className="greeting-text">Unlocking creative <br /> possibilities through design.</h2>
                <h1 className="name-reveal">ROHIT VOODA</h1>
                <div className="tech-stack-tags">
                  <span className="tag">REACT</span>
                  <span className="tag">TYPESCRIPT</span>
                  <span className="tag">UI/UX</span>
                  <span className="tag">MOTION</span>
                  <span className="tag">VIDEO EDITING</span>
                </div>
              </motion.div>

              {/* Bio Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bento-card card-bio"
              >
                <p>
                  I'm a <span className="highlight">Designer & Developer</span> based in India,
                  obsessed with crafting high-end digital experiences.
                  My work lives at the intersection of aesthetic
                  purity and technical precision.
                </p>
              </motion.div>

              {/* Action Card 1: Resume */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bento-card action-card"
              >
                <Magnetic strength={0.3}>
                  <div className="icon-box">
                    <FileText size={28} />
                  </div>
                </Magnetic>
                <div>
                  <h3>Resume</h3>
                  <p>Check out my experience</p>
                </div>
              </motion.div>

              {/* Socials Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="bento-card card-tall"
              >
                <div className="socials-vertical-list">
                  <a href="https://www.linkedin.com/in/vooda-rohit-928186321/" target="_blank" rel="noopener noreferrer" className="social-item">LINKEDIN</a>
                  <a href="https://www.instagram.com/rohitvooda/" target="_blank" rel="noopener noreferrer" className="social-item">INSTAGRAM</a>
                  <a href="https://github.com/rohitmaxx0908" target="_blank" rel="noopener noreferrer" className="social-item">GITHUB</a>
                </div>
              </motion.div>

              {/* Action Card 2: Contact */}
              <motion.a
                href="#contact"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bento-card action-card"
              >
                <Magnetic strength={0.3}>
                  <div className="icon-box">
                    <MessageSquare size={28} />
                  </div>
                </Magnetic>
                <div>
                  <h3>Let's Chat</h3>
                  <p>Start a new project</p>
                </div>
              </motion.a>

              {/* Large Image/Visual Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bento-card card-medium"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)' }}
              >
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Current Focus</div>
                <h3 style={{ fontSize: '2.5rem', marginTop: '1rem', fontWeight: '700' }}>Minimalism & Interaction.</h3>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          id="services"
          className="services"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', margin: '0 auto 4rem', display: 'table' }}>What I Do</h2>
            <div className="grid grid-3">
              <Magnetic strength={0.2}>
                <ServiceCard
                  icon={<Palette size={40} />}
                  title="UI/UX Design"
                  desc="Creating user-centric designs that are both beautiful and functional."
                  budget="Starting from ₹2999"
                  onClick={() => setActiveService('UI/UX Design')}
                  isActive={activeService === 'UI/UX Design'}
                />
              </Magnetic>
              <Magnetic strength={0.2}>
                <ServiceCard
                  icon={<Code size={40} />}
                  title="Web Development"
                  desc="Building responsive, high-performance websites using the latest technologies."
                  budget="Starting from ₹7999"
                  onClick={() => setActiveService('Web Development')}
                  isActive={activeService === 'Web Development'}
                />
              </Magnetic>
              <Magnetic strength={0.2}>
                <ServiceCard
                  icon={<Video size={40} />}
                  title="Video Editing"
                  desc="Crafting captivating visual content that engages and inspires."
                  budget="Starting from ₹1499"
                  onClick={() => setActiveService('Video Editing')}
                  isActive={activeService === 'Video Editing'}
                />
              </Magnetic>
            </div>

            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="service-detail-container glass"
                >
                  <button className="close-detail" onClick={() => setActiveService(null)}><X size={20} /></button>

                  {activeService === 'Web Development' && (
                    <div className="detail-inner">
                      <div className="detail-header-side">
                        <Code size={60} strokeWidth={1} />
                        <h2>Web Development</h2>
                      </div>
                      <div className="grid grid-2 detail-content">
                        <div className="detail-column">
                          <h3><Globe size={20} /> Static Solutions</h3>
                          <ul>
                            <li><Zap size={14} /> Professional Portfolio Websites</li>
                            <li><Zap size={14} /> High-Converting Landing Pages</li>
                            <li><Zap size={14} /> Single Page Web Applications</li>
                            <li><Zap size={14} /> Business Profile Sites</li>
                            <li><Zap size={14} /> Event & Resume Pages</li>
                          </ul>
                        </div>
                        <div className="detail-column">
                          <h3><Database size={20} /> Dynamic Solutions</h3>
                          <ul>
                            <li><Terminal size={14} /> Scalable E-commerce Stores</li>
                            <li><Terminal size={14} /> Multi-tab Business Platforms</li>
                            <li><Terminal size={14} /> Interactive User Dashboards</li>
                            <li><Terminal size={14} /> Custom Web Applications</li>
                            <li><Terminal size={14} /> Database Integrated Systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeService === 'UI/UX Design' && (
                    <div className="detail-inner">
                      <div className="detail-header-side">
                        <Palette size={60} strokeWidth={1} />
                        <h2>UI/UX Design</h2>
                      </div>
                      <div className="grid grid-2 detail-content">
                        <div className="detail-column">
                          <h3><Layers size={20} /> Design Strategy</h3>
                          <ul>
                            <li><Layout size={14} /> User Research & Persona Mapping</li>
                            <li><Layout size={14} /> Wireframing & Low-Fi Prototyping</li>
                            <li><Layout size={14} /> Brand Identity & Logo Design</li>
                            <li><Layout size={14} /> Comprehensive Design Systems</li>
                            <li><Layout size={14} /> User Flow Optimization</li>
                          </ul>
                        </div>
                        <div className="detail-column">
                          <h3><MousePointer size={20} /> Interface Design</h3>
                          <ul>
                            <li><Sparkles size={14} /> Mobile App UI (iOS & Android)</li>
                            <li><Sparkles size={14} /> Web Interface Design (Responsive)</li>
                            <li><Sparkles size={14} /> Interaction & Motion Design</li>
                            <li><Sparkles size={14} /> Visual Content & Assets</li>
                            <li><Sparkles size={14} /> Accessibility (WCAG) Audits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeService === 'Video Editing' && (
                    <div className="detail-inner">
                      <div className="detail-header-side">
                        <Video size={60} strokeWidth={1} />
                        <h2>Video Editing</h2>
                      </div>
                      <div className="grid grid-2 detail-content">
                        <div className="detail-column">
                          <h3><Film size={20} /> Post-Production</h3>
                          <ul>
                            <li><Scissors size={14} /> Professional Color Grading</li>
                            <li><Scissors size={14} /> Immersive Sound Design</li>
                            <li><Scissors size={14} /> High-End Motion Graphics</li>
                            <li><Scissors size={14} /> Dynamic Cinematic Transitions</li>
                            <li><Scissors size={14} /> Multi-Cam Sequence Syncing</li>
                          </ul>
                        </div>
                        <div className="detail-column">
                          <h3><Camera size={20} /> Content Creation</h3>
                          <ul>
                            <li><Music size={14} /> Short-Form Social Media Edits</li>
                            <li><Music size={14} /> YouTube & Educational Content</li>
                            <li><Music size={14} /> High-Impact Commercial Ads</li>
                            <li><Music size={14} /> Corporate Branding Videos</li>
                            <li><Music size={14} /> Documentary & Storytelling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="detail-footer">
                    <p>Ready to bring your vision to life? Let's discuss the possibilities.</p>
                    <a
                      href="#contact"
                      className="btn btn-primary"
                      onClick={() => setActiveService(null)}
                    >
                      Enquire for Budget
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>



        <motion.section
          id="contact"
          className="contact-v2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container">
            <h1 className="contact-title">Contact me</h1>

            <div className="contact-v2-grid">
              <div className="contact-v2-info">
                <div className="info-block">
                  <a href="mailto:voodarohit@gmail.com" className="highlight-link">voodarohit@gmail.com</a>
                  <a href="tel:7207819299" className="highlight-link">7207819299</a>
                </div>
              </div>

              <form className="contact-v2-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>First Name (required)</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Email (required)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Message (required)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={1}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                </button>
                {submitStatus === 'success' && <p className="status-msg success">Message sent successfully!</p>}
                {submitStatus === 'error' && <p className="status-msg error">Failed to send message.</p>}
              </form>
            </div>

            <div className="contact-v2-footer">
              <div className="footer-details">
                <div className="footer-col">
                  <p>UI/UX Design & Brand Identity</p>
                  <p>Web Development & Editing</p>
                </div>
                <div className="footer-col">
                  <p>3+ years of experience</p>
                  <p>Available for Freelance</p>
                </div>
              </div>
              <h1 className="footer-name-giant">rohitvooda</h1>
              <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Rohit Vooda</p>
                <div className="footer-sub-links">
                  <a href="https://www.linkedin.com/in/vooda-rohit-928186321/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://www.instagram.com/rohitvooda/" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://github.com/rohitmaxx0908" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="mailto:voodarohit@gmail.com">Email</a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <AnimatePresence>
        {scrolled && (
          <Magnetic>
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="back-to-top"
            >
              <ChevronUp size={32} />
            </motion.button>
          </Magnetic>
        )}
      </AnimatePresence>
    </div>
  )
}

function ServiceCard({ icon, title, desc, budget, onClick, isActive }: { icon: React.ReactNode, title: string, desc: string, budget: string, onClick?: () => void, isActive?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePos({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`service-card price-card ${isActive ? 'active' : ''}`}
      whileHover={{ y: -10 }}
      style={{
        '--x': `${mousePos.x}%`,
        '--y': `${mousePos.y}%`
      } as React.CSSProperties}
    >
      <div className="service-card-glow" />
      <div className="service-icon">{icon}</div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{desc}</p>
      <div className="service-card-footer">
        <span className="budget-tag">{budget}</span>
        <div className="service-card-arrow">
          <Sparkles size={16} />
        </div>
      </div>
    </motion.div>
  )
}



export default App
