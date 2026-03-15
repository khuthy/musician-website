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
      {/* Page header */}
      <div
        style={{
          paddingTop: 'calc(var(--nav-height) + var(--space-3xl))',
          paddingBottom: 'var(--space-2xl)',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Photo Gallery</span>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>Gallery</h1>
            <p className="section-subtitle">
              Press photos, live performance captures, and studio sessions. Click any image to enlarge.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section" aria-label="Photo gallery">
        <div className="container">
          {/* Category filter */}
          <div
            role="group"
            aria-label="Filter gallery by category"
            style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid',
                  transition: 'all var(--transition-fast)',
                  borderColor: activeCategory === cat ? 'var(--color-gold)' : 'var(--color-border)',
                  background:  activeCategory === cat ? 'var(--color-gold-dim)' : 'transparent',
                  color:       activeCategory === cat ? 'var(--color-gold)'     : 'var(--color-text-muted)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p
            style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: 'var(--space-xl)' }}
            aria-live="polite"
          >
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </p>

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
  const images: GalleryImage[] = [
    {
      id:      '1',
      url:     'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_00.png',
      alt:     'Mavhungu — official press kit cover portrait 2025',
      caption: 'Press — Official press photo 2025',
    },
    {
      id:      '2',
      url:     'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_01.png',
      alt:     'Mavhungu — biography portrait',
      caption: 'Press — Biography portrait',
    },
    {
      id:      '3',
      url:     'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_02.png',
      alt:     'Mavhungu — artist about photo with stats',
      caption: 'Press — About & stats 2025',
    },
    {
      id:      '4',
      url:     'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_03.png',
      alt:     'Mavhungu — collaborations and released projects',
      caption: 'Press — Collaborations & released projects',
    },
    {
      id:      '5',
      url:     'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_04.png',
      alt:     'Mavhungu — live performances and support DJs',
      caption: 'Live — Traditional dress 2025',
    },
    {
      id:      '6',
      url:     'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_05.png',
      alt:     'Mavhungu — bookings and contact',
      caption: 'Press — Bookings portrait 2025',
    },
  ];

  return { props: { images }, revalidate: 86400 };
};
