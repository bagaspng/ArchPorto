import { useEffect } from "react";
import { EASING, WHATSAPP_URL } from "../../data/constants";

export function MobileMenu({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col"
      style={{
        background: "#111111",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: `opacity 450ms ${EASING}`,
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      <div className="flex flex-col h-full px-8 pt-28 pb-12">
        <nav className="flex flex-col gap-2">
          {[
            { label: "Home", href: "#home" },
            { label: "Projects", href: "#projects" },
            { label: "About", href: "#about" },
          ].map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={onClose}
              className="font-black uppercase leading-none py-4 border-b border-white/8 transition-colors duration-200 hover:text-[#FF6B00]"
              style={{
                fontFamily: "Barlow, sans-serif",
                fontSize: "clamp(2.8rem, 10vw, 4.5rem)",
                color: "#F8F7F4",
                letterSpacing: "-0.02em",
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transition: `transform 500ms ${EASING} ${i * 60}ms, opacity 400ms ease ${i * 60}ms, color 200ms ease`,
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-5">
          <div className="h-px bg-white/10 mb-2" />
          {[
            { label: "Instagram", href: "https://instagram.com/formastudio" },
            { label: "Email", href: "mailto:hello@formastudio.id" },
            { label: "WhatsApp", href: WHATSAPP_URL },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={onClose}
              className="text-white/50 text-xs uppercase tracking-[0.25em] hover:text-[#FF6B00] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
