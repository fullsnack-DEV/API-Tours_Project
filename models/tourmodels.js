const mongoose = require('mongoose');
const slugify = require('slugify');
const tourschems = new mongoose.Schema(
  // implemnted a Data Validation in Schema

  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour must have a less or equal than 40 charaters'],
      minlength: [10, 'Tour must have a less or equal than 10 charaters'],
    },

    //implemeting a Slug // sLUGIFY PACAJ

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
      enum: {
        values: ['easy', 'Medium', 'difficult'],
        message: 'Difficulty is either easy medium or difficult',
      },
    },

    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    //Implementing Custom Validation

    priceDiscount: {
      type: Number,
      validate: {
        message: 'Discount Price should be below the regular price',
        validator: function (val) {
          return val < this.price;
        },
      },
    },
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
//Query Middleware
tourschems.pre(/^find/, function (next) {
  this.find({ specialtour: { $ne: true } });
  next();
});
//Aggregation Middleware
tourschems.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { specialtour: { $ne: true } } });

  next();
});
const Tour = mongoose.model('Tour', tourschems);

module.exports = Tour;
