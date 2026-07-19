import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES, EASING } from "../../data/constants";

const SLIDE_DURATION = 6000;
const SLIDE_TRANSITION = 750;

export function HeroCarousel({ onExploreClick }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const touchStartX = useRef(0);

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
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          aria-hidden={i !== current}
          style={{
            opacity: i === current ? (transitioning ? 0 : 1) : 0,
            transition: `opacity ${SLIDE_TRANSITION}ms ${EASING}`,
          }}
        >
          <img
            src={s.image}
            alt={s.project}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      ))}

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col justify-end max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
        <div className="max-w-4xl">
          <p
            className="text-white/50 text-[10px] uppercase tracking-[0.35em] font-light mb-5"
            style={{ opacity: transitioning ? 0 : 1, transition: `opacity 400ms ease` }}
          >
            {slide.project}
          </p>
          <h1
            className="text-white font-black uppercase whitespace-pre-line leading-[0.88] mb-7"
            style={{
              fontFamily: "Barlow, sans-serif",
              fontSize: "clamp(3.4rem, 8.5vw, 8.5rem)",
              letterSpacing: "-0.025em",
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(10px)" : "translateY(0)",
              transition: `opacity 450ms ${EASING}, transform 450ms ${EASING}`,
            }}
          >
            {slide.title}
          </h1>
          <p
            className="text-white/75 text-base md:text-lg font-light mb-10 max-w-sm"
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(8px)" : "translateY(0)",
              transition: `opacity 450ms ${EASING} 60ms, transform 450ms ${EASING} 60ms`,
            }}
          >
            {slide.subtitle}
          </p>
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 text-white text-[11px] uppercase tracking-[0.22em] font-semibold px-7 py-3.5 border border-white/55 hover:bg-white hover:text-[#111111] hover:border-white transition-all duration-300"
          >
            {slide.cta}
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Slide counter + progress */}
        <div className="absolute bottom-8 right-6 md:right-16 lg:right-24 flex flex-col items-end gap-3">
          <div className="flex items-center gap-3 text-white/50 text-[11px] tracking-[0.2em]">
            <button
              onClick={() => advance(-1)}
              className="hover:text-white transition-colors duration-200 p-1.5"
              aria-label="Previous slide"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-white font-semibold tabular-nums">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="text-white/30">/</span>
            <span className="tabular-nums">{String(HERO_SLIDES.length).padStart(2, "0")}</span>
            <button
              onClick={() => advance(1)}
              className="hover:text-white transition-colors duration-200 p-1.5"
              aria-label="Next slide"
            >
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="w-28 h-[1px] bg-white/20 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#FF6B00]"
              style={{ width: `${progress}%`, transition: "none" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
