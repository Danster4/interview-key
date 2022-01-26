const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ratingSchema = new Schema(
  {
    rateLocation: {
      type: Number
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

module.exports = ratingSchema;
