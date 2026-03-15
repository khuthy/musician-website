import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

// ── Model ──────────────────────────────────────────────────────────────────────
const collaborationSchema = new mongoose.Schema(
  {
    artist:      { type: String, required: true },
    project:     { type: String, required: true },
    type:        { type: String, enum: ['single', 'album', 'feature', 'EP'], required: true },
    description: { type: String, required: true },
    image:       { type: String },
    year:        { type: Number, required: true },
    genre:       { type: String },
    spotifyId:   { type: String },
  },
  { timestamps: true }
);

const Collaboration =
  mongoose.models.Collaboration ?? mongoose.model('Collaboration', collaborationSchema);

// ── Handler ────────────────────────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  try {
    await connectToDatabase();
  } catch {
    return res.status(503).json({ error: 'Database connection failed' });
  }

  switch (req.method) {
    case 'GET': {
      const collaborations = await Collaboration.find().sort({ year: -1 }).lean();
      return res.status(200).json(collaborations);
    }

    case 'POST': {
      const { artist, project, type, description, image, year, genre, spotifyId } = req.body;

      if (!artist || !project || !type || !description || !year) {
        return res.status(400).json({ error: 'artist, project, type, description, and year are required' });
      }

      const collab = await Collaboration.create({ artist, project, type, description, image, year, genre, spotifyId });
      return res.status(201).json(collab);
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
