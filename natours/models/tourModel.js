const mongoose = require('mongoose');
const slugify = require('slugify');

// ======== Tour Schema ===
const tourSchema = new mongoose.Schema(
  // ---- Schema ----
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a groupe size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  // ---- Options ----
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ======== Virtual Properties ===
// create a virtual property not register in the database.
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// ======== Document Middleware ===
// runs before .save() and add a slugify string property.
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// ======== Query Middleware ===
// runs before all find() methods: filter secret tours and create date.
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// runs after all find() methods: shows how long it took
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms!`);
  next();
});

// ======== Aggregation Middleware ===
// access the pipeline and add a match to filter secret tours
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
