const mongoose = require('mongoose');

const tourschems = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  price: {
    type: Number,

    required: [true, 'Tour must have a price'],
  },
});
//building a model

const Tour = mongoose.model('Tour', tourschems);

module.exports = Tour;
