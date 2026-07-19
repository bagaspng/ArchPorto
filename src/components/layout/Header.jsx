import { Menu, X } from "lucide-react";
import { EASING, WHATSAPP_URL } from "../../data/constants";

export function Header({ scrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: scrolled ? "60px" : "72px",
        background: scrolled ? "rgba(248, 247, 244, 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(17,17,17,0.08)" : "none",
        transition: `height 400ms ${EASING}, background 400ms ${EASING}, border-color 400ms ${EASING}`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-full flex items-center justify-between">
        <a
          href="#home"
          className="font-black uppercase tracking-[0.28em] text-[13px]"
          style={{
            fontFamily: "Barlow, sans-serif",
            color: scrolled ? "#111111" : "#ffffff",
            transition: `color 400ms ${EASING}`,
          }}
        >
          FORMA<span style={{ color: "#FF6B00" }}>.</span>
        </a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {["Home", "Projects", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.22em] font-semibold relative group"
              style={{
                color: scrolled ? "#111111" : "#ffffff",
                transition: `color 400ms ${EASING}`,
              }}
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
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.22em] font-semibold px-5 py-2.5 transition-all duration-300"
            style={{
              border: scrolled ? "1px solid #111111" : "1px solid rgba(255,255,255,0.6)",
              color: scrolled ? "#111111" : "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = scrolled ? "#111111" : "#ffffff";
              e.currentTarget.style.color = scrolled ? "#F8F7F4" : "#111111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = scrolled ? "#111111" : "#ffffff";
            }}
          >
            Start a Project
          </a>
        </nav>

        <button
          className="md:hidden p-2 transition-colors duration-300"
          style={{ color: scrolled ? "#111111" : "#ffffff" }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
