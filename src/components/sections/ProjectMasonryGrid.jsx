import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../../data/constants";
import { ProjectCard } from "../shared/ProjectCard";

export function ProjectMasonryGrid({ onExploreCanvas }) {
  return (
    <section id="projects" className="px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto pb-20 md:pb-28">
      <div
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5"
        style={{ columnFill: "balance" }}
      >
        {PROJECTS.map((project) => (
          <div key={project.id} className="break-inside-avoid mb-4 md:mb-5">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14 md:mt-20">
        <button
          onClick={onExploreCanvas}
          className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] font-semibold px-10 py-4 border border-[#FF6B00] text-[#111111] transition-all duration-300 group hover:bg-[#FF6B00] hover:text-white"
        >
          Enter Project Archive
          <ArrowRight
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}
