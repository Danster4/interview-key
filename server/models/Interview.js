const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const interviewSchema = new Schema(
  {
    interviewPosition: {
      type: String,
      required: 'You need to name the position you are interviewing for!'
    },
    interviewLocation: {
      type: String,
      required: 'You need to name the location/company/school you are interviewing for!'
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
    // figure out how to add specific Date (on calendar)
    interviewDate: {
      type: Date,
    },
    // figure out info for Time
    interviewTime: {
      type: Date,
    },
    // ratings: 
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Rating'
    // }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

interviewSchema.virtual('ratingCategoriesCount').get(function() {
  return this.ratings.length;
});

module.exports = interviewSchema;
