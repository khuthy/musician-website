import React, { useState, useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import { isPast, parseISO } from 'date-fns';
import Layout from '@/components/Layout';
import EventCard from '@/components/EventCard';
import type { Event } from '@/types';

interface EventsProps {
  events: Event[];
}

export default function EventsPage({ events }: EventsProps) {
  const [showPast, setShowPast] = useState(false);

  const upcoming = events.filter(e => !isPast(parseISO(e.date)));
  const past     = events.filter(e =>  isPast(parseISO(e.date)));

  const displayed = showPast ? events : upcoming;

  return (
    <Layout
      title="Events — Mavhungu"
      description="Upcoming shows and tour dates for Mavhungu. Follow on social media to stay updated on new dates."
    >
      {/* Page header */}
      <div
        style={{
          paddingTop: 'calc(var(--nav-height) + var(--space-3xl))',
          paddingBottom: 'var(--space-2xl)',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
          background: 'linear-gradient(to bottom, var(--color-bg-card), var(--color-bg))',
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">Tour Dates</span>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>Upcoming Events</h1>
            <p className="section-subtitle">
              {upcoming.length > 0
                ? `${upcoming.length} upcoming show${upcoming.length !== 1 ? 's' : ''} announced.`
                : 'New dates coming soon — sign up to be notified.'}
            </p>
          </motion.div>
        </div>
      </div>

      <section className="section" aria-label="Events list">
        <div className="container">
          {/* Toggle past shows */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-xl)',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              {showPast ? `Showing all ${events.length} events` : `${upcoming.length} upcoming shows`}
            </h2>
            {past.length > 0 && (
              <button
                onClick={() => setShowPast(p => !p)}
                className="btn btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
              >
                {showPast ? 'Hide Past Shows' : `Show Past Shows (${past.length})`}
              </button>
            )}
          </div>

          {/* Events */}
          {displayed.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {displayed.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--space-3xl)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <p style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }} aria-hidden="true">◎</p>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>No upcoming shows yet</h3>
              <p>New dates are announced frequently. Follow Mavhungu on socials to stay updated.</p>
            </div>
          )}

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              marginTop: 'var(--space-3xl)',
              background: 'linear-gradient(135deg, var(--color-gold-dim), rgba(123,97,255,0.08))',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-sm)' }}>
              Get Tour Alerts
            </h3>
            <p style={{ marginBottom: 'var(--space-xl)' }}>
              Be the first to know when new dates are announced and get presale access.
            </p>
            <form
              aria-label="Newsletter signup"
              onSubmit={e => e.preventDefault()}
              style={{ display: 'flex', gap: 'var(--space-sm)', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap' }}
            >
              <label htmlFor="email-signup" className="sr-only">Email address</label>
              <input
                id="email-signup"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-primary">
                Notify Me
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // In production, fetch from MongoDB via your API route.
  // Falling back to static data for demo purposes.
  const events: Event[] = [];

  return { props: { events } };
};
