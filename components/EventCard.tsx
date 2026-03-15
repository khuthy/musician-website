import React from 'react';
import { format, isPast, parseISO } from 'date-fns';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const dateObj = parseISO(event.date);
  const past    = isPast(dateObj);

  const month = format(dateObj, 'MMM').toUpperCase();
  const day   = format(dateObj, 'd');
  const year  = format(dateObj, 'yyyy');
  const time  = format(dateObj, 'h:mm a');

  return (
    <article
      className="card"
      style={{
        display: 'flex',
        gap: 'var(--space-lg)',
        padding: 'var(--space-xl)',
        opacity: past ? 0.55 : 1,
      }}
      aria-label={`${event.title} at ${event.venue}`}
    >
      {/* Date block */}
      <div
        style={{
          flexShrink: 0,
          width: '70px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: past ? 'var(--color-bg-elevated)' : 'var(--color-gold-dim)',
          border: `1px solid ${past ? 'var(--color-border)' : 'rgba(201,168,76,0.3)'}`,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-sm)',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: past ? 'var(--color-text-dim)' : 'var(--color-gold)',
          }}
        >
          {month}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: '2rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.1,
            color: past ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
          }}
        >
          {day}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: '0.7rem',
            color: 'var(--color-text-dim)',
          }}
        >
          {year}
        </span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
          <h3
            style={{
              fontSize: '1.1rem',
              fontFamily: 'var(--font-heading)',
              marginBottom: 'var(--space-xs)',
            }}
          >
            {event.title}
          </h3>
          {event.isSoldOut && (
            <span
              style={{
                flexShrink: 0,
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,100,100,0.15)',
                color: '#ff6464',
                border: '1px solid rgba(255,100,100,0.3)',
              }}
            >
              Sold Out
            </span>
          )}
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>
          {event.venue}
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginBottom: 'var(--space-sm)' }}>
          {event.location} &middot; {time}
        </p>

        {event.description && (
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: 'var(--space-md)' }}>
            {event.description}
          </p>
        )}

        {!past && event.ticketLink && !event.isSoldOut && (
          <a
            href={event.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
            aria-label={`Buy tickets for ${event.title}`}
          >
            Get Tickets
          </a>
        )}

        {past && (
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
            Past show
          </span>
        )}
      </div>
    </article>
  );
}
