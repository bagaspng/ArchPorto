import { ArrowRight, Camera, Mail, MessageCircle, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "../../data/constants";

export function ContactSection() {
  const contacts = [
    { icon: MessageCircle, label: "WhatsApp", value: "Start a Conversation", href: WHATSAPP_URL, primary: true },
    { icon: Camera, label: "Instagram", value: "@formastudio.id", href: "https://instagram.com/formastudio" },
    { icon: Mail, label: "Email", value: "hello@formastudio.id", href: "mailto:hello@formastudio.id" },
    { icon: MapPin, label: "Studio", value: "Bandung, West Java, Indonesia", href: null },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-white/8 bg-[#111111]">
      <div className="px-6 md:px-16 lg:px-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-6">
            <p className="text-[#FF6B00] text-[10px] uppercase tracking-[0.35em] font-semibold mb-8">
              03 — Contact
            </p>
            <h2
              className="font-black uppercase leading-[0.88] text-[#F8F7F4]"
              style={{
                fontFamily: "Barlow, sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Let's build
              <br />
              something
              <br />
              <span style={{ color: "#FF6B00" }}>together.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-9">
            <p className="text-[#F8F7F4]/55 text-sm font-light leading-relaxed max-w-sm">
              We take on a select number of projects each year. If you have a project in mind, we would welcome the conversation.
            </p>

            <div className="flex flex-col">
              {contacts.map(({ icon: Icon, label, value, href, primary }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-4 border-b border-white/8"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={13} color={primary ? "#FF6B00" : "rgba(248,247,244,0.35)"} />
                    <span className="text-[#F8F7F4]/35 text-[10px] uppercase tracking-[0.22em]">
                      {label}
                    </span>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-light transition-colors duration-200 hover:text-[#FF6B00]"
                      style={{ color: primary ? "#FF6B00" : "rgba(248,247,244,0.8)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[#F8F7F4]/70 text-sm font-light">{value}</span>
                  )}
                </div>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold px-8 py-4 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-[#111111] transition-all duration-300 group w-fit focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              Start Your Project
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
