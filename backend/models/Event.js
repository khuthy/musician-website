'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Event title is required'],
      trim:     true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    date: {
      type:     Date,
      required: [true, 'Event date is required'],
    },
    venue: {
      type:     String,
      required: [true, 'Venue is required'],
      trim:     true,
    },
    location: {
      type:     String,
      required: [true, 'Location is required'],
      trim:     true,
    },
    ticketLink: {
      type:    String,
      trim:    true,
      match:   [/^https?:\/\//, 'Ticket link must be a valid URL'],
    },
    description: {
      type:      String,
      trim:      true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    image: {
      type: String,
      trim: true,
    },
    isSoldOut: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON:     { virtuals: true },
    toObject:   { virtuals: true },
  }
);

// Index for efficient date queries
eventSchema.index({ date: 1 });

// Virtual: whether the event is in the past
eventSchema.virtual('isPast').get(function () {
  return this.date < new Date();
});

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
