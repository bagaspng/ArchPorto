import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { EASING } from "../../data/constants";

const ASPECT_CLASSES = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/7]",
};

export function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden bg-[#E8E6E0] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-project-slug={project.id} // Added for your custom spring cursor interaction
    >
      <div className={ASPECT_CLASSES[project.aspectRatio]}>
        <img
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: `transform 700ms ${EASING}`,
          }}
          loading="lazy"
        />
        {/* Hover info panel */}
        <div
          className="absolute inset-0 bg-[#111111]/72 flex flex-col justify-end p-5 md:p-6"
          style={{
            opacity: hovered ? 1 : 0,
            transition: `opacity 280ms ease`,
          }}
          aria-hidden={!hovered}
        >
          <div
            style={{
              transform: hovered ? "translateY(0)" : "translateY(12px)",
              transition: `transform 300ms ${EASING}`,
            }}
          >
            <p className="text-[#FF6B00] text-[9px] uppercase tracking-[0.3em] font-semibold mb-2">
              {project.category}
            </p>
            <h3
              className="text-white font-black text-lg uppercase leading-tight mb-2"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              {project.name}
            </h3>
            <p className="text-white/55 text-xs tracking-wide mb-4">
              {project.location} — {project.year}
            </p>
            <div className="flex items-center gap-2 text-[#FF6B00] text-[10px] uppercase tracking-[0.22em] font-semibold">
              View Project <ArrowRight size={11} />
            </div>
          </div>
        </div>
      </div>

      {/* Touch-accessible metadata */}
      <div className="md:hidden px-4 py-3 bg-[#F8F7F4] border-t border-[#111111]/6">
        <p className="text-[#FF6B00] text-[9px] uppercase tracking-[0.25em] font-semibold mb-0.5">
          {project.category}
        </p>
        <h3 className="text-[#111111] font-bold text-sm uppercase tracking-tight">
          {project.name}
        </h3>
        <p className="text-[#111111]/45 text-xs mt-0.5">
          {project.location} — {project.year}
        </p>
      </div>
    </div>
  );
}
