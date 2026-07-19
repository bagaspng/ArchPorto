import { PROJECTS } from "../../data/constants";

export function FeaturedIntro() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="md:col-span-3 flex flex-col gap-4">
          <p className="text-[#FF6B00] text-[10px] uppercase tracking-[0.35em] font-semibold">
            01 — Selected Works
          </p>
          <div className="h-px bg-[#111111]/12 w-full" />
        </div>
        <div className="md:col-span-6">
          <h2
            className="font-black uppercase leading-[0.91] text-[#111111]"
            style={{
              fontFamily: "Barlow, sans-serif",
              fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)",
              letterSpacing: "-0.022em",
            }}
          >
            Spaces shaped by material,
            <br />
            light, and context.
          </h2>
        </div>
        <div className="md:col-span-3 md:text-right">
          <p className="text-[#111111]/35 text-[10px] uppercase tracking-[0.25em] font-light">
            {PROJECTS.length} Projects
          </p>
        </div>
      </div>
    </section>
  );
}
