import { PROJECTS } from "../../data/constants";
import DirectionHover from "../shared/DirectionHover";

export function FeaturedIntro() {
  return (
    <section id="projects" className="py-12 md:py-16 px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 md:gap-6">
        
        {/* Left Side: Large Thin Text */}
        <div className="w-full md:w-3/4">
          <h2
            className="font-light uppercase leading-[0.91] text-[#111111] flex flex-col items-start gap-[0.05em]"
            style={{
              fontFamily: "Barlow, sans-serif",
              fontSize: "clamp(1.5rem, 4.5vw, 4.2rem)",
              letterSpacing: "-0.022em",
            }}
          >
            <DirectionHover title="EKSPLORASI RUANG MEMADUKAN" hoverColor="#FF6B00" />
            <DirectionHover title="MATERIAL, FUNGSI, " hoverColor="#FF6B00" />
            <DirectionHover title="DAN ESTETIKA." hoverColor="#FF6B00" />
          </h2>
        </div>

        {/* Right Side: Vertically Stacked Info */}
        <div className="w-full md:w-1/4 flex flex-col gap-4 pb-1">
          <p className="text-[#FF6B00] text-[10px] uppercase tracking-[0.35em] font-semibold md:text-right">
            01 — Karya Terpilih
          </p>
          <div className="h-px bg-[#111111]/12 w-full" />
          <p className="text-[#111111]/35 text-[10px] uppercase tracking-[0.25em] font-light md:text-right">
            {PROJECTS.length} Proyek
          </p>
        </div>

      </div>
    </section>
  );
}
