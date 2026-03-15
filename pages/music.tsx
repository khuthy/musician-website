import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SpotifyEmbed from '@/components/SpotifyEmbed';

type FilterType = 'all' | 'album' | 'EP' | 'single';

const releases = [
  {
    id: 'haunted',
    title: 'Haunted – Marcus Santoro Sunset Mix',
    year: 2024,
    type: 'single' as const,
    spotifyId: '6exzS5jf17HLYqqQMcJr4J',
    embedType: 'track' as const,
    description: 'A 2024 progressive house collaboration with Lohrasp Kansara and Australian DJ Marcus Santoro, showcasing Mavhungu\'s soulful vocals over cinematic soundscapes.',
    cover: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_05.png',
  },
  {
    id: 'mitodzi',
    title: 'Mitodzi – Jimpster Remix',
    year: 2021,
    type: 'single' as const,
    spotifyId: '7ul5qkkmqEyjPAt4g1FsP6',
    embedType: 'track' as const,
    description: 'Produced with Funkky and remixed by UK electronic legend Jimpster, "Mitodzi" resonated with audiences worldwide and brought Mavhungu\'s Venda vocals to European dancefloors.',
    cover: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_04.png',
  },
  {
    id: 'tshelede',
    title: 'Tshelede',
    year: 2020,
    type: 'single' as const,
    spotifyId: '5OBb7vKydhbz2OwSVT99BW',
    embedType: 'track' as const,
    description: 'A collaboration with South African DJ Vanco and Portuguese DJ DJeff that received significant international radio play, blending deep Afro House with Mavhungu\'s signature vocals.',
    cover: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_03.png',
  },
  {
    id: 'kondelelani',
    title: 'Kondelelani',
    year: 2020,
    type: 'single' as const,
    spotifyId: '1qsflyGrjihmYDwEaTcdKz',
    embedType: 'track' as const,
    description: 'One of Mavhungu\'s most celebrated tracks — a collaboration with DJ Vanco that gained international acclaim and was remixed by artists including Mano and Daniel Rateuke.',
    cover: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_02.png',
  },
  {
    id: 'watching-over-africa',
    title: 'Watching Over Africa',
    year: 2016,
    type: 'album' as const,
    spotifyId: '464BYDcWpoLKSNpQxHLuTT',
    embedType: 'artist' as const,
    description: 'Mavhungu\'s debut album — a bold showcase of songs in various African languages that introduced her unique voice and her deep connection to Venda culture to the world.',
    cover: 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_01.png',
  },
];

export default function MusicPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = filter === 'all' ? releases : releases.filter(r => r.type === filter);

  return (
    <Layout
      title="Music — Mavhungu"
      description="Stream Mavhungu's full discography — Kondelelani, Tshelede, Mitodzi, Haunted, Watching Over Africa, and more."
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
            <span className="section-label">Discography</span>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>Music</h1>
            <p className="section-subtitle">
              Stream on Spotify, Apple Music, Beatport, and Deezer — singles and albums from 2016 to present.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section" aria-label="Discography">
        <div className="container">
          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label="Filter by release type"
            style={{
              display: 'flex',
              gap: 'var(--space-sm)',
              marginBottom: 'var(--space-2xl)',
              flexWrap: 'wrap',
            }}
          >
            {(['all', 'album', 'EP', 'single'] as FilterType[]).map(type => (
              <button
                key={type}
                role="tab"
                aria-selected={filter === type}
                onClick={() => setFilter(type)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'capitalize',
                  border: '1px solid',
                  transition: 'all var(--transition-fast)',
                  borderColor: filter === type ? 'var(--color-gold)' : 'var(--color-border)',
                  background:  filter === type ? 'var(--color-gold-dim)' : 'transparent',
                  color:       filter === type ? 'var(--color-gold)'     : 'var(--color-text-muted)',
                }}
              >
                {type === 'all' ? 'All Releases' : type === 'EP' ? 'EPs' : `${type}s`}
              </button>
            ))}
          </div>

          {/* Release list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            {filtered.map((release, i) => (
              <motion.article
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                aria-label={`${release.title} — ${release.type}, ${release.year}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 'var(--space-xl)',
                  alignItems: 'start',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  padding: 'var(--space-xl)',
                }}
                className="release-card"
              >
                {/* Cover art */}
                <div
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    aspectRatio: '1/1',
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={release.cover}
                    alt={`${release.title} cover art`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info + embed */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)', flexWrap: 'wrap' }}>
                    <span className="tag">{release.type.toUpperCase()}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>{release.year}</span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.5rem',
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    {release.title}
                  </h2>
                  <p style={{ marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>
                    {release.description}
                  </p>
                  <SpotifyEmbed
                    spotifyId={release.spotifyId}
                    type={release.embedType}
                    title={release.title}
                    height={release.embedType === 'artist' ? 352 : 152}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming links */}
      <section
        style={{
          padding: 'var(--space-3xl) 0',
          background: 'var(--color-bg-card)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>
            Listen On
          </span>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--space-lg)' }}>
            {[
              { label: 'Spotify',     href: 'https://open.spotify.com/artist/464BYDcWpoLKSNpQxHLuTT?si=Q0AU1NB1QbWvxHn74CQLCg' },
              { label: 'Apple Music', href: 'https://music.apple.com/za/artist/mavhungu/1100164464' },
              { label: 'Beatport',    href: 'https://www.beatport.com/artist/mavhungu/758729/tracks?page=1&per_page=150' },
              { label: 'Deezer',      href: 'https://www.deezer.com/en/artist/10143266' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 600px) {
          .release-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Layout>
  );
}
