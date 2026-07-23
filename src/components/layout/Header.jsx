import { Menu, X } from "lucide-react";
import { EASING, WHATSAPP_URL } from "../../data/constants";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function Header({ scrollState, mobileMenuOpen, setMobileMenuOpen }) {
  const isPastHero = scrollState === "past_hero";
  const isScrollingHero = scrollState === "scrolling_hero";
  
  const { scrollY } = useScroll();
  
  // Create a raw transform that moves up by 120px when scrolling 120px
  const rawYNav = useTransform(scrollY, [0, 120], [0, -120]);
  
  // Wrap it in a physics-based spring for buttery smooth momentum!
  const yNav = useSpring(rawYNav, { stiffness: 100, damping: 25, mass: 0.5 });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${isScrollingHero ? 'pointer-events-none' : ''}`}
      style={{
        height: "96px", // Diperbesar dari 72px
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        {/* LOGO */}
        <motion.a
          href="#home"
          className="font-black uppercase tracking-[0.28em] text-[24px] pointer-events-auto"
          style={{
            fontFamily: "Barlow, sans-serif",
            color: "#ffffff",
            y: yNav,
          }}
        >
          APEDESIGN<span style={{ color: "#FF6B00" }}>.</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {/* NAVIGATION LINKS */}
          <motion.div 
            className="flex items-center gap-10 pointer-events-auto"
            style={{ y: yNav }}
          >
            {["Home", "Projects", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.22em] font-semibold relative group"
                style={{ color: "#ffffff" }}
              >
                {item}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[#FF6B00] transition-all duration-300"
                  style={{ width: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
                  onMouseLeave={(e) => (e.currentTarget.style.width = "0")}
                />
              </a>
            ))}
          </motion.div>
          
          {/* START PROJECT BUTTON */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.22em] font-semibold px-5 py-3 transition-colors duration-300 pointer-events-auto"
            initial={false}
            animate={{
              y: isPastHero ? 0 : 0, 
            }}
            style={{
              border: isPastHero ? "1px solid transparent" : "1px solid rgba(255,255,255,0.6)",
              color: isPastHero ? "#ffffff" : "#ffffff",
              background: isPastHero ? "#111111" : "transparent",
              y: isPastHero ? 0 : yNav, 
            }}
            onMouseEnter={(e) => {
              if (isPastHero) {
                e.currentTarget.style.background = "#FF6B00";
              } else {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#111111";
              }
            }}
            onMouseLeave={(e) => {
              if (isPastHero) {
                e.currentTarget.style.background = "#111111";
              } else {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
          >
            Start a Project
          </motion.a>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <motion.button
          className="md:hidden p-2 transition-colors duration-300 pointer-events-auto"
          style={{ 
            color: isPastHero ? "#111111" : "#ffffff",
            background: isPastHero ? "rgba(248, 247, 244, 0.9)" : "transparent",
            borderRadius: "50%",
            y: isPastHero ? 0 : yNav,
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>
    </header>
  );
}
