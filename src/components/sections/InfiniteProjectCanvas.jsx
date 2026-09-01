import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { X, Plus, Minus, RotateCcw, Compass } from "lucide-react";
import { EXPLORER_PROJECTS } from "../../data/constants";
import { getImageUrl } from "../../utils/cdn";

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT CONSTANTS — Consistent 16px (gap-4) spacing everywhere
// ─────────────────────────────────────────────────────────────────────────────
const NUM_COLUMNS = 6;
const COLUMN_WIDTH = 370;
const GAP = 16;             // gap-4 (16px) konsisten antar kolom dan antar item
const CANVAS_PADDING = 16;  // gap-4 (16px) margin di semua batas luar container
const SAFE_PADDING = 16;    // 16px margin batas pan sebelum berhenti

// Distribusi 50 item ke 6 kolom secara simetris dan seimbang:
// Kolom 0-5 memiliki jumlah item: [8, 8, 9, 9, 8, 8] = total 50 item
const COLUMN_ITEM_COUNTS = [6, 7, 7, 7, 8, 9, 6];

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS CONSTANTS — ice-skating glide
// ─────────────────────────────────────────────────────────────────────────────
const GLIDE_DECAY = 0.95;
const VELOCITY_SCALE = 18;
const GLIDE_THRESHOLD = 0.25;

// ─────────────────────────────────────────────────────────────────────────────
// ZOOM LIMITS
// ─────────────────────────────────────────────────────────────────────────────
const MIN_ZOOM = 1;
const MAX_ZOOM = 2;

