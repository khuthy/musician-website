import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const bioSections = [
  {
    heading: 'Origins',
    body: `Mavhungu Muenda, professionally known as Mavhungu, is a South African Afro-Pop singer
and songwriter celebrated for her rich soulful voice and her deep dedication to promoting Venda
culture. Born in Johannesburg and raised in Limpopo's Venda region, she grew up immersed in the
sounds, languages, and traditions of the Venda people — an upbringing that would define the soul
of her music for decades to come.`,
  },
  {
    heading: 'Watching Over Africa — 2016',
    body: `Mavhungu's musical journey began in 2016 with the release of her debut album
Watching Over Africa, a project that boldly showcased songs in various African languages. The
album announced a new voice in South African music — one equally rooted in Venda oral tradition
and the contemporary Afropop sound taking shape across the continent. It established Mavhungu as
an artist unafraid to honour her heritage in a global market.`,
  },
  {
    heading: 'International Collaborations',
    body: `Throughout her career Mavhungu has collaborated with a diverse roster of South African
and international artists. In 2020 she joined forces with South African DJ Vanco on
"Kondelelani," a track that gained significant international acclaim and was remixed by artists
such as Mano and Daniel Rateuke. That same year she partnered with Portuguese DJ DJeff and Vanco
on "Tshelede," a song that received considerable international radio play.`,
  },
  {
    heading: 'Breaking Through Globally — 2021',
    body: `In 2021 Mavhungu teamed up with producer Funkky to release "Mitodzi," a track that
resonated with audiences worldwide. The song's Jimpster remix — by the celebrated UK electronic
producer — brought her voice to entirely new audiences across Europe and beyond. Her commitment
to cultural representation has always been clear: Venda singing and themes run throughout her
work, forming a thread that connects each international collaboration back to her roots.`,
  },
  {
    heading: 'Expanding the Reach — 2024',
    body: `In October 2024 Mavhungu expanded her international presence further with the release
of "Khumbelo," an Afropop track featuring Australian DJ and producer Benson Barton and
Stockholm-based DJ Olof Kahneman. The song highlights her Limpopo heritage and was accompanied
by a music video shot in Johannesburg, further showcasing South Africa's rich musical landscape.
The same year she appeared on "Haunted" alongside Lohrasp Kansara and Marcus Santoro, a record
that received significant international support.`,
  },
  {
    heading: 'Now',
    body: `Today Mavhungu stands as a prominent figure in the Afropop music scene, her statistics
reflecting a growing global fanbase: 25K Spotify followers, 143K monthly listeners, streams
reaching 171 countries, and live appearances from Johannesburg's Winnie Jazz Restaurant and
Birchwood Hotel to the SABC TV Morning Live stage and the Addicted 2 House event. She continues
to write and record, determined to bring the sounds of Venda to every corner of the world.`,
  },
];

export default function BiographyPage() {
  return (
    <Layout
      title="Biography — Mavhungu"
      description="Read the full biography of Mavhungu — South African Afro-Pop singer and songwriter from Limpopo's Venda region."
    >
      {/* Page hero */}
      <div
        style={{
          position: 'relative',
          height: '50vh',
          minHeight: '340px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 'var(--space-2xl)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_01.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            filter: 'brightness(0.3)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, var(--color-bg) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">About the Artist</span>
            <h1 style={{ marginTop: 'var(--space-sm)' }}>Biography</h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="section" aria-label="Biography content">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: 'var(--space-3xl)',
              alignItems: 'start',
            }}
            className="bio-grid"
          >
            {/* Sidebar — portrait + facts */}
            <aside aria-label="Artist facts" style={{ position: 'sticky', top: 'calc(var(--nav-height) + var(--space-xl))' }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Portrait */}
                <div
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    aspectRatio: '3/4',
                    border: '1px solid var(--color-border)',
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_00.png"
                    alt="Mavhungu — professional portrait"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Fact sheet */}
                <div
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-lg)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      marginBottom: 'var(--space-lg)',
                    }}
                  >
                    Quick Facts
                  </h3>
                  {[
                    ['Origin',    'Limpopo (Venda Region), South Africa'],
                    ['Base',      'Johannesburg, South Africa'],
                    ['Genre',     'Afro-Pop / World Music / Electronic'],
                    ['Active',    '2016 – Present'],
                    ['Phone',     '+27760243926'],
                    ['Booking',   'mavhungumuenda@gmail.com'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        paddingBottom: 'var(--space-md)',
                        marginBottom: 'var(--space-md)',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {label}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                        {label === 'Booking' ? (
                          <a href={`mailto:${value}`} style={{ color: 'var(--color-gold)' }}>{value}</a>
                        ) : label === 'Phone' ? (
                          <a href={`tel:${value}`} style={{ color: 'var(--color-gold)' }}>{value}</a>
                        ) : value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </aside>

            {/* Main bio text */}
            <article>
              {bioSections.map((section, i) => (
                <motion.section
                  key={section.heading}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{ marginBottom: 'var(--space-2xl)' }}
                  aria-labelledby={`bio-${i}`}
                >
                  <h2
                    id={`bio-${i}`}
                    style={{
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-heading)',
                      marginBottom: 'var(--space-md)',
                      paddingBottom: 'var(--space-md)',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p style={{ fontSize: '1.05rem', lineHeight: 2 }}>{section.body}</p>
                </motion.section>
              ))}

              {/* Press quote */}
              <motion.blockquote
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  borderLeft: '3px solid var(--color-gold)',
                  paddingLeft: 'var(--space-xl)',
                  marginTop: 'var(--space-xl)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic',
                    fontSize: '1.3rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  &ldquo;I want to bring the sounds of Venda to the world — to show that our culture
                  is as rich and beautiful as any other. Every song is a bridge between where I
                  come from and where we&apos;re all going.&rdquo;
                </p>
                <cite style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontStyle: 'normal' }}>
                  — Mavhungu
                </cite>
              </motion.blockquote>
            </article>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .bio-grid {
            grid-template-columns: 1fr !important;
          }
          aside[aria-label="Artist facts"] {
            position: static !important;
          }
        }
      `}</style>
    </Layout>
  );
}
