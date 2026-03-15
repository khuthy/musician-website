import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/',               label: 'Home' },
  { href: '/biography',      label: 'Biography' },
  { href: '/music',          label: 'Music' },
  { href: '/collaborations', label: 'Collaborations' },
  { href: '/performances',   label: 'Performances' },
  { href: '/events',         label: 'Events' },
  { href: '/gallery',        label: 'Gallery' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          transition: 'background var(--transition-slow), backdrop-filter var(--transition-slow)',
          background: scrolled
            ? 'rgba(8, 8, 8, 0.92)'
            : 'linear-gradient(to bottom, rgba(8,8,8,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        }}
        role="banner"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            href="/"
            aria-label="Mavhungu — home"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MAVHUNGU
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', gap: '0.25rem' }} className="desktop-nav">
            {navLinks.map(({ href, label }) => {
              const isActive = router.pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.03em',
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                    background: isActive ? 'var(--color-gold-dim)' : 'transparent',
                    transition: 'color var(--transition-fast), background var(--transition-fast)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)';
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px' }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: 'var(--color-text-primary)',
                  borderRadius: '2px',
                  transition: 'transform var(--transition-base), opacity var(--transition-base)',
                  transform:
                    menuOpen && i === 0 ? 'translateY(7px) rotate(45deg)' :
                    menuOpen && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(8, 8, 8, 0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--color-border)',
              padding: 'var(--space-lg) var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)',
            }}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = router.pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text-primary)',
                    background: isActive ? 'var(--color-gold-dim)' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--color-gold)' : '2px solid transparent',
                    transition: 'all var(--transition-fast)',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