export function InfiniteProjectCanvas({ onClose }) {
  const containerRef = useRef(null);
  const worldRef = useRef(null);

  // Physics refs
  const offsetRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1.0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });
  const animFrameRef = useRef(null);

  const [offset, setOffsetState] = useState({ x: 0, y: 0 });
  const [zoom, setZoomState] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Measured real-time bounding box from rendered flex flow
  const [contentBounds, setContentBounds] = useState({
    minX: 0,
    minY: 0,
    maxX: NUM_COLUMNS * COLUMN_WIDTH + (NUM_COLUMNS - 1) * GAP + CANVAS_PADDING * 2,
    maxY: 2400,
  });

  // Sync ref + state together
  const setOffset = useCallback((val) => {
    const next = typeof val === "function" ? val(offsetRef.current) : val;
    offsetRef.current = next;
    setOffsetState(next);
  }, []);

  const setZoom = useCallback((val) => {
    const next = typeof val === "function" ? val(zoomRef.current) : val;
    const clamped = Math.min(Math.max(next, MIN_ZOOM), MAX_ZOOM);
    zoomRef.current = clamped;
    setZoomState(clamped);
  }, []);

  const dragRef = useRef({ active: false, startX: 0, startY: 0, startOx: 0, startOy: 0 });
  const touchRef = useRef({ active: false, startX: 0, startY: 0, startOx: 0, startOy: 0, pinchDist: null, pinchZoom: 1.0 });

  // ─── Symmetrical, balanced column distribution ────────────────────────────
  const columns = useMemo(() => {
    const cols = [];
    let itemIdx = 0;
    for (let c = 0; c < NUM_COLUMNS; c++) {
      const count = COLUMN_ITEM_COUNTS[c];
      cols.push(EXPLORER_PROJECTS.slice(itemIdx, itemIdx + count));
      itemIdx += count;
    }
    return cols;
  }, []);

  // ─── Real-time measurement of content bounds via ResizeObserver ───────────
  useEffect(() => {
    const el = worldRef.current;
    if (!el) return;

    const updateBounds = () => {
      const w = el.offsetWidth || el.scrollWidth;
      const h = el.offsetHeight || el.scrollHeight;
      if (w > 0 && h > 0) {
        setContentBounds({
          minX: 0,
          minY: 0,
          maxX: w,
          maxY: h,
        });
      }
    };

    updateBounds();
    const ro = new ResizeObserver(updateBounds);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ─── Clamp offset to prevent panning into empty space ────────────────────
  const clampOffset = useCallback(
    (raw, currentZoom) => {
      if (!containerRef.current) return raw;
      const vw = containerRef.current.clientWidth || window.innerWidth;
      const vh = containerRef.current.clientHeight || window.innerHeight;
      const z = currentZoom ?? zoomRef.current;
      const sp = SAFE_PADDING;

      const totalW = contentBounds.maxX * z;
      const totalH = contentBounds.maxY * z;

      let clampedX;
      if (totalW + sp * 2 <= vw) {
        // Konten lebih kecil dari viewport: posisikan di tengah
        clampedX = (vw - totalW) / 2;
      } else {
        const minOx = vw - contentBounds.maxX * z - sp;
        const maxOx = -contentBounds.minX * z + sp;
        clampedX = Math.min(Math.max(raw.x, minOx), maxOx);
      }

      let clampedY;
      if (totalH + sp * 2 <= vh) {
        // Konten lebih kecil dari viewport: posisikan di tengah
        clampedY = (vh - totalH) / 2;
      } else {
        const minOy = vh - contentBounds.maxY * z - sp;
        const maxOy = -contentBounds.minY * z + sp;
        clampedY = Math.min(Math.max(raw.y, minOy), maxOy);
      }

      return { x: clampedX, y: clampedY };
    },
    [contentBounds]
  );

  // Wrapped setOffset that always clamps
  const setOffsetClamped = useCallback(
    (val) => {
      const raw = typeof val === "function" ? val(offsetRef.current) : val;
      const clamped = clampOffset(raw, zoomRef.current);
      offsetRef.current = clamped;
      setOffsetState(clamped);
    },
    [clampOffset]
  );

  // ─── Center viewport on canvas content on mount ──────────────────────────
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const contentW = contentBounds.maxX - contentBounds.minX;
    const contentH = contentBounds.maxY - contentBounds.minY;
    const cx = vw / 2 - (contentBounds.minX + contentW / 2);
    const cy = vh / 2 - (contentBounds.minY + contentH / 2);
    const clamped = clampOffset({ x: cx, y: cy }, 1.0);
    offsetRef.current = clamped;
    setOffsetState(clamped);
    zoomRef.current = 1.0;
    setZoomState(1.0);
  }, [contentBounds, clampOffset]);

  // ─── Resize handler — re-clamp on viewport change ────────────────────────
  useEffect(() => {
    const onResize = () => {
      setOffsetClamped(offsetRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [setOffsetClamped]);

  // ─── Ice-skating momentum glide ──────────────────────────────────────────
  const startGlide = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    const tick = () => {
      velocityRef.current.x *= GLIDE_DECAY;
      velocityRef.current.y *= GLIDE_DECAY;
      if (
        Math.abs(velocityRef.current.x) > GLIDE_THRESHOLD ||
        Math.abs(velocityRef.current.y) > GLIDE_THRESHOLD
      ) {
        setOffsetClamped((prev) => ({
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y,
        }));
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, [setOffsetClamped]);

  // ─── Mouse drag ───────────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(animFrameRef.current);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startOx: offsetRef.current.x,
      startOy: offsetRef.current.y,
    };
    lastMouseRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    velocityRef.current = { x: 0, y: 0 };
    setIsDragging(true);
    setShowHint(false);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const now = performance.now();
      const dt = Math.max(now - lastMouseRef.current.time, 8);
      velocityRef.current = {
        x: ((e.clientX - lastMouseRef.current.x) / dt) * VELOCITY_SCALE,
        y: ((e.clientY - lastMouseRef.current.y) / dt) * VELOCITY_SCALE,
      };
      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
      setOffsetClamped({
        x: dragRef.current.startOx + dx,
        y: dragRef.current.startOy + dy,
      });
    };
    const onUp = () => {
      if (dragRef.current.active) {
        dragRef.current.active = false;
        setIsDragging(false);
        startGlide();
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [startGlide, setOffsetClamped]);

  // ─── Wheel: zoom-to-cursor (Ctrl) + smooth pan ───────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      cancelAnimationFrame(animFrameRef.current);
      setShowHint(false);

      if (e.ctrlKey || e.metaKey) {
        // Zoom toward cursor
        const rect = el.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const prevZoom = zoomRef.current;
        const factor = e.deltaY < 0 ? 1.08 : 0.93;
        const nextZoom = Math.min(Math.max(prevZoom * factor, MIN_ZOOM), MAX_ZOOM);
        const scale = nextZoom / prevZoom;

        const rawOx = mouseX - scale * (mouseX - offsetRef.current.x);
        const rawOy = mouseY - scale * (mouseY - offsetRef.current.y);
        const clamped = clampOffset({ x: rawOx, y: rawOy }, nextZoom);

        zoomRef.current = nextZoom;
        setZoomState(nextZoom);
        offsetRef.current = clamped;
        setOffsetState(clamped);
      } else {
        // Pan with smooth ice-skating feel
        const speed = 1.15;
        setOffsetClamped((prev) => ({
          x: prev.x - e.deltaX * speed,
          y: prev.y - e.deltaY * speed,
        }));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clampOffset, setOffsetClamped]);

  // ─── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      const step = 100;
      if (e.key === "ArrowLeft")  setOffsetClamped((o) => ({ ...o, x: o.x + step }));
      if (e.key === "ArrowRight") setOffsetClamped((o) => ({ ...o, x: o.x - step }));
      if (e.key === "ArrowUp")    setOffsetClamped((o) => ({ ...o, y: o.y + step }));
      if (e.key === "ArrowDown")  setOffsetClamped((o) => ({ ...o, y: o.y - step }));
      if (e.key === "+" || e.key === "=") setZoom((z) => z + 0.12);
      if (e.key === "-") setZoom((z) => z - 0.12);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, setOffsetClamped, setZoom]);

  // ─── Lock body scroll ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ─── Reset to center ──────────────────────────────────────────────────────
  const resetView = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const contentW = contentBounds.maxX - contentBounds.minX;
    const contentH = contentBounds.maxY - contentBounds.minY;
    const cx = vw / 2 - (contentBounds.minX + contentW / 2);
    const cy = vh / 2 - (contentBounds.minY + contentH / 2);
    const clamped = clampOffset({ x: cx, y: cy }, 1.0);
    zoomRef.current = 1.0;
    setZoomState(1.0);
    offsetRef.current = clamped;
    setOffsetState(clamped);
  }, [contentBounds, clampOffset]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden select-none bg-[#F8F7F4]"
      role="dialog"
      aria-modal="true"
      aria-label="Album 50 Proyek Arsitektur"
    >
      {/* Dot grid background — shifts with pan for parallax depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.13) 1.2px, transparent 1.2px)",
          backgroundSize: "38px 38px",
          backgroundPosition: `${((offset.x * zoom) % 38 + 38) % 38}px ${((offset.y * zoom) % 38 + 38) % 38}px`,
        }}
      />

      {/* ── Canvas Viewport ── */}
      <div
        className="absolute inset-0"
        style={{ cursor: isDragging ? "grabbing" : "none" }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          setShowHint(false);
          cancelAnimationFrame(animFrameRef.current);
          if (e.touches.length === 1) {
            const t = e.touches[0];
            touchRef.current = { active: true, startX: t.clientX, startY: t.clientY, startOx: offset.x, startOy: offset.y, pinchDist: null, pinchZoom: zoom };
          } else if (e.touches.length === 2) {
            const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            touchRef.current.pinchDist = d;
            touchRef.current.pinchZoom = zoom;
          }
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          if (e.touches.length === 1 && touchRef.current.active) {
            setOffsetClamped({ x: touchRef.current.startOx + e.touches[0].clientX - touchRef.current.startX, y: touchRef.current.startOy + e.touches[0].clientY - touchRef.current.startY });
          } else if (e.touches.length === 2 && touchRef.current.pinchDist) {
            const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            setZoom(touchRef.current.pinchZoom * (d / touchRef.current.pinchDist));
          }
        }}
        onTouchEnd={() => { touchRef.current.active = false; }}
      >
        {/* ── Canvas World Container ── */}
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
            transformOrigin: "0 0",
            willChange: "transform",
            padding: `${CANVAS_PADDING}px`,
          }}
        >
          {/* Ambient watermark header */}
          <div className="flex items-center justify-between mb-4 px-1 pointer-events-none select-none">
            <p
              className="font-black uppercase text-[#111111]/7 text-xs md:text-sm tracking-[0.34em]"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              APEDESIGN STUDIO — ARCHIVE 2024–2026
            </p>
            <p
              className="font-semibold uppercase text-[#111111]/7 text-[10px] tracking-[0.24em]"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              50 SELECTED WORKS
            </p>
          </div>

          {/* ── Cohesive Editorial Masonry: Consistent gap-4 (16px) everywhere ── */}
          <div
            className="flex gap-4 items-start"
            style={{ width: "max-content" }}
          >
            {columns.map((colItems, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-col gap-4"
                style={{ width: `${COLUMN_WIDTH}px` }}
              >
                {colItems.map((item) => (
                  <div
                    key={item.id}
                    data-explorer-id={item.id}
                    className="group relative overflow-hidden cursor-none"
                  >
                    <div className="relative w-full overflow-hidden bg-[#E8E6E1]">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        draggable={false}
                        loading="lazy"
                      />
                      {/* Hover vignette */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,107,0,0.5)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating Hint ── */}
      {showHint && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#111111]/88 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.32em] px-8 py-4 shadow-2xl flex items-center gap-3 animate-pulse border border-white/10">
            <Compass size={14} className="text-[#FF6B00]" />
            Geser bebas — Scroll / Drag / Panah Keyboard
          </div>
        </div>
      )}

      {/* ── Top Bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 py-4 bg-[#F8F7F4]/94 backdrop-blur-md border-b border-[#111111]/8">
        <div>
          <p className="text-[#FF6B00] text-[9px] uppercase tracking-[0.34em] font-semibold leading-none mb-1">
            Album Proyek
          </p>
          <p className="text-[#111111] font-black text-sm uppercase tracking-tight" style={{ fontFamily: "Barlow, sans-serif" }}>
            {EXPLORER_PROJECTS.length} Karya Arsitektur — 2024–2026
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-[#111111]/45 text-[10px] uppercase tracking-[0.16em]">
             • Drag untuk Jelajahi
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-2 border border-[#111111]/20 bg-[#F8F7F4] text-[#111111] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors duration-200 focus:outline-none cursor-pointer"
            aria-label="Tutup kanvas"
          >
            <X size={14} />
            Tutup
          </button>
        </div>
      </div>

      {/* ── Zoom Controls ── */}
      <div className="absolute bottom-8 right-6 md:right-10 flex flex-col gap-1.5">
        {[
          { label: "Perbesar (+)", icon: <Plus size={14} />, action: () => setZoom((z) => z + 0.15) },
          { label: "Perkecil (-)", icon: <Minus size={18} />, action: () => setZoom((z) => z - 0.15) },
          { label: "Reset (0)",    icon: <RotateCcw size={20} />, action: resetView },
        ].map(({ label, icon, action }) => (
          <button
            key={label}
            onClick={action}
            aria-label={label}
            title={label}
            className="w-10 h-10 border border-[#111111]/18 bg-[#F8F7F4] flex items-center justify-center text-[#111111]/70 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors duration-200 focus:outline-none cursor-pointer"
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
