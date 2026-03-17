import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { GalleryImage } from '@/types';

/** Add Cloudinary thumbnail transformations for faster grid loads */
function thumb(url: string) {
  return url.replace('/upload/', '/upload/w_700,q_auto,f_auto/');
}

const ExpandIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [open, setOpen]   = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => { setIndex(i); setOpen(true); }, []);

  const slides = images.map(img => ({ src: img.url, alt: img.alt, title: img.caption }));

  return (
    <>
      {/* Masonry grid */}
      <div
        style={{ columns: '4 200px', columnGap: '10px' }}
        role="list"
        aria-label="Photo gallery"
      >
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            role="listitem"
            onClick={() => openAt(i)}
            aria-label={`View photo: ${img.alt}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.055 }}
            style={{
              display: 'block',
              breakInside: 'avoid',
              width: '100%',
              marginBottom: '10px',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid transparent',
              padding: 0,
              background: 'var(--color-bg-elevated)',
            }}
            className="gallery-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb(img.url)}
              alt={img.alt}
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              className="gallery-img"
            />

            {/* Hover overlay */}
            <div className="gallery-overlay" aria-hidden="true">
              <span className="expand-icon">
                <ExpandIcon />
              </span>
              {img.caption && (
                <p className="gallery-caption">{img.caption}</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(8,8,8,0.97)' } }}
      />

      <style jsx global>{`
        .gallery-card {
          transition: border-color 0.3s ease, box-shadow 0.35s ease;
        }
        .gallery-card:hover {
          border-color: rgba(201,168,76,0.55) !important;
          box-shadow: 0 0 0 1px rgba(201,168,76,0.2), 0 12px 40px rgba(0,0,0,0.5) !important;
        }
        .gallery-img {
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.07);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8,8,8,0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        .gallery-card:hover .gallery-overlay {
          background: rgba(8,8,8,0.48);
        }
        .expand-icon {
          color: #fff;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
        }
        .gallery-card:hover .expand-icon {
          opacity: 1;
          transform: scale(1);
        }
        .gallery-caption {
          position: absolute;
          bottom: 12px;
          left: 14px;
          right: 14px;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 6px rgba(0,0,0,0.9);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          text-align: left;
          text-transform: uppercase;
        }
        .gallery-card:hover .gallery-caption {
          opacity: 1;
          transform: translateY(0);
        }

        /* Lightbox overrides */
        .yarl__button { color: var(--color-gold) !important; }
        .yarl__slide_title {
          font-family: var(--font-heading);
          font-style: italic;
          color: rgba(255,255,255,0.7) !important;
        }
      `}</style>
    </>
  );
}
