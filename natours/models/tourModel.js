const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// ======== Tour Schema ===
const tourSchema = new mongoose.Schema(
  // ---- Schema ----
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      // built-in validator
      required: [true, 'A tour must have a name'],
      maxlength: [40, 'A tour name must have less than 40 characters'],
      minlength: [10, 'A tour name must have more than 10 characters'],
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
      // built-in validator
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
      // validator package
      validate: [validator.isAlpha, 'Difficulty must only contains characters'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      // built-in validator
      min: [1, 'Ratings must be above 1.0'],
      max: [1, 'Ratings must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      // custom validator
      validate: {
        validator: function (val) {
          // <this> points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular one',
      },
    },
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
// runs before .save() and .create(): add a slugify string property.
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
