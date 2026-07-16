import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const projects = [
  {
    slug: 'rumah-kontur',
    number: '01',
    name: 'Rumah Kontur',
    location: 'Bandung, ID',
    year: '2024',
    type: 'Residential / New build',
    area: '286 m²',
    status: 'Completed',
    material: 'Exposed brick / teak',
    coordinates: '06°54′ S / 107°36′ E',
    cover: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=88',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=88',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=88',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88',
    ],
    description: 'Sebuah rumah yang mengikuti kemiringan lahan, bukan melawannya. Ruang-ruang hidup disusun mengitari taman dalam untuk menjaga hubungan yang tenang dengan lanskap.',
    detail: 'Material dipilih untuk menua bersama penghuninya. Batu lokal membentuk kaki bangunan, sementara bata ekspos dan kayu jati menangkap perubahan cahaya sepanjang hari.',
  },
  {
    slug: 'studio-selatan',
    number: '02',
    name: 'Studio Selatan',
    location: 'Jakarta, ID',
    year: '2023',
    type: 'Workplace / Adaptive reuse',
    area: '412 m²',
    status: 'Completed',
    material: 'Concrete / steel / glass',
    coordinates: '06°15′ S / 106°48′ E',
    cover: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=88',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=88',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1800&q=88',
    ],
    description: 'Kantor kreatif di dalam struktur lama yang diberi kehidupan kedua. Intervensi baru dijaga minimum untuk membiarkan karakter bangunan asli tetap berbicara.',
    detail: 'Rangka baja ringan menandai ruang kerja bersama, sementara jalur cahaya baru membelah massa bangunan dan membuat sirkulasi terasa seperti jalan kecil di dalam kota.',
  },
  {
    slug: 'villa-antara',
    number: '03',
    name: 'Villa Antara',
    location: 'Ubud, ID',
    year: '2022',
    type: 'Hospitality / Retreat',
    area: '198 m²',
    status: 'Completed',
    material: 'Andesite / lime plaster',
    coordinates: '08°30′ S / 115°15′ E',
    cover: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=88',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=88',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88',
    ],
    description: 'Retret kecil di antara pepohonan tropis. Bangunan dirancang sebagai rangkaian ambang: dari terang ke teduh, dari privat menuju lanskap.',
    detail: 'Alih-alih membuka seluruh pemandangan sekaligus, bukaan ditempatkan sebagai potongan-potongan yang memberi waktu bagi mata untuk menemukan lanskap.',
  },
]

function Arrow({ direction = 'right' }) {
  return <span className={`arrow arrow-${direction}`} aria-hidden="true">↗</span>
}

function Label({ children, className = '' }) {
  return <span className={`label ${className}`}>{children}</span>
}

function Annotation({ project, index = 0 }) {
  return (
    <div className={`annotation annotation-${index}`}>
      <span className="annotation-line" />
      <span>PRJ.{project.number} — {project.coordinates}</span>
      <span>{project.year} / {project.material}</span>
    </div>
  )
}

function ProjectImage({ project, className = '', index = 0 }) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={`project-image ${className} ${active ? 'is-active' : ''}`}
      data-project-slug={project.slug}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <img src={project.cover} alt={`${project.name}, ${project.type}`} loading={index > 0 ? 'lazy' : 'eager'} />
      <Annotation project={project} index={index} />
      <span className="image-index">0{index + 1} / 03</span>
    </div>
  )
}

function SiteNav({ onNavigate, currentView }) {
  return (
    <header className="site-nav">
      <a className="wordmark" href="#top" onClick={() => onNavigate('home')}>
        <span>ATELIER</span>
        <span>RUANG / ARSITEKTUR</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a className={currentView === 'home' ? 'active' : ''} href="#work" onClick={() => onNavigate('work')}>Work</a>
        <a className={currentView === 'studio' ? 'active' : ''} href="#studio" onClick={() => onNavigate('studio')}>Studio</a>
        <a className={currentView === 'contact' ? 'active' : ''} href="#contact" onClick={() => onNavigate('contact')}>Contact</a>
      </nav>
      <span className="nav-status"><i /> Jakarta / 2024</span>
    </header>
  )
}

