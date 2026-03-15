'use strict';

const express   = require('express');
const { body, query, param, validationResult } = require('express-validator');
const Event     = require('../models/Event');
const cloudinary = require('../lib/cloudinary');
const multer    = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// ── Cloudinary image upload via multer ────────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         'aria-voss/events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
  },
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

// ── Validation helpers ────────────────────────────────────────────────────────
const eventValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('date').isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('ticketLink').optional().isURL().withMessage('ticketLink must be a valid URL'),
  body('description').optional().isLength({ max: 1000 }),
  body('isSoldOut').optional().isBoolean(),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
}

// ── GET /api/events ───────────────────────────────────────────────────────────
router.get(
  '/',
  [
    query('upcoming').optional().isBoolean(),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('page').optional().isInt({ min: 1 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { upcoming, limit = 50, page = 1 } = req.query;
      const filter = {};
      if (upcoming === 'true') filter.date = { $gte: new Date() };

      const skip   = (Number(page) - 1) * Number(limit);
      const sort   = upcoming === 'true' ? { date: 1 } : { date: -1 };

      const [events, total] = await Promise.all([
        Event.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
        Event.countDocuments(filter),
      ]);

      res.json({
        data:       events,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ── GET /api/events/:id ───────────────────────────────────────────────────────
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid event ID')],
  validate,
  async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id).lean();
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json(event);
    } catch (err) {
      next(err);
    }
  }
);

// ── POST /api/events ──────────────────────────────────────────────────────────
router.post(
  '/',
  upload.single('image'),
  eventValidation,
  validate,
  async (req, res, next) => {
    try {
      const { title, date, venue, location, ticketLink, description, isSoldOut } = req.body;
      const imageUrl = req.file?.path ?? req.body.image;

      const event = await Event.create({
        title, date, venue, location, ticketLink, description,
        image:     imageUrl,
        isSoldOut: isSoldOut === 'true' || isSoldOut === true,
      });

      res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  }
);

// ── PATCH /api/events/:id ─────────────────────────────────────────────────────
router.patch(
  '/:id',
  [param('id').isMongoId()],
  validate,
  async (req, res, next) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new:          true,
        runValidators: true,
      });
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json(event);
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/events/:id ────────────────────────────────────────────────────
router.delete(
  '/:id',
  [param('id').isMongoId()],
  validate,
  async (req, res, next) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json({ message: 'Event deleted', id: req.params.id });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
