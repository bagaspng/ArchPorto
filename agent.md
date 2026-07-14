Website portofolio studio arsitektur, satu halaman filosofi dari brand kitchen Scandinavian Stykka:
UI yang sengaja "menghilang" agar fotografi karya menjadi satu-satunya hal yang diingat pengunjung.
Tidak ada warna aksen mencolok, tidak ada shadow berlapis, tidak ada dekorasi — hanya tipografi presisi,
white space editorial, dan foto full-bleed berkualitas tinggi.

Perbedaan dari Stykka (supaya tidak terasa jiplakan):
Situs ini menambahkan satu signature element yang berakar dari dunia arsitektur: lapisan anotasi teknis
ala gambar kerja arsitek (koordinat, nomor proyek, skala, material) yang muncul halus di atas foto saat
discroll — meniru bagaimana arsitek membaca site plan dan elevation drawing. Elemen ini yang membuat
identitas visual situs terasa spesifik untuk arsitektur, bukan sekadar "Stykka tapi bangunan".

Prioritas desain (urutan kepentingan):


Foto proyek — resolusi tinggi, full-bleed, rasio konsisten
Tipografi — pairing serif berkarakter + sans presisi + mono teknis
Motion — halus, bertujuan, tidak berlebihan (respects prefers-reduced-motion)
Kemudahan update konten oleh non-developer (Anda)



2. Design Token System

2.1 Warna (4 warna inti + 1 aksen sangat terbatas)

NamaHexPenggunaanpaper#FAFAF8Background utamaink#12120ETeks utama, hampir hitam (bukan #000 murni — lebih hangat)concrete#8B8A82Teks sekunder, label, metadataline#E4E2DCHairline border/divider, sangat tipisbrass (aksen, dipakai <5% dari UI)#A9793FHANYA untuk: underline hover pada link, dot indikator aktif, garis anotasi koordinat. Tidak pernah untuk background/button fill.

Dark mode opsional, bukan prioritas awal — jika diminta nanti, invert paper↔ink.

2.2 Tipografi (pairing 3 peran, bukan default template)

PeranFontSumberKarakterDisplay (judul besar, hero)Fraunces (variable, optical size besar, italic untuk aksen kata)Google Fonts / next/fontSerif arsitektural, kontras tinggi, terasa dicetak bukan digitalBody & UIInterGoogle Fonts / next/fontTracking negatif di ukuran besar (-0.02em), netral di body textMetadata/teknis (label uppercase, koordinat, tahun, material)JetBrains MonoGoogle Fonts / next/fontMonospace — meniru anotasi gambar kerja arsitek

Skala tipe (rem, base 16px):

--text-display-xl: clamp(3rem, 8vw, 7rem);   /* hero headline, Fraunces, tracking -0.01em */
--text-display-lg: clamp(2rem, 5vw, 4rem);   /* section headline */
--text-body: 1rem;                            /* Inter, line-height 1.6 */
--text-label: 0.75rem;                        /* JetBrains Mono, uppercase, tracking 0.08em */

2.3 Spacing & Layout


Gap antar-elemen kecil dalam satu grup: 10px (mengikuti nuansa Stykka yang rapat & editorial)
Padding antar-section: clamp(80px, 12vw, 160px) — lapang, memberi foto ruang bernapas
Grid proyek: CSS grid 12 kolom, rasio foto konsisten 4:5 (potrait, khas dokumentasi arsitektur) dan 16:9 untuk foto eksterior/lanskap — jangan campur rasio dalam satu baris grid
Container max-width: 1600px, dengan margin fluid clamp(24px, 5vw, 96px)
Tidak ada border-radius pada foto (tegas, arsitektural) — border-radius kecil (4px) boleh untuk button/pill kecil saja


2.4 Motion Principles

Satu momen besar (page-load hero reveal) + micro-interactions halus. Jangan tumpuk banyak animasi kecil di banyak tempat — itu yang membuat desain terasa "AI-generated".


Hero load: foto full-bleed melakukan clip-path reveal (seperti aperture/shutter membuka) durasi 1.2s, headline fade+slide-up 0.6s tertunda 0.4s
Scroll reveal grid: foto proyek fade+translateY(20px) saat masuk viewport, stagger 80ms antar-item, sekali saja (tidak re-trigger)
Signature — annotation overlay: saat foto proyek di-hover (desktop) atau masuk fokus viewport (mobile), muncul lapisan tipis mono-font di sudut foto: nomor proyek, koordinat lokasi, tahun, material utama — fade in 200ms, posisi absolute, tidak mengganggu foto
Cursor custom (desktop only): dot kecil mengikuti cursor, membesar jadi lingkaran outline brass saat di atas foto (indikasi "view project") — gunakan mix-blend-mode bila perlu, matikan di touch device
Page transition antar index → project detail: shared element transition pada foto cover (Framer Motion layoutId)
Semua animasi wajib cek prefers-reduced-motion: reduce → fallback ke fade sederhana atau tanpa animasi



