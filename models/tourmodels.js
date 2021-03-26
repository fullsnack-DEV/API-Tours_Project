const mongoose = require('mongoose');
const slugify = require('slugify');
const tourschems = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
    },

    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },

    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },

    ratingAverage: {
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
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    price: {
      type: Number,
      required: [true, 'Tour must have a price'],
    },

    description: {
      type: String,
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, 'A image must have a name'],
    },

    images: [String],

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],

    specialtour: {
      type: Boolean,
    },
  },

  {
    //To JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//building a model

//Virtual properties

//used a normal function

tourschems.virtual('durationWeekdays').get(function () {
  return this.duration / 7;
});

//Document Middleware   pre and post
tourschems.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourschems.pre(/^find/, function (next) {
  this.find({ specialtour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourschems);

module.exports = Tour;
