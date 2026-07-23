import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HERO_SLIDES, EASING } from "../../data/constants";

const SLIDE_DURATION = 5000; // Lebih lambat (10 detik)

export function HeroCarousel({ onExploreClick }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef(0);

  // Parallax setup
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 350]); 
  
  // Lapisan hitam yang semakin pekat saat di-scroll
  const overlayOpacity = useTransform(scrollY, [0, 900], [0, 1]);

  const advance = useCallback((dir) => {
    setProgress(0);
    setCurrent((c) => (c + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const tick = 50;
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (SLIDE_DURATION / tick), 100));
    }, tick);
    const slideTimer = setTimeout(() => advance(1), SLIDE_DURATION);
    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [current, advance]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#111111]"
      style={{ height: "100dvh" }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 48) advance(dx < 0 ? 1 : -1);
      }}
    >
      {/* Background Images with Zoom Out Singkat */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: yImage }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0"
            aria-hidden={i !== current}
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
              transition: `opacity 500ms ease`,
            }}
          >
            <img
              src={s.image}
              alt={s.project}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                transform: i === current ? "scale(1)" : "scale(1.08)",
                transition: "transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}

        {/* Dark overlay fading in on scroll */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity, zIndex: 10 }}
        />
      </motion.div>

      {/* Hero content with Native CSS Fixed Parallax (Zero Jitter) */}
      <div 
        className="fixed inset-0 flex flex-col justify-end max-w-[1440px] mx-auto px-4 md:px-8 pb-4 md:pb-8 pointer-events-none z-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-10">
          <div className="max-w-4xl flex flex-col items-start w-full relative z-10">
            
            {/* ELEMEN YANG DIAM DI TEMPAT (TRUE NATIVE PARALLAX) */}
            <motion.div className="w-full flex flex-col items-start pointer-events-auto">
              
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-3 text-white text-[11px] uppercase tracking-[0.22em] font-semibold px-7 py-3.5 border border-white/55 hover:bg-white hover:text-[#111111] hover:border-white transition-all duration-300 mb-20"
              >
                  {slide.cta}
                  <ArrowRight size={13} />
                </button>

                {/* AnimatePresence for text zoom out effect */}
                <div className="w-full relative h-[180px] md:h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 flex flex-col"
                    >
                      <h1
                        className="text-white font-black uppercase whitespace-pre-line leading-[0.88] mb-6"
                        style={{
                          fontFamily: "Barlow, sans-serif",
                          fontSize: "clamp(1.4rem, 4.5vw, 4.5rem)", 
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {slide.title}
                      </h1>

                      <div className="flex flex-col gap-1">
                        <p className="text-white/60 text-[10px] uppercase tracking-[0.35em] font-light">
                          {slide.project}
                        </p>
                        <p className="text-white/75 text-base md:text-lg font-light max-w-sm">
                          {slide.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </motion.div>
            </div>

            {/* 4 Horizontal Progress Bars */}
            <motion.div className="flex items-center gap-2 mb-2 shrink-0 z-20 pointer-events-auto">
              {HERO_SLIDES.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setCurrent(idx);
                    setProgress(0);
                  }}
                  className="py-4 cursor-pointer group flex items-center justify-center" 
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className="w-12 md:w-16 h-[3px] bg-white/20 relative overflow-hidden group-hover:bg-white/50 transition-colors rounded-full">
                    {idx === current && (
                      <div
                        className="absolute left-0 top-0 h-full bg-white rounded-full"
                        style={{ width: `${progress}%`, transition: "none" }}
                      />
                    )}
                    {idx < current && (
                      <div className="absolute left-0 top-0 h-full w-full bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
  );
}
