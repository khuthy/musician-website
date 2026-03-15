import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
}

export default function Layout({
  children,
  title = 'Mavhungu — Where Venda Meets the World',
  description = 'Official website of Mavhungu — South African Afro-Pop singer and songwriter from Limpopo\'s Venda region. Music, events, and more.',
  ogImage = 'https://res.cloudinary.com/dngcmz2ye/image/upload/mavhungu/mavhungu_presskit_00.png',
}: LayoutProps) {
  const siteUrl = 'https://mavhungu.com';

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image"       content={ogImage} />
        <meta property="og:url"         content={siteUrl} />
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="Mavhungu" />

        {/* Twitter Card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:site"        content="@mavhungu_sa" />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image"       content={ogImage} />

        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#080808" />
      </Head>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />

        <main
          id="main-content"
          style={{ flex: 1, paddingTop: 'var(--nav-height)' }}
          tabIndex={-1}
        >
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only"
            style={{
              position: 'absolute',
              top: 'var(--space-md)',
              left: 'var(--space-md)',
              zIndex: 200,
              background: 'var(--color-gold)',
              color: '#000',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Skip to main content
          </a>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
