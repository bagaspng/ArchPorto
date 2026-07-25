'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

import img1 from '@/assets/2.jpg';
import img2 from '@/assets/R1.jpg';
import img3 from '@/assets/R__Photo - 6.jpg';
import img4 from '@/assets/V4_Photo - 2.jpg';
import img5 from '@/assets/VR2_Photo - 2.jpg';
import img6 from '@/assets/V_Photo - 1.jpg';
import img7 from '@/assets/Rumah Bpk Erpan__V4_Photo - 8.jpg';
import img8 from '@/assets/frontsidewide.jpg';
import img9 from '@/assets/frontup.jpg';
import img10 from '@/assets/frontwide.jpg';
import img11 from '@/assets/sideup.jpg';

export const CURATED_GALLERY = [
  // Column 1
  [
    { src: img9, alt: 'Front Up (Portrait 3:4)' },
    { src: img10, alt: 'Front Wide (Landscape 4:3)' },
   // { src: img1, alt: 'Project 2 (Square 1:1)' },
    { src: img4, alt: 'V4 Photo 2 (Wide 16:9)' },
    { src: img6, alt: 'V Photo 1 (Wide 16:9)' },
  ],
  // Column 2
  [
     { src: img6, alt: 'V Photo 1 (Wide 16:9)' },
    { src: img3, alt: 'R Photo 6 (Square 1:1)' },    
   
    { src: img9, alt: 'Front Up (Portrait 3:4)' },
    { src: img7, alt: 'Rumah Bpk Erpan__V4_Photo - 8.jpg (up)' },
  ],
  // Column 3
  [
    { src: img7, alt: 'Rumah Bpk Erpan__V4_Photo - 8.jpg (up)' },
    { src: img3, alt: 'R Photo 6 (Square 1:1)' },    
    { src: img6, alt: 'V Photo 1 (Wide 16:9)' },
    { src: img9, alt: 'Front Up (Portrait 3:4)' }, // Reused to balance the columns perfectly
  ]
];

export function ImageGallery() {
  return (
    <div className="relative w-full">
      <div className="mx-auto grid w-full gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {CURATED_GALLERY.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 md:gap-5">
            {column.map((img, index) => (
              <AnimatedImage
                key={`${colIndex}-${index}`}
                alt={img.alt}
                src={img.src}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedImage({ alt, src, className, placeholder }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <div ref={ref} className={cn("relative w-full bg-accent/20 overflow-hidden", className)}>
      <img
        alt={alt}
        src={imgSrc}
        className={cn(
          'w-full h-auto rounded-none opacity-0 transition-all duration-1000 ease-in-out',
          {
            'opacity-100': isInView && !isLoading,
          }
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={handleError}
      />
    </div>
  );
}