3. Struktur Halaman


Home / Index

Nav minimal (logo text-only kiri, menu kanan: Work / Studio / Contact)
Hero: 1 foto proyek unggulan full-bleed + headline pendek
Grid index proyek (foto + judul + lokasi + tahun, label mono kecil)
Section "Studio" singkat (filosofi 2-3 kalimat)
Footer: kontak, sosial media, alamat studio



Project Detail (/work/[slug])

Hero foto proyek (shared transition dari index)
Header info: nama proyek, lokasi, tahun, luas bangunan, status — ditata seperti lembar spesifikasi (mono font, grid 2 kolom)
Galeri foto full-bleed diselingi blok teks naratif pendek
Anotasi teknis mengambang di sudut foto tertentu (signature element)
Navigasi ke proyek berikutnya (full-bleed link di akhir halaman)



Studio / About

Foto tim/studio, filosofi lebih panjang, timeline singkat jika relevan



Contact

Form kontak sederhana + info langsung (email, alamat, sosial)






4. Tech Stack (dipilih khusus agar mudah di-host di Vercel)

LayerPilihanAlasanFrameworkNext.js 14+ (App Router, TypeScript)Native ke Vercel, image optimization built-in, zero-config deployStylingTailwind CSSCepat implementasi token system di atas, gampang dikonsistenkanAnimasiFramer MotionScroll reveal, shared layout transition, gesture — semua kebutuhan motion di atasKonten proyekFile JSON lokal (/content/projects/*.json) — TANPA CMS eksternalAnda edit langsung di GitHub/editor teks, tidak perlu belajar CMS, tidak ada biaya bulananGambarnext/image dari folder /public/images/projects/[slug]/Optimasi otomatis, lazy load, format modern (avif/webp) otomatis oleh VercelFontnext/font/google (Fraunces, Inter, JetBrains Mono)Self-hosted otomatis oleh Next.js, tanpa layout shiftForm kontakVercel-compatible: Formspree / Resend API routeTanpa backend server terpisahHostingVercelgit push → auto deploy, gratis untuk portofolio personal


Opsional upgrade nanti: jika ingin edit konten lewat UI visual (bukan edit JSON manual), bisa tambah Sanity.io atau Contentlayer. Tidak direkomendasikan di awal — JSON lokal lebih sederhana dan cukup untuk portofolio.




5. Struktur Folder Project

studio-index/
├── app/
│   ├── layout.tsx                 # Root layout: font loading, metadata global
│   ├── page.tsx                   # Home / Index
│   ├── globals.css                # Tailwind base + CSS variables token
│   ├── work/
│   │   └── [slug]/
│   │       └── page.tsx           # Template halaman detail proyek (generateStaticParams dari JSON)
│   ├── studio/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── nav/
│   │   └── SiteNav.tsx
│   ├── hero/
│   │   └── HeroReveal.tsx         # Clip-path reveal animation
│   ├── grid/
│   │   ├── ProjectGrid.tsx        # Index grid, scroll reveal stagger
│   │   └── ProjectCard.tsx
│   ├── annotation/
│   │   └── TechAnnotation.tsx     # Signature element: overlay koordinat/material
│   ├── cursor/
│   │   └── CustomCursor.tsx       # Desktop-only custom cursor
│   ├── footer/
│   │   └── SiteFooter.tsx
│   └── ui/
│       ├── Label.tsx              # Mono uppercase label component
│       └── Button.tsx             # Outlined CTA, no fill
│
├── content/
│   └── projects/
│       ├── _schema.md             # Dokumentasi field JSON (lihat §6)
│       ├── rumah-hijau.json
│       ├── kantor-lampung.json
│       └── villa-tepi-danau.json
│
├── public/
│   └── images/
│       └── projects/
│           ├── rumah-hijau/
│           │   ├── cover.jpg
│           │   ├── 01.jpg
│           │   ├── 02.jpg
│           │   └── ...
│           ├── kantor-lampung/
│           │   └── ...
│           └── villa-tepi-danau/
│               └── ...
│
├── lib/
│   ├── projects.ts                 # Fungsi getAllProjects(), getProjectBySlug()
│   └── motion-variants.ts          # Konstanta Framer Motion (reuse di banyak komponen)
│
├── public/
│   ├── favicon.ico
│   └── fonts/                      # (kosong — next/font handle otomatis, tidak perlu file manual)
│
├── next.config.js
├── tailwind.config.ts               # Semua token warna/font/spacing didefinisikan di sini
├── tsconfig.json
├── package.json
└── README.md                        # Panduan singkat "cara update portofolio" untuk Anda sendiri