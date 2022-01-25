const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    interviews: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Interview'
    }
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
