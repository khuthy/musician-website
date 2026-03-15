import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url(https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_00.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.35)',
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 50%, rgba(201,168,76,0.08) 100%)',
        }}
      />

      {/* Decorative vertical line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background:
            'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.15) 70%, transparent)',
          display: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '700px' }}
        >
          {/* Label */}
          <motion.div variants={fadeUp} custom={0}>
            <span
              className="section-label"
              style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}
            >
              Official Artist Site
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            custom={0.15}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mavhungu
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Muenda
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            custom={0.3}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: 'rgba(245,245,245,0.7)',
              letterSpacing: '0.05em',
              marginBottom: 'var(--space-xl)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-heading)',
            }}
          >
            &ldquo;Where Venda Meets the World&rdquo;
          </motion.p>

          {/* Genre tags */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-2xl)' }}
          >
            {['Afro-Pop', 'Deep soul Afro-House', 'Vocalist', 'Song Writer', 'Venda'].map(genre => (
              <span key={genre} className="tag">{genre}</span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={0.5}
            style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}
          >
            <Link href="/music" className="btn btn-primary">
              Listen Now
            </Link>
            <Link href="/events" className="btn btn-outline">
              Upcoming Shows
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '-10vh',
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-sm)',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-text-dim)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
              animation: 'fadeInUp 2s ease infinite',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
