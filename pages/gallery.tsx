import React from 'react';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import GalleryLightbox from '@/components/GalleryLightbox';
import type { GalleryImage } from '@/types';

interface GalleryProps {
  images: GalleryImage[];
}

const categories = ['All', 'Press', 'Live', 'Studio', 'Personal'] as const;
type Category = typeof categories[number];

export default function GalleryPage({ images }: GalleryProps) {
  const [activeCategory, setActiveCategory] = React.useState<Category>('All');

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.caption?.startsWith(activeCategory));

  return (
    <Layout
      title="Gallery — Mavhungu"
      description="Official photo gallery of Mavhungu — press photos and artist images."
    >
      {/* Cinematic page hero */}
      <div
        style={{
          position: 'relative',
          height: '50vh',
          minHeight: '340px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/instagram/mavhungu7.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            filter: 'brightness(0.28)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 40%, rgba(8,8,8,0.95) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>
              Photo Gallery
            </span>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>Gallery</h1>
            <p className="section-subtitle" style={{ maxWidth: '480px', margin: '0 auto' }}>
              Press photos, live performances &amp; studio sessions
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section" aria-label="Photo gallery">
        <div className="container">
          {/* Category filter */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <div
              role="group"
              aria-label="Filter gallery by category"
              style={{
                display: 'inline-flex',
                gap: 'var(--space-xs)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem',
              }}
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  style={{
                    padding: '0.45rem 1.3rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    border: 'none',
                    transition: 'all var(--transition-base)',
                    background:  activeCategory === cat ? 'var(--color-gold)' : 'transparent',
                    color:       activeCategory === cat ? '#080808'           : 'var(--color-text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p
              style={{
                marginTop: 'var(--space-md)',
                fontSize: '0.8rem',
                color: 'var(--color-text-dim)',
                letterSpacing: '0.06em',
              }}
              aria-live="polite"
            >
              {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <GalleryLightbox images={filtered} />

          {/* Presskit download note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: 'var(--space-3xl)',
              padding: 'var(--space-xl)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-xs)' }}>Press Enquiries</h3>
              <p style={{ fontSize: '0.875rem' }}>
                High-resolution press photos available for media and editorial use.
              </p>
            </div>
            <a
              href="mailto:mavhungumuenda@gmail.com"
              className="btn btn-outline"
              style={{ flexShrink: 0 }}
            >
              Request Press Kit
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const base = 'https://res.cloudinary.com/dngcmz2ye/image/upload';
  const images: GalleryImage[] = [
    { id: 'ig1',  url: `${base}/mavhungu/instagram/Mavhungu2.jpg`,                                       alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig2',  url: `${base}/mavhungu/instagram/mavhungu3.jpg`,                                       alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig3',  url: `${base}/mavhungu/instagram/mavhungu4.jpg`,                                       alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig4',  url: `${base}/mavhungu/instagram/mavhungu5.jpg`,                                       alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig5',  url: `${base}/mavhungu/instagram/mavhungu6.jpg`,                                       alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig6',  url: `${base}/mavhungu/instagram/mavhungu7.jpg`,                                       alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig7',  url: `${base}/mavhungu/instagram/mavhungu89.jpg`,                                      alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig8',  url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.33.36%20PM.jpg`, alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig9',  url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.37.56%20PM.jpg`, alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig10', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.37.57%20PM%20%281%29.jpg`, alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig11', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.37.57%20PM%20%282%29.jpg`, alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig12', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.37.57%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig13', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.41.41%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig14', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.41.44%20PM%20%281%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig15', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.41.44%20PM%20%282%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig16', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.41.44%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig17', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.41.46%20PM%20%281%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig18', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.41.46%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig19', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.42.15%20PM%20%281%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig20', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.42.15%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig21', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.42.16%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig22', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.09%20PM%20%282%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig23', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.09%20PM%20%283%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig24', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.09%20PM%20%284%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig25', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.09%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig26', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.10%20PM%20%281%29.jpg`, alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig27', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.10%20PM.jpg`,           alt: 'Mavhungu', caption: 'Live' },
    { id: 'ig28', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.49.47%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig29', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.51.03%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig30', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.57.00%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig31', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2011.03.54%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig32', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2011.03.55%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
    { id: 'ig33', url: `${base}/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2011.08.49%20PM.jpg`,           alt: 'Mavhungu', caption: 'Personal' },
  ];

  return { props: { images }, revalidate: 86400 };
};
