export function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/6 py-7 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-wrap">
          <span
            className="font-black uppercase text-sm tracking-[0.22em] text-[#F8F7F4]/85"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            FORMA<span style={{ color: "#FF6B00" }}>.</span>
          </span>
          <span className="text-[#F8F7F4]/22 text-[11px]">
            © {new Date().getFullYear()}
          </span>
          <span className="text-[#F8F7F4]/28 text-[11px] uppercase tracking-[0.14em]">
            Bandung, Indonesia
          </span>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { label: "Instagram", href: "https://instagram.com/formastudio" },
            { label: "Email", href: "mailto:hello@formastudio.id" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-[#F8F7F4]/35 text-[11px] uppercase tracking-[0.16em] hover:text-[#FF6B00] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#F8F7F4]/35 text-[11px] uppercase tracking-[0.16em] hover:text-[#FF6B00] transition-colors duration-200 focus:outline-none focus:text-[#FF6B00]"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
