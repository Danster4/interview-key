const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ratingSchema = new Schema(
  {
    rateLocation: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// ratingSchema.virtual('ratingCategoriesCount').get(function() {
//   return this.ratings.length;
// });

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
