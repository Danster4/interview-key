const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const interviewSchema = require('./Interview');


const goalSchema = new Schema(
  {
    goalName: {
      type: String,
      required: 'You need to name a Goal!',
      minlength: 1,
      maxlength: 280
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
    interviews: [interviewSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

goalSchema.virtual('interviewCount').get(function() {
  return this.interviews.length;
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;
