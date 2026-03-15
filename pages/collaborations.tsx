import React from 'react';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import type { Collaboration } from '@/types';

interface CollabsProps {
  collaborations: Collaboration[];
}

export default function CollaborationsPage({ collaborations }: CollabsProps) {
  return (
    <Layout
      title="Collaborations — Mavhungu"
      description="Mavhungu's collaborations with Vanco, DJeff, Jimpster, Philou Louzolo, Lohrasp Kansara, and more."
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
            <span className="section-label">Features & Projects</span>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>Collaborations</h1>
            <p className="section-subtitle">
              Mavhungu has lent her voice to artists and producers across South Africa, Europe,
              Australia, and beyond — bringing Venda spirit to a global dancefloor.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section" aria-label="Collaborations list">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {collaborations.map((collab, i) => (
              <motion.article
                key={collab._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i % 3 * 0.08 }}
                className="card"
                style={{ padding: 'var(--space-xl)' }}
                aria-label={`${collab.project} with ${collab.artist}`}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: collab.spotifyId ? '1fr 1fr' : '1fr',
                    gap: 'var(--space-xl)',
                    alignItems: 'start',
                  }}
                  className="collab-inner"
                >
                  {/* Left: Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
                      {/* Artist avatar placeholder */}
                      {collab.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={collab.image}
                          alt={`${collab.artist} logo or photo`}
                          style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-border)' }}
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'var(--color-gold-dim)',
                            border: '2px solid rgba(201,168,76,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.4rem',
                            color: 'var(--color-gold)',
                            fontWeight: 700,
                          }}
                        >
                          {collab.artist[0]}
                        </div>
                      )}
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>
                          with
                        </p>
                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
                          {collab.artist}
                        </h3>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
                      <span className="tag">{collab.type.toUpperCase()}</span>
                      <span className="tag" style={{ background: 'transparent', color: 'var(--color-text-dim)', borderColor: 'var(--color-border)' }}>
                        {collab.year}
                      </span>
                      {collab.genre && (
                        <span className="tag" style={{ background: 'transparent', color: 'var(--color-text-dim)', borderColor: 'var(--color-border)' }}>
                          {collab.genre}
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.5rem',
                        marginBottom: 'var(--space-md)',
                      }}
                    >
                      &ldquo;{collab.project}&rdquo;
                    </h2>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                      {collab.description}
                    </p>
                  </div>

                  {/* Right: Spotify embed */}
                  {collab.spotifyId && (
                    <div>
                      <SpotifyEmbed
                        spotifyId={collab.spotifyId}
                        type="track"
                        title={collab.project}
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
          .collab-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const collaborations: Collaboration[] = [
    {
      _id: '1',
      artist: 'Vanco',
      project: 'Kondelelani',
      type: 'single',
      year: 2020,
      genre: 'Afro House',
      spotifyId: '1qsflyGrjihmYDwEaTcdKz',
      description:
        'A landmark collaboration with South African DJ Vanco that gained significant international acclaim. The track was remixed by artists including Mano and Daniel Rateuke, spreading Mavhungu\'s soulful Venda vocals to dancefloors across the globe.',
    },
    {
      _id: '2',
      artist: 'Vanco & DJeff',
      project: 'Tshelede',
      type: 'single',
      year: 2020,
      genre: 'Afro House',
      spotifyId: '5OBb7vKydhbz2OwSVT99BW',
      description:
        'Partnering with South African DJ Vanco and Portuguese DJ DJeff, "Tshelede" received significant international radio play. The track blends deep Afro house production with Mavhungu\'s distinctive Venda vocal style.',
    },
    {
      _id: '3',
      artist: 'Funkky & Jimpster',
      project: 'Mitodzi',
      type: 'single',
      year: 2021,
      genre: 'Afro / Deep House',
      spotifyId: '7ul5qkkmqEyjPAt4g1FsP6',
      description:
        'Produced with Funkky and remixed by celebrated UK electronic producer Jimpster, "Mitodzi" resonated with audiences worldwide. The Jimpster remix brought Mavhungu\'s voice to entirely new audiences across Europe and beyond.',
    },
    {
      _id: '4',
      artist: 'Lohrasp Kansara & Marcus Santoro',
      project: 'Haunted',
      type: 'single',
      year: 2024,
      genre: 'Progressive House',
      spotifyId: '6exzS5jf17HLYqqQMcJr4J',
      description:
        'A 2024 international production with Lohrasp Kansara and Australian DJ Marcus Santoro. The Marcus Santoro Sunset Mix showcases Mavhungu\'s ability to adapt her Venda-rooted vocal style to progressive house soundscapes.',
    },
    {
      _id: '5',
      artist: 'Emanuele Esposito',
      project: 'Tuwani',
      type: 'single',
      year: 2022,
      genre: 'Afro House',
      description:
        'A collaboration with Italian producer Emanuele Esposito, "Tuwani" continues Mavhungu\'s tradition of bridging South African vocal artistry with European electronic production.',
    },
    {
      _id: '6',
      artist: 'Philou Louzolo',
      project: 'Udzhena',
      type: 'single',
      year: 2022,
      genre: 'Afro / Electronic',
      description:
        'One of two collaborations with French-Congolese producer Philou Louzolo, "Udzhena" is a hypnotic blend of Central African rhythms and Mavhungu\'s Venda vocal tradition.',
    },
    {
      _id: '7',
      artist: 'Philou Louzolo',
      project: 'Mbiluni Yanga',
      type: 'single',
      year: 2022,
      genre: 'Afro / Electronic',
      description:
        'The second Philou Louzolo collaboration, "Mbiluni Yanga" deepens the sonic conversation between Venda tradition and contemporary African electronic music, earning praise from listeners worldwide.',
    },
    {
      _id: '8',
      artist: 'Jalaal & Wilson Kentura',
      project: 'Amber',
      type: 'single',
      year: 2021,
      genre: 'Afro House',
      description:
        'A warm and textured Afro House record with Jalaal and South African producer Wilson Kentura. "Amber" highlights Mavhungu\'s versatility across different shades of the Afro house spectrum.',
    },
    {
      _id: '9',
      artist: 'Irenee.s & Chouja',
      project: 'Nwenwela',
      type: 'single',
      year: 2021,
      genre: 'Afro House',
      description:
        'A soulful cross-continental production featuring Mavhungu\'s vocals over the rhythmic interplay of Irenee.s and Chouja, further cementing her status as a sought-after vocalist in the global Afro house scene.',
    },
    {
      _id: '10',
      artist: 'Dean Mickoski & Da Le Havana',
      project: 'Khumbelo',
      type: 'single',
      year: 2024,
      genre: 'Afro-Pop',
      description:
        'A 2024 Afropop release highlighting Mavhungu\'s Limpopo heritage, accompanied by a music video shot in Johannesburg. The track showcases South Africa\'s rich musical landscape to international audiences.',
    },
  ];

  return {
    props: { collaborations },
    revalidate: 86400,
  };
};
