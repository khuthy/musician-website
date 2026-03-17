import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import type { Performance } from '@/types';

const performances: Performance[] = [
  {
    id: '1',
    title: 'SABC TV Morning Live',
    date: '2024-01-01',
    venue: 'SABC Studios',
    location: 'Johannesburg, South Africa',
    description:
      'A live television performance on South Africa\'s premier morning show, SABC TV Morning Live, introducing Mavhungu\'s music to a national audience and cementing her reputation as one of the country\'s most compelling live vocalists.',
    image: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/instagram/WhatsApp%20Image%202026-03-15%20at%2010.47.09%20PM.jpg',
    highlights: ['National television broadcast', 'Live vocal performance', 'Reached millions of viewers'],
  },
  {
    id: '2',
    title: 'Addicted 2 House Event',
    date: '2023-06-01',
    venue: 'Addicted 2 House',
    location: 'South Africa',
    description:
      'A headline appearance at the celebrated Addicted 2 House event, one of South Africa\'s most respected platforms for Afro House and Afropop talent. Mavhungu\'s set drew a passionate crowd and demonstrated her commanding live presence.',
    image: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/instagram/mavhungu6.jpg',
    highlights: ['Headline appearance', 'Full live vocal set', 'Standing ovation from crowd'],
  },
  {
    id: '3',
    title: 'Winnie Jazz Restaurant',
    date: '2022-09-01',
    venue: 'Winnie Jazz Restaurant',
    location: 'Johannesburg, South Africa',
    description:
      'An intimate live performance at the acclaimed Winnie Jazz Restaurant, showcasing the gentler, more acoustic side of Mavhungu\'s artistry. The evening highlighted the breadth of her vocal range beyond the dancefloor.',
    highlights: ['Intimate live setting', 'Acoustic vocal showcase', 'Sold-out audience'],
  },
  {
    id: '4',
    title: 'Birchwood Hotel',
    date: '2022-04-01',
    venue: 'Birchwood Hotel',
    location: 'Boksburg, South Africa',
    description:
      'A prestigious performance at Birchwood Hotel, one of Gauteng\'s landmark venues, adding to Mavhungu\'s growing reputation as a world-class live performer suitable for both intimate and large-scale events.',
    highlights: ['Prestigious venue', 'Full production performance'],
  },
  {
    id: '5',
    title: 'Jorbug Theater',
    date: '2021-10-01',
    venue: 'Jorbug Theater',
    location: 'Johannesburg, South Africa',
    description:
      'A theatrical stage performance at Jorbug Theater in which Mavhungu showcased her Venda roots through an immersive set of original material, drawing on tradition as much as contemporary Afropop.',
    highlights: ['Theatrical production', 'Venda cultural showcase', 'Original set list'],
  },
  {
    id: '6',
    title: 'LEANO Club',
    date: '2021-05-01',
    venue: 'LEANO Club',
    location: 'South Africa',
    description:
      'A high-energy club performance at LEANO, demonstrating Mavhungu\'s ability to hold her own in an electronic and Afro House environment — the setting in which many of her biggest recorded collaborations live.',
    highlights: ['Club performance', 'Afro House set', 'Full band accompaniment'],
  },
  {
    id: '7',
    title: 'Watching Over Africa Event',
    date: '2016-01-01',
    venue: 'Johannesburg',
    location: 'Johannesburg, South Africa',
    description:
      'The launch event for Mavhungu\'s debut album Watching Over Africa — the performance that started it all. A celebration of Venda music, language, and culture that introduced her as a bold new voice in South African music.',
    highlights: ['Album launch event', 'Debut performance', 'Songs in multiple African languages'],
  },
];

export default function PerformancesPage() {
  return (
    <Layout
      title="Performances — Mavhungu"
      description="Past performances and shows by Mavhungu — SABC TV Morning Live, Winnie Jazz Restaurant, Birchwood Hotel, Addicted 2 House, and more."
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
            <span className="section-label">Live</span>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>Performances</h1>
            <p className="section-subtitle">
              A record of Mavhungu&apos;s most significant live performances — from intimate jazz
              restaurants to national television and celebrated Afro House stages across South Africa.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section" aria-label="Performances list">
        <div className="container">
          {/* Timeline */}
          <div
            style={{
              position: 'relative',
              paddingLeft: 'var(--space-xl)',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {performances.map((perf, i) => (
              <motion.article
                key={perf.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                style={{
                  position: 'relative',
                  marginBottom: 'var(--space-2xl)',
                }}
                aria-label={`${perf.title}, ${perf.venue}`}
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 'calc(-1 * var(--space-xl) - 6px)',
                    top: '8px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: i === 0 ? 'var(--color-gold)' : 'var(--color-bg-elevated)',
                    border: '2px solid',
                    borderColor: i === 0 ? 'var(--color-gold)' : 'var(--color-border)',
                    boxShadow: i === 0 ? '0 0 0 4px var(--color-gold-dim)' : 'none',
                  }}
                />

                <div
                  className="card"
                  style={{
                    padding: 'var(--space-xl)',
                    display: 'grid',
                    gridTemplateColumns: perf.image ? '1fr 1fr' : '1fr',
                    gap: 'var(--space-xl)',
                    alignItems: 'start',
                  }}
                >
                  {/* Info */}
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: 'var(--space-sm)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {perf.date}
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: 'var(--space-xs)' }}>
                      {perf.title}
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                      {perf.venue} &middot; {perf.location}
                    </p>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
                      {perf.description}
                    </p>

                    {/* Highlights */}
                    {perf.highlights && (
                      <ul
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--space-xs)',
                        }}
                        aria-label="Highlights"
                      >
                        {perf.highlights.map(h => (
                          <li
                            key={h}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-sm)',
                              fontSize: '0.85rem',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            <span style={{ color: 'var(--color-gold)', fontSize: '0.6rem' }}>◆</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Video embed button */}
                    {perf.videoUrl && (
                      <div style={{ marginTop: 'var(--space-lg)' }}>
                        <iframe
                          src={perf.videoUrl}
                          width="100%"
                          height="200"
                          title={`Video — ${perf.title}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Press photo */}
                  {perf.image && (
                    <div
                      style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        aspectRatio: '16/10',
                        background: 'var(--color-bg-elevated)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={perf.image}
                        alt={`${perf.title} press photo`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .card[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Layout>
  );
}
