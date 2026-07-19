import { ArrowUp } from "lucide-react";
import { EASING } from "../../data/constants";

export function ScrollToTopButton({ show }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-8 left-6 md:left-8 z-40 w-11 h-11 border border-[#111111]/18 bg-[#F8F7F4] flex items-center justify-center text-[#111111]/60 hover:border-[#FF6B00] hover:text-[#FF6B00] focus:outline-none focus:border-[#FF6B00] focus:text-[#FF6B00]"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        pointerEvents: show ? "auto" : "none",
        transition: `opacity 400ms ${EASING}, transform 400ms ${EASING}`,
      }}
    >
      <ArrowUp size={14} />
    </button>
  );
}