function Hero({ onOpenProject }) {
  const heroProject = projects[0]
  return (
    <section className="hero" id="top">
      <div className="hero-copy reveal reveal-delay-1">
        <Label>Architecture &amp; interiors</Label>
        <h1>Spaces with<br /><em>quiet presence.</em></h1>
        <p>We make places to live, work, and gather — shaped by light, material, and the life within.</p>
      </div>
      <button className="hero-image-button" type="button" data-project-slug={heroProject.slug} onClick={() => onOpenProject(heroProject.slug)} aria-label={`View ${heroProject.name}`}>
        <div className="hero-image-wrap reveal">
          <img src={heroProject.cover} alt="Rumah Kontur, Bandung" />
          <div className="hero-image-meta">
            <Label>Featured project</Label>
            <span>01</span>
          </div>
          <Annotation project={heroProject} />
        </div>
      </button>
      <div className="hero-footer reveal reveal-delay-2">
        <div className="scroll-note"><span className="scroll-line" /> Scroll to explore</div>
        <div className="hero-coordinates">06°54′ S&nbsp;&nbsp; / &nbsp;&nbsp;107°36′ E</div>
        <div className="hero-caption"><span>01</span> Rumah Kontur <span>/</span> Bandung, Indonesia</div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, onOpenProject }) {
  return (
    <article className={`project-card project-card-${index + 1} reveal-on-scroll`}>
      <button type="button" onClick={() => onOpenProject(project.slug)} className="project-link" aria-label={`View ${project.name}`}>
        <ProjectImage project={project} index={index} />
      </button>
      <div className="project-card-info">
        <div>
          <Label>0{index + 1} / {project.type.split(' / ')[0]}</Label>
          <h3>{project.name}</h3>
        </div>
        <div className="project-card-meta">
          <span>{project.location}</span>
          <span>{project.year}</span>
          <Arrow />
        </div>
      </div>
    </article>
  )
}

function WorkSection({ onOpenProject }) {
  return (
    <section className="work-section section-pad" id="work">
      <div className="section-heading reveal-on-scroll">
        <div>
          <Label>Selected work / 2022—2024</Label>
          <h2>Built for<br /><em>the in-between.</em></h2>
        </div>
        <p className="section-intro">A small collection of spaces that hold a little more than their program asks for.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpenProject={onOpenProject} />)}
      </div>
      <div className="work-archive reveal-on-scroll">
        <Label>Archive</Label>
        <span>17 projects / 2016—2024</span>
        <a href="#contact">Request full list <Arrow /></a>
      </div>
    </section>
  )
}

