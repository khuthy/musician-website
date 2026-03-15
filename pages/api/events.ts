import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

// ── Model ──────────────────────────────────────────────────────────────────────
const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    date:        { type: Date,   required: true },
    venue:       { type: String, required: true },
    location:    { type: String, required: true },
    ticketLink:  { type: String },
    description: { type: String },
    image:       { type: String },
    isSoldOut:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event ?? mongoose.model('Event', eventSchema);

// ── Handler ────────────────────────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');

  try {
    await connectToDatabase();
  } catch {
    return res.status(503).json({ error: 'Database connection failed' });
  }

  switch (req.method) {
    // GET /api/events?upcoming=true
    case 'GET': {
      const { upcoming, limit } = req.query;

      const query: Record<string, unknown> = {};
      if (upcoming === 'true') {
        query.date = { $gte: new Date() };
      }

      const events = await Event.find(query)
        .sort({ date: upcoming === 'true' ? 1 : -1 })
        .limit(limit ? parseInt(limit as string, 10) : 100)
        .lean();

      return res.status(200).json(events);
    }

    // POST /api/events  — create a new event (add auth middleware in production)
    case 'POST': {
      const { title, date, venue, location, ticketLink, description, image, isSoldOut } = req.body;

      if (!title || !date || !venue || !location) {
        return res.status(400).json({ error: 'title, date, venue, and location are required' });
      }

      const event = await Event.create({ title, date, venue, location, ticketLink, description, image, isSoldOut });
      return res.status(201).json(event);
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
