export interface Event {
  _id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  ticketLink?: string;
  description?: string;
  image?: string;
  isSoldOut?: boolean;
}

export interface Collaboration {
  _id: string;
  artist: string;
  project: string;
  description: string;
  image?: string;
  year: number;
  genre?: string;
  spotifyId?: string;
  type: 'single' | 'album' | 'feature' | 'EP';
}

export interface Track {
  id: string;
  title: string;
  album: string;
  spotifyId: string;
  year: number;
  type: 'album' | 'single' | 'EP';
  coverImage?: string;
  description?: string;
}

export interface Album {
  id: string;
  title: string;
  year: number;
  type: 'album' | 'EP';
  spotifyAlbumId: string;
  coverImage?: string;
  tracks: string[];
  description?: string;
}

export interface Performance {
  id: string;
  title: string;
  date: string;
  venue: string;
  location: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  highlights?: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}