function StudioSection() {
  const timeline = [
    { year: '2016', event: 'Studio didirikan di Jakarta Selatan oleh dua arsitek lulusan ITB.' },
    { year: '2018', event: 'Proyek pertama skala komersial — kantor kreatif di Bandung.' },
    { year: '2022', event: 'Ekspansi ke proyek hospitality dan retret.' },
    { year: '2024', event: 'Studio bergabung dengan jaringan arsitektur regional Asia Tenggara.' },
  ]
  return (
    <section className="studio-section section-pad" id="studio">
      <div className="studio-rule" />
      <div className="studio-layout reveal-on-scroll">
        <div className="studio-heading">
          <Label>About the studio</Label>
          <h2>Less, but<br /><em>better held.</em></h2>
        </div>
        <div className="studio-copy">
          <p className="large-copy">Atelier Ruang is an architecture practice based in Jakarta. We work across scales to make spaces that feel inevitable — not because they demand attention, but because they belong.</p>
          <div className="studio-details">
            <p>Our work begins with observation: how light moves across a room, where people naturally pause, what a material remembers. From there, we make precise decisions and leave room for the unexpected.</p>
          </div>
        </div>
      </div>

      <div className="studio-team reveal-on-scroll">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=88"
          alt="Atelier Ruang team at work"
          className="studio-team-photo"
        />
        <div className="studio-team-caption">
          <Label>The team / Jakarta, 2024</Label>
          <p>Enam orang. Satu prinsip: ruang yang baik tidak menampilkan dirinya.</p>
        </div>
      </div>

      <div className="studio-timeline reveal-on-scroll">
        <Label>Timeline</Label>
        <div className="timeline-list">
          {timeline.map((item) => (
            <div key={item.year} className="timeline-item">
              <span className="timeline-year">{item.year}</span>
              <span className="timeline-bar" />
              <p className="timeline-event">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="studio-footnote reveal-on-scroll"><span>01</span> We believe restraint is a form of generosity.</div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact-section section-pad" id="contact">
      <div className="contact-header reveal-on-scroll">
        <Label>Start a conversation</Label>
        <h2>Have a place<br />in mind<span>?</span></h2>
      </div>
      <div className="contact-body reveal-on-scroll">
        <a className="contact-email" href="mailto:hello@atelierruang.studio">hello@atelierruang.studio <Arrow /></a>
        <form
          className="contact-form"
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
        >
          <div className="contact-form-row">
            <div className="contact-field">
              <Label>Name</Label>
              <input name="name" type="text" required placeholder="Your name" />
            </div>
            <div className="contact-field">
              <Label>Email</Label>
              <input name="email" type="email" required placeholder="your@email.com" />
            </div>
          </div>
          <div className="contact-field">
            <Label>Message</Label>
            <textarea name="message" required rows={5} placeholder="Tell us about your project…" />
          </div>
          <button className="contact-submit" type="submit">Send message <Arrow /></button>
        </form>
        <div className="contact-columns">
          <div><Label>Visit</Label><p>Jl. Kemang Raya 12<br />Jakarta Selatan 12730<br />Indonesia</p></div>
          <div><Label>Follow</Label><p><a href="#instagram">Instagram</a><br /><a href="#linkedin">LinkedIn</a></p></div>
          <div><Label>Elsewhere</Label><p>+62 21 719 2024<br />Mon — Fri / 09—18</p></div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-mark">AR<span>◌</span></div>
      <div>© Atelier Ruang / 2024</div>
      <a href="#top">Back to top <Arrow direction="up" /></a>
    </footer>
  )
}

function ProjectDetail({ project, onClose, onOpenProject }) {
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <main className="detail-page">
      <div className="detail-topline"><button type="button" onClick={onClose}><Arrow direction="left" /> All work</button><Label>Project {project.number} / 03</Label></div>
      <section className="detail-hero">
        <div className="detail-title reveal"><Label>{project.type}</Label><h1>{project.name}</h1><p>{project.location} / {project.year}</p></div>
        <div className="detail-cover reveal" data-project-slug={project.slug}><img src={project.cover} alt={project.name} /><Annotation project={project} /></div>
      </section>
      <section className="spec-section section-pad-small">
        <div className="spec-intro"><Label>Project note</Label><p>{project.description}</p></div>
        <div className="spec-table">
          <div><Label>Location</Label><span>{project.location}</span></div>
          <div><Label>Year</Label><span>{project.year}</span></div>
          <div><Label>Area</Label><span>{project.area}</span></div>
          <div><Label>Status</Label><span>{project.status}</span></div>
          <div><Label>Material</Label><span>{project.material}</span></div>
          <div><Label>Coordinates</Label><span>{project.coordinates}</span></div>
        </div>
      </section>
      <section className="detail-gallery">
        <div className="gallery-wide reveal-on-scroll"><img src={project.images[0]} alt={`${project.name} exterior`} /><Annotation project={project} index={1} /></div>
        <div className="gallery-story section-pad-small reveal-on-scroll"><Label>Inside the work</Label><p>{project.detail}</p><span className="story-mark">AR / {project.number}</span></div>
        <div className="gallery-pair reveal-on-scroll"><img src={project.images[1]} alt={`${project.name} interior`} /><img src={project.images[2]} alt={`${project.name} detail`} /></div>
      </section>
      <button className="next-project" type="button" data-project-slug={nextProject.slug} onClick={() => onOpenProject(nextProject.slug)}><div><Label>Next project / {nextProject.number}</Label><h2>{nextProject.name}</h2></div><Arrow /></button>
    </main>
  )
}

function useHashRoute() {
  const getRoute = () => window.location.hash.replace('#', '') || 'top'
  const [route, setRoute] = useState(getRoute)
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return route
}

function GlobalSpringCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring settings for ultra smooth movements
  // mass: smaller = lighter/faster; stiffness: higher = stronger pull; damping: higher = less wobble
  const springConfig = { mass: 0.06, stiffness: 350, damping: 22 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const [hoverState, setHoverState] = useState('default') // 'default', 'project', 'interactive'
  const [activeProject, setActiveProject] = useState(null)
  
  // Inactivity / idle state
  const [isMoving, setIsMoving] = useState(false)
  // Screen boundary / edge state
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let moveTimeout

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Screen edge boundary detection (24px padding)
      const pad = 24
      const nearEdge =
        e.clientX <= pad ||
        e.clientX >= window.innerWidth - pad ||
        e.clientY <= pad ||
        e.clientY >= window.innerHeight - pad

      setIsVisible(!nearEdge)
      setIsMoving(true)

      // Inactivity timeout
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        setIsMoving(false)
      }, 150) // Shrinks after 150ms of stillness
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      const projectContainer = target.closest('[data-project-slug]')
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]')

      if (projectContainer) {
        const slug = projectContainer.getAttribute('data-project-slug')
        const foundProject = projects.find((p) => p.slug === slug)
        if (foundProject) {
          setActiveProject(foundProject)
          setHoverState('project')
          return
        }
      }

      if (isInteractive) {
        setHoverState('interactive')
        setActiveProject(null)
      } else {
        setHoverState('default')
        setActiveProject(null)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(moveTimeout)
    }
  }, [mouseX, mouseY])

  const [hasHover, setHasHover] = useState(false)
  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  if (!hasHover) return null

  // Calculate styling dynamically
  let width = 36
  let height = 36
  let backgroundColor = '#f97316' // Orange translucent
  let borderColor = '#f97316'
  let borderWidth = 1.5
  let borderRadius = '50%'

  if (hoverState === 'project') {
    width = 160
    height = 72
    backgroundColor = 'rgba(249, 115, 22, 0.95)' // Semi-solid orange card
    borderColor = 'rgba(255, 255, 255, 0.25)'
    borderWidth = 1
    borderRadius = '8px'
  } else if (hoverState === 'interactive') {
    width = 48
    height = 48
    backgroundColor = '#f97316'
    borderColor = '#f97316'
    borderWidth = 2
    borderRadius = '50%'
  } else {
    // default state
    width = isMoving ? 36 : 18 // shrinks when still
    height = isMoving ? 36 : 18
    backgroundColor = '#f97316'
    borderColor = '#f97316'
    borderWidth = 1.5
    borderRadius = '50%'
  }

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
      }}
      animate={{
        translateX: hoverState === 'project' ? '12px' : '-50%',
        translateY: hoverState === 'project' ? '12px' : '-50%',
        width,
        height,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        opacity: isVisible ? 1 : 0, // fade out at edges or leave
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{
        type: 'spring',
        mass: 0.15,
        stiffness: 140,
        damping: 18,
      }}
      className="fixed pointer-events-none z-[9999] flex flex-col items-center justify-center text-[9px] font-mono tracking-widest uppercase overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.2)]"
    >
      <AnimatePresence mode="wait">
        {hoverState === 'project' && activeProject && (
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-start justify-center p-3 text-left w-full h-full text-white"
          >
            <div className="flex justify-between items-center w-full border-b border-white/20 pb-1 mb-1">
              <span className="font-mono text-[8px] opacity-90 text-white font-bold">PRJ.{activeProject.number}</span>
              <span className="font-mono text-[8px] opacity-75 text-white">{activeProject.year}</span>
            </div>
            <div className="font-serif text-[11px] font-normal tracking-normal normal-case truncate w-full text-white leading-tight">
              {activeProject.name}
            </div>
            <div className="font-mono text-[7px] opacity-75 text-white mt-0.5">
              {activeProject.location}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function App() {
  const route = useHashRoute()
  const detailProject = projects.find((project) => route === `work/${project.slug}`)
  const currentView = route === 'studio' ? 'studio' : route === 'contact' ? 'contact' : 'home'

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12 })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [route])

  useEffect(() => {
    if (detailProject) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [detailProject])

  const onNavigate = (view) => {
    window.location.hash = view === 'home' ? 'top' : view
  }
  const onOpenProject = (slug) => { window.location.hash = `work/${slug}` }
  const onClose = () => { window.location.hash = 'top' }

  return (
    <>
      <GlobalSpringCursor />
      <SiteNav onNavigate={onNavigate} currentView={currentView} />
      {detailProject ? <ProjectDetail project={detailProject} onClose={onClose} onOpenProject={onOpenProject} /> : (
        <main>
          <Hero onOpenProject={onOpenProject} />
          <WorkSection onOpenProject={onOpenProject} />
          <StudioSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  )
}
