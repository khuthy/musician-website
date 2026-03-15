import React, { useState } from 'react';

interface SpotifyEmbedProps {
  /** Spotify track or album ID */
  spotifyId: string;
  /** 'track' | 'album' | 'playlist' | 'artist' — defaults to 'track' */
  type?: 'track' | 'album' | 'playlist' | 'artist';
  /** Height in px — tracks: 152, albums: 352 */
  height?: number;
  title: string;
}

export default function SpotifyEmbed({
  spotifyId,
  type = 'track',
  height,
  title,
}: SpotifyEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const defaultHeight = type === 'track' ? 152 : 352;
  const frameHeight = height ?? defaultHeight;

  const src = `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--color-bg-elevated)',
      }}
    >
      {/* Skeleton while loading */}
      {!loaded && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--color-bg-elevated) 25%, var(--color-border) 50%, var(--color-bg-elevated) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            height: `${frameHeight}px`,
          }}
        />
      )}

      <iframe
        src={src}
        width="100%"
        height={frameHeight}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify player — ${title}`}
        onLoad={() => setLoaded(true)}
        style={{
          display: 'block',
          borderRadius: 'var(--radius-md)',
          opacity: loaded ? 1 : 0,
          transition: 'opacity var(--transition-slow)',
        }}
      />
    </div>
  );
}
