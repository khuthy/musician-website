import React, { useState, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { GalleryImage } from '@/types';

interface GalleryLightboxProps {
  images: GalleryImage[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [open, setOpen]   = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const slides = images.map(img => ({
    src: img.url,
    alt: img.alt,
    title: img.caption,
  }));

  return (
    <>
      {/* Gallery grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--space-md)',
        }}
        role="list"
        aria-label="Photo gallery"
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            role="listitem"
            onClick={() => openAt(i)}
            aria-label={`View photo: ${img.alt}`}
            style={{
              position: 'relative',
              paddingBottom: '75%',
              background: 'var(--color-bg-elevated)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--color-border)',
              transition: 'transform var(--transition-base), border-color var(--transition-base)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'filter var(--transition-base)',
              }}
            />

            {/* Hover overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(8,8,8,0)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 'var(--space-md)',
                transition: 'background var(--transition-base)',
              }}
              className="gallery-overlay"
            >
              {img.caption && (
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#fff',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    opacity: 0,
                    transform: 'translateY(6px)',
                    transition: 'opacity var(--transition-base), transform var(--transition-base)',
                  }}
                  className="gallery-caption"
                >
                  {img.caption}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(8,8,8,0.97)' },
        }}
      />

      <style jsx global>{`
        button:hover .gallery-overlay {
          background: rgba(8,8,8,0.5) !important;
        }
        button:hover .gallery-caption {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Override lightbox styles */
        .yarl__button {
          color: var(--color-gold) !important;
        }
      `}</style>
    </>
  );
}
