import { useState, useRef, useEffect } from "react";
import { X, Plus, Minus, RotateCcw } from "lucide-react";
import { CANVAS_PROJECTS } from "../../data/constants";

export function InfiniteProjectCanvas({ onClose }) {
  const [offset, setOffset] = useState({ x: -120, y: -80 });
  const [zoom, setZoom] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startOx: 0,
    startOy: 0,
  });
  const touchRef = useRef({ startX: 0, startY: 0, startOx: 0, startOy: 0 });

  useEffect(() => {
    const move = (e) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setOffset({ x: dragRef.current.startOx + dx, y: dragRef.current.startOy + dy });
    };
    const up = () => {
      dragRef.current.active = false;
      setIsDragging(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleMouseDown = (e) => {
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, startOx: offset.x, startOy: offset.y };
    setIsDragging(true);
    setShowHint(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "#F8F7F4" }}
      role="dialog"
      aria-modal="true"
      aria-label="Project archive canvas"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: `${((offset.x * zoom) % 32 + 32) % 32}px ${((offset.y * zoom) % 32 + 32) % 32}px`,
        }}
      />

      {/* Canvas viewport */}
      <div
        className="absolute inset-0"
        style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          setShowHint(false);
          const t = e.touches[0];
          touchRef.current = { startX: t.clientX, startY: t.clientY, startOx: offset.x, startOy: offset.y };
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          const t = e.touches[0];
          setOffset({
            x: touchRef.current.startOx + (t.clientX - touchRef.current.startX),
            y: touchRef.current.startOy + (t.clientY - touchRef.current.startY),
          });
        }}
      >
        <div
          style={{
            position: "absolute",
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {CANVAS_PROJECTS.map((item) => (
            <div
              key={item.id}
              className="absolute group"
              style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-[#111111]/74 flex flex-col justify-end p-5"
                style={{
                  opacity: hoveredId === item.id ? 1 : 0,
                  transition: "opacity 250ms ease",
                }}
              >
                <p className="text-[#FF6B00] text-[9px] uppercase tracking-[0.28em] font-semibold mb-1">
                  {item.category} — {item.year}
                </p>
                <h3
                  className="text-white font-black text-base uppercase leading-tight"
                  style={{ fontFamily: "Barlow, sans-serif" }}
                >
                  {item.name}
                </h3>
              </div>
            </div>
          ))}

          {/* Ambient editorial text */}
          <div className="absolute pointer-events-none select-none" style={{ left: 260, top: 1180 }}>
            <p
              className="font-black uppercase text-[#111111]/10"
              style={{ fontFamily: "Barlow, sans-serif", fontSize: "80px", letterSpacing: "-0.04em" }}
            >
              FORMA
            </p>
          </div>
          <div className="absolute pointer-events-none select-none" style={{ left: 1300, top: 460 }}>
            <p
              className="font-black uppercase text-[#111111]/8"
              style={{ fontFamily: "Barlow, sans-serif", fontSize: "52px", letterSpacing: "-0.02em" }}
            >
              2020–2026
            </p>
          </div>
        </div>
      </div>

      {/* Drag hint */}
      {showHint && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#111111]/80 text-white text-[10px] uppercase tracking-[0.3em] px-7 py-3.5 animate-pulse">
            Drag to explore
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 py-4 bg-[#F8F7F4]/92 backdrop-blur-sm border-b border-[#111111]/8">
        <div>
          <p className="text-[#FF6B00] text-[9px] uppercase tracking-[0.32em] font-semibold leading-none mb-1">
            Project Archive
          </p>
          <p
            className="text-[#111111] font-black text-sm uppercase tracking-tight"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            {CANVAS_PROJECTS.length} Projects — 2020–2026
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#111111] hover:text-[#FF6B00] transition-colors duration-200 focus:outline-none focus:text-[#FF6B00]"
          aria-label="Close canvas"
        >
          <X size={15} />
          Close
        </button>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-8 right-6 md:right-10 flex flex-col gap-1.5">
        {[
          { label: "Zoom in", icon: <Plus size={14} />, action: () => setZoom((z) => Math.min(z + 0.15, 2)) },
          { label: "Zoom out", icon: <Minus size={14} />, action: () => setZoom((z) => Math.max(z - 0.15, 0.3)) },
          { label: "Reset view", icon: <RotateCcw size={13} />, action: () => { setOffset({ x: -120, y: -80 }); setZoom(0.8); } },
        ].map(({ label, icon, action }) => (
          <button
            key={label}
            onClick={action}
            aria-label={label}
            className="w-9 h-9 border border-[#111111]/18 bg-[#F8F7F4] flex items-center justify-center text-[#111111]/60 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors duration-200 focus:outline-none focus:border-[#FF6B00]"
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
