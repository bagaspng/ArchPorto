import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_SLIDES, EASING } from "../../data/constants";

const SLIDE_DURATION = 6000;
const SLIDE_TRANSITION = 750;

export function HeroCarousel({ onExploreClick }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const touchStartX = useRef(0);

  // Parallax setup
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 350]); // Image moves down slower
  // Text, button, and progress bar drop downwards naturally proportional to scroll
  const yPopDown = useTransform(scrollY, [0, 1000], [0, 500]); 

  const advance = useCallback((dir) => {
    if (transitioning) return;
    setTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrent((c) => (c + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
      setTransitioning(false);
    }, SLIDE_TRANSITION);
  }, [transitioning]);

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
      {/* Background Images with Parallax */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: yImage }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0"
            aria-hidden={i !== current}
            style={{
              opacity: i === current ? (transitioning ? 0 : 1) : 0,
              transition: `opacity ${SLIDE_TRANSITION}ms ease-out`,
            }}
          >
            <img
              src={s.image}
              alt={s.project}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}
      </motion.div>

      {/* Hero content with Parallax */}
      <div 
        className="absolute inset-0 flex flex-col justify-end max-w-[1440px] mx-auto px-6 md:px-16 pb-6 md:pb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-10">
          <div className="max-w-4xl flex flex-col items-start w-full relative">
            
            {/* ELEMEN YANG BERGERAK KE BAWAH BERSAMAAN (POP OUT DOWN) */}
            <motion.div style={{ y: yPopDown }} className="w-full flex flex-col items-start">
              
              {/* 1. BUTTON CTA (Kini ikut bergerak bersama teks) */}
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-3 text-white text-[11px] uppercase tracking-[0.22em] font-semibold px-7 py-3.5 border border-white/55 hover:bg-white hover:text-[#111111] hover:border-white transition-all duration-300 mb-8"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? "translateY(10px)" : "translateY(0)",
                  transition: `opacity 400ms ease`,
                }}
              >
                {slide.cta}
                <ArrowRight size={13} />
              </button>

              {/* 2. TEKS BESAR / JUDUL UTAMA */}
              <h1
                className="text-white font-black uppercase whitespace-pre-line leading-[0.88] mb-6"
                style={{
                  fontFamily: "Barlow, sans-serif",
                  fontSize: "clamp(2.4rem, 6.5vw, 6.5rem)", /* Ubah clamp() ini untuk custom ukuran font responsif */
                  letterSpacing: "-0.025em",
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? "translateY(10px)" : "translateY(0)",
                  transition: `opacity 450ms ease-out, transform 450ms ease-out`,
                }}
              >
                {slide.title}
              </h1>

              {/* 3. TEKS KECIL / ALAMAT */}
              <div
                className="flex flex-col gap-1"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? "translateY(8px)" : "translateY(0)",
                  transition: `opacity 450ms ease-out 60ms, transform 450ms ease-out 60ms`,
                }}
              >
                <p className="text-white/60 text-[10px] uppercase tracking-[0.35em] font-light">
                  {slide.project}
                </p>
                <p className="text-white/75 text-base md:text-lg font-light max-w-sm">
                  {slide.subtitle}
                </p>
              </div>
            </motion.div>
          </div>

          {/* 4 Horizontal Progress Bars (POP OUT DOWN) */}
          <motion.div className="flex items-center gap-2 mb-2 shrink-0" style={{ y: yPopDown }}>
            {HERO_SLIDES.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  if (idx === current) return;
                  setCurrent(idx);
                  setProgress(0);
                }}
                className="w-12 md:w-16 h-[3px] bg-white/20 relative overflow-hidden cursor-pointer hover:bg-white/40 transition-colors"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === current && (
                  <div
                    className="absolute left-0 top-0 h-full bg-white"
                    style={{ width: `${progress}%`, transition: "none" }}
                  />
                )}
                {idx < current && (
                  <div className="absolute left-0 top-0 h-full w-full bg-white" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
