import React from 'react';
import Link from 'next/link';

const socials = [
  { label: 'Spotify',     href: 'https://open.spotify.com/artist/464BYDcWpoLKSNpQxHLuTT?si=Q0AU1NB1QbWvxHn74CQLCg', icon: '◉' },
  { label: 'Apple Music', href: 'https://music.apple.com/za/artist/mavhungu/1100164464', icon: '◈' },
  { label: 'Instagram',   href: 'https://www.instagram.com/mavhungu_sa?igsh=MXRtY3p6bmp2aXBtbw==', icon: '◆' },
  { label: 'TikTok',      href: 'https://tiktok.com/@mavhungu_sa', icon: '▶' },
  { label: 'Facebook',    href: 'https://www.facebook.com/profile.php?id=100083278540088', icon: '◇' },
  { label: 'Twitter / X', href: 'https://x.com/mavhungu_sa?lang=en', icon: '✕' },
  { label: 'Beatport',    href: 'https://www.beatport.com/artist/mavhungu/758729/tracks?page=1&per_page=150', icon: '◎' },
  { label: 'Deezer',      href: 'https://www.deezer.com/en/artist/10143266', icon: '◑' },
];

const footerLinks = [
  { href: '/biography',      label: 'Biography' },
  { href: '/music',          label: 'Music' },
  { href: '/collaborations', label: 'Collaborations' },
  { href: '/performances',   label: 'Performances' },
  { href: '/events',         label: 'Events' },
  { href: '/gallery',        label: 'Gallery' },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-3xl) 0 var(--space-xl)',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 'var(--space-md)',
              }}
            >
              MAVHUNGU
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '240px' }}>
              Where Venda Meets the World. Afro-Pop vocalist and songwriter from Limpopo, South Africa.
            </p>
            <p style={{ marginTop: 'var(--space-md)', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
              Bookings &amp; Press:{' '}
              <a
                href="mailto:mavhungumuenda@gmail.com"
                style={{ color: 'var(--color-gold)', transition: 'opacity var(--transition-fast)' }}
              >
                mavhungumuenda@gmail.com
              </a>
            </p>
            <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
              <a
                href="tel:+27760243926"
                style={{ color: 'var(--color-gold)', transition: 'opacity var(--transition-fast)' }}
              >
                +27 76 024 3926
              </a>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Navigate
            </h4>
            <nav aria-label="Footer navigation">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {footerLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Follow
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Mavhungu on ${label}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    <span style={{ color: 'var(--color-gold)', fontSize: '0.7rem' }}>{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            &copy; {new Date().getFullYear()} Mavhungu. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            Johannesburg, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
