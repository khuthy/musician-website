import React from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import EventCard from '@/components/EventCard';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import type { Event } from '@/types';

interface HomeProps {
  upcomingEvents: Event[];
}

const featuredTracks = [
  { id: '1', spotifyId: '1qsflyGrjihmYDwEaTcdKz', title: 'Kondelelani (ft. Vanco)',           year: 2020 },
  { id: '2', spotifyId: '7ul5qkkmqEyjPAt4g1FsP6', title: 'Mitodzi – Jimpster Remix',          year: 2021 },
  { id: '3', spotifyId: '6exzS5jf17HLYqqQMcJr4J', title: 'Haunted – Marcus Santoro Sunset Mix', year: 2024 },
];

const inViewVariant = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home({ upcomingEvents }: HomeProps) {
  return (
    <Layout>
      {/* Hero */}
      <Hero />

      {/* Featured Releases */}
      <section className="section" aria-labelledby="music-heading">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={inViewVariant}
          >
            <span className="section-label">Latest Music</span>
            <h2 className="section-title" id="music-heading">Featured Releases</h2>
            <div className="gold-divider" />
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            {featuredTracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                  hidden:  { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
                }}
              >
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-dim)',
                    marginBottom: 'var(--space-sm)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {track.year}
                </p>
                <SpotifyEmbed spotifyId={track.spotifyId} title={track.title} type="track" />
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/music" className="btn btn-outline">
              Full Discography →
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section
        className="section"
        aria-labelledby="about-heading"
        style={{ background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-3xl)',
              alignItems: 'center',
            }}
            className="grid-about"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_02.png"
                  alt="Mavhungu — artist photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">About</span>
              <h2 id="about-heading" style={{ marginBottom: 'var(--space-lg)' }}>
                Born in Johannesburg.<br />
                Rooted in Venda.
              </h2>
              <p style={{ marginBottom: 'var(--space-lg)' }}>
                Mavhungu Muenda is a South African Afro-Pop singer and songwriter celebrated for
                her rich, soulful voice and deep dedication to promoting Venda culture. Raised in
                Limpopo's Venda region, her musical journey began in 2016 with the release of
                <em> Watching Over Africa</em>, an album that showcased songs in various African
                languages.
              </p>
              <p style={{ marginBottom: 'var(--space-xl)' }}>
                With acclaimed collaborations alongside Vanco, DJeff, Jimpster, Philou Louzolo,
                and artists from across the globe, Mavhungu has established herself as a prominent
                figure in the Afropop scene — bringing the sounds of Venda to audiences worldwide.
              </p>
              <Link href="/biography" className="btn btn-outline">
                Full Biography →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section" aria-labelledby="events-heading">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inViewVariant}
          >
            <span className="section-label">On Tour</span>
            <h2 className="section-title" id="events-heading">Upcoming Shows</h2>
            <div className="gold-divider" />
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-2xl)',
                }}
              >
                {upcomingEvents.slice(0, 4).map((event, i) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/events" className="btn btn-outline">
                  All Shows →
                </Link>
              </div>
            </>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No upcoming shows announced. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Press quote */}
      <section
        aria-label="Press quote"
        style={{
          padding: 'var(--space-3xl) 0',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 100%)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.5,
                marginBottom: 'var(--space-lg)',
              }}
            >
              &ldquo;I want to bring the sounds of Venda to the world — to show that our culture is
              as rich and beautiful as any other. Every song is a bridge between where I come from
              and where we&apos;re all going.&rdquo;
            </p>
            <footer>
              <cite style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontStyle: 'normal', letterSpacing: '0.1em' }}>
                — Mavhungu
              </cite>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .grid-about {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // In production, fetch from your API or MongoDB directly.
  // Using static data here as fallback / build-time default.
  const upcomingEvents: Event[] = [];

  return {
    props: { upcomingEvents },
    revalidate: 3600, // ISR — refresh every hour
  };
};
