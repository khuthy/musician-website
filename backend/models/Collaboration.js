'use strict';

const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema(
  {
    artist: {
      type:     String,
      required: [true, 'Artist name is required'],
      trim:     true,
    },
    project: {
      type:     String,
      required: [true, 'Project name is required'],
      trim:     true,
    },
    type: {
      type:     String,
      required: [true, 'Release type is required'],
      enum:     {
        values:  ['single', 'album', 'feature', 'EP'],
        message: '{VALUE} is not a valid release type',
      },
    },
    description: {
      type:     String,
      required: [true, 'Description is required'],
      trim:     true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    image: {
      type: String,
      trim: true,
    },
    year: {
      type:     Number,
      required: [true, 'Year is required'],
      min:      [2000, 'Year must be 2000 or later'],
      max:      [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    genre: {
      type: String,
      trim: true,
    },
    spotifyId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON:  { virtuals: true },
    toObject: { virtuals: true },
  }
);

collaborationSchema.index({ year: -1 });
collaborationSchema.index({ artist: 'text', project: 'text' });

module.exports =
  mongoose.models.Collaboration ||
  mongoose.model('Collaboration', collaborationSchema);
