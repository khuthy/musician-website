'use strict';

const express  = require('express');
const { body, param, validationResult } = require('express-validator');
const Collaboration = require('../models/Collaboration');
const cloudinary    = require('../lib/cloudinary');
const multer        = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          'aria-voss/collaborations',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation:  [{ width: 400, height: 400, crop: 'fill', gravity: 'auto', quality: 'auto', fetch_format: 'auto' }],
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const collabValidation = [
  body('artist').trim().notEmpty().withMessage('Artist is required'),
  body('project').trim().notEmpty().withMessage('Project is required'),
  body('type').isIn(['single', 'album', 'feature', 'EP']).withMessage('Invalid type'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 2000 }),
  body('year').isInt({ min: 2000 }).withMessage('Year must be a valid integer >= 2000'),
  body('genre').optional().trim(),
  body('spotifyId').optional().trim(),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
}

// ── GET /api/collaborations ───────────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query;
    const filter = q ? { $text: { $search: q } } : {};
    const collaborations = await Collaboration.find(filter).sort({ year: -1 }).lean();
    res.json(collaborations);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/collaborations/:id ───────────────────────────────────────────────
router.get(
  '/:id',
  [param('id').isMongoId()],
  validate,
  async (req, res, next) => {
    try {
      const collab = await Collaboration.findById(req.params.id).lean();
      if (!collab) return res.status(404).json({ error: 'Collaboration not found' });
      res.json(collab);
    } catch (err) {
      next(err);
    }
  }
);

// ── POST /api/collaborations ──────────────────────────────────────────────────
router.post(
  '/',
  upload.single('image'),
  collabValidation,
  validate,
  async (req, res, next) => {
    try {
      const { artist, project, type, description, year, genre, spotifyId } = req.body;
      const imageUrl = req.file?.path ?? req.body.image;

      const collab = await Collaboration.create({
        artist, project, type, description,
        year:      Number(year),
        genre,     spotifyId,
        image:     imageUrl,
      });

      res.status(201).json(collab);
    } catch (err) {
      next(err);
    }
  }
);

// ── PATCH /api/collaborations/:id ─────────────────────────────────────────────
router.patch(
  '/:id',
  [param('id').isMongoId()],
  validate,
  async (req, res, next) => {
    try {
      const collab = await Collaboration.findByIdAndUpdate(req.params.id, req.body, {
        new:           true,
        runValidators: true,
      });
      if (!collab) return res.status(404).json({ error: 'Collaboration not found' });
      res.json(collab);
    } catch (err) {
      next(err);
    }
  }
);

// ── DELETE /api/collaborations/:id ────────────────────────────────────────────
router.delete(
  '/:id',
  [param('id').isMongoId()],
  validate,
  async (req, res, next) => {
    try {
      const collab = await Collaboration.findByIdAndDelete(req.params.id);
      if (!collab) return res.status(404).json({ error: 'Collaboration not found' });
      res.json({ message: 'Collaboration deleted', id: req.params.id });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
