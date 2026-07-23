import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Layout Components
import { Header } from "./components/layout/Header";
import { MobileMenu } from "./components/layout/MobileMenu";
import { Footer } from "./components/layout/Footer";
import { ScrollToTopButton } from "./components/layout/ScrollToTopButton";

// Section Components
import { HeroCarousel } from "./components/sections/HeroCarousel";
import { FeaturedIntro } from "./components/sections/FeaturedIntro";
import { ProjectMasonryGrid } from "./components/sections/ProjectMasonryGrid";
import { InfiniteProjectCanvas } from "./components/sections/InfiniteProjectCanvas";
import { AboutStudio } from "./components/sections/AboutStudio";
import { ContactSection } from "./components/sections/ContactSection";

import { PROJECTS } from "./data/constants";

function GlobalSpringCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { mass: 0.06, stiffness: 350, damping: 22 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [hoverState, setHoverState] = useState('default');
  const [activeProject, setActiveProject] = useState(null);
  
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let moveTimeout;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const pad = 24;
      const nearEdge =
        e.clientX <= pad ||
        e.clientX >= window.innerWidth - pad ||
        e.clientY <= pad ||
        e.clientY >= window.innerHeight - pad;

      setIsVisible(!nearEdge);
      setIsMoving(true);

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const projectContainer = target.closest('[data-project-slug]');
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');

      if (projectContainer) {
        const slug = projectContainer.getAttribute('data-project-slug');
        const foundProject = PROJECTS.find((p) => p.id === parseInt(slug, 10));
        if (foundProject) {
          setActiveProject(foundProject);
          setHoverState('project');
          return;
        }
      }

      if (isInteractive) {
        setHoverState('interactive');
        setActiveProject(null);
      } else {
        setHoverState('default');
        setActiveProject(null);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(moveTimeout);
    };
  }, [mouseX, mouseY]);

  const [hasHover, setHasHover] = useState(false);
  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  if (!hasHover) return null;

  let width = 36;
  let height = 36;
  let backgroundColor = '#f97316';
  let borderColor = '#f97316';
  let borderWidth = 1.5;
  let borderRadius = '50%';

  if (hoverState === 'project') {
    width = 160;
    height = 72;
    backgroundColor = 'rgba(249, 115, 22, 0.95)';
    borderColor = 'rgba(255, 255, 255, 0.25)';
    borderWidth = 1;
    borderRadius = '8px';
  } else if (hoverState === 'interactive') {
    width = 48;
    height = 48;
    backgroundColor = '#f97316';
    borderColor = '#f97316';
    borderWidth = 2;
    borderRadius = '50%';
  } else {
    width = isMoving ? 36 : 18;
    height = isMoving ? 36 : 18;
    backgroundColor = '#f97316';
    borderColor = '#f97316';
    borderWidth = 1.5;
    borderRadius = '50%';
  }

  return (
    <motion.div
      style={{ left: cursorX, top: cursorY }}
      animate={{
        translateX: hoverState === 'project' ? '12px' : '-50%',
        translateY: hoverState === 'project' ? '12px' : '-50%',
        width,
        height,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ type: 'spring', mass: 0.15, stiffness: 140, damping: 18 }}
      className="fixed pointer-events-none z-[9999] flex flex-col items-center justify-center text-[9px] font-mono tracking-widest uppercase overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.2)]"
    >
      <AnimatePresence mode="wait">
        {hoverState === 'project' && activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-start justify-center p-3 text-left w-full h-full text-white"
          >
            <div className="flex justify-between items-center w-full border-b border-white/20 pb-1 mb-1">
              <span className="font-mono text-[8px] opacity-90 text-white font-bold">{activeProject.category}</span>
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
  );
}

import CurvedLoop from "./components/shared/CurvedLoop";

export default function App() {
  const [scrollState, setScrollState] = useState("top"); // "top", "scrolling_hero", "past_hero"
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (y < 50) {
        setScrollState("top");
      } else if (y < heroHeight) {
        setScrollState("scrolling_hero");
      } else {
        setScrollState("past_hero");
      }
      
      setShowScrollTop(y > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Call once to set initial state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div style={{ background: "#F8F7F4", color: "#111111", fontFamily: "Barlow, sans-serif" }}>
      <GlobalSpringCursor />
      
      <Header
        scrollState={scrollState}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main>
        <HeroCarousel onExploreClick={scrollToProjects} />
        
        <div className="relative z-30 bg-[#F8F7F4]">
          <FeaturedIntro />
          <ProjectMasonryGrid onExploreCanvas={() => setShowCanvas(true)} />
          
          {/* Curved Marquee diletakkan di whitespace sebelum About */}
          <div className="w-full flex items-center justify-center pt-4 pb-1">
            <CurvedLoop />
          </div>

          <AboutStudio />
          <ContactSection />
        </div>
      </main>

      <Footer />
      <ScrollToTopButton show={showScrollTop} />

      {/* Fullscreen Canvas Overlay */}
      {showCanvas && <InfiniteProjectCanvas onClose={() => setShowCanvas(false)} />}
    </div>
  );
}
