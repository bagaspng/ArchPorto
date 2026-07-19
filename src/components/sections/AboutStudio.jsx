import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "../../data/constants";

export function AboutStudio() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-[#111111]/8">
      <div className="px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <p className="text-[#FF6B00] text-[10px] uppercase tracking-[0.35em] font-semibold whitespace-nowrap">
            02 — Studio
          </p>
          <div className="flex-1 h-px bg-[#111111]/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Statement */}
          <div className="lg:col-span-5">
            <h2
              className="font-black uppercase leading-[0.9] text-[#111111]"
              style={{
                fontFamily: "Barlow, sans-serif",
                fontSize: "clamp(1.75rem, 3.2vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Architecture should create a meaningful relationship between material, light, people, and place.
            </h2>
          </div>

          {/* Portrait column */}
          <div className="lg:col-span-3">
            <div className="aspect-[3/4] overflow-hidden bg-[#E8E6E0] mb-5">
              <img
                src="https://images.unsplash.com/photo-1580399017842-9858b3b0e74b?w=600&h=800&fit=crop&auto=format"
                alt="Principal architect in natural light"
                className="w-full h-full object-cover grayscale"
                loading="lazy"
              />
            </div>
            <p
              className="text-[#111111] font-black uppercase text-sm tracking-[0.12em]"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              Adi Santoso
            </p>
            <p className="text-[#111111]/45 text-[10px] uppercase tracking-[0.22em] mt-1">
              Principal Architect
            </p>
          </div>

          {/* Details column */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <p className="text-[#111111]/65 text-sm leading-relaxed font-light">
              Forma Studio is an independent architecture practice based in Bandung, Indonesia. We work across residential, cultural, and hospitality projects with a commitment to material honesty, spatial quality, and the particular conditions of each site.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "12", label: "Years" },
                { value: "48", label: "Projects" },
                { value: "6", label: "Countries" },
                { value: "3", label: "Awards" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-black text-[2.6rem] text-[#111111] leading-none"
                    style={{ fontFamily: "Barlow, sans-serif" }}
                  >
                    {value}
                  </p>
                  <p className="text-[#111111]/38 text-[10px] uppercase tracking-[0.22em] mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[#111111]/35 text-[9px] uppercase tracking-[0.35em] mb-4">
                Services
              </p>
              <div className="flex flex-col">
                {[
                  "Architectural Design",
                  "Residential Design",
                  "Interior Architecture",
                  "Renovation",
                  "Spatial Planning",
                  "Design Consultation",
                ].map((service, i) => (
                  <div
                    key={service}
                    className="flex items-center justify-between py-2.5 border-b border-[#111111]/7"
                  >
                    <span className="text-[#111111]/65 text-xs font-light">{service}</span>
                    <span className="text-[#111111]/22 text-[10px] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold px-7 py-3.5 bg-[#111111] text-[#F8F7F4] hover:bg-[#FF6B00] transition-colors duration-300 w-fit focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              Start Your Project
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
