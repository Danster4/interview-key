const { AuthenticationError } = require('apollo-server-express');
const { User, Goal } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v')
          .populate('goals')
          .populate('interviews')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goal.find(params).sort({ createdAt: -1 });
    },
    // get a goal by ID
    goal: async (parent, { _id }) => {
      return Goal.findOne({ _id });
    },

    // // get an interview by ID
    // interview: async (parent, { _id }) => {
    //   return Goal.findOne(interviews: { _id });
    // },

    // get all users
    users: async () => {
      return User.find()
        .select('-__v')
        .populate('goals')
        .populate('interviews')
        .populate('ratings');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v')
        .populate('goals')
        .populate('interviews')
        .populate('ratings');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addGoal: async (parent, args, context) => {
      if (context.user) {
        const goal = await Goal.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { goals: goal._id } },
          { new: true }
        );
    
        return goal;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    addInterview: async (parent, { goalId, interviewPosition, interviewLocation, interviewDate, interviewTime }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { $push: { interviews: { interviewPosition, interviewLocation, interviewDate, interviewTime, username: context.user.username } } },
          { new: true, runValidators: true }
        );
    
        return updatedGoal;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    removeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const deletedGoal = await Goal.findOneAndDelete(
          { _id: goalId }
        );
    
        return deletedGoal;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    removeInterview: async (parent, { goalId, _id }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { $pull: { interviews: { _id } } },
          { new: true, runValidators: true }
        );
    
        return updatedGoal;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    // removeInterview: async (parent, { goalId, interviewId }, context) => {
    //   if (context.user) {
    //     const updatedGoal = await Goal.findOneAndUpdate(
    //       { _id: goal._id },
    //       { $pull: { interviews: { interviewId } } },
    //       { new: true }
    //     );
    
    //     return updatedGoal;
    //   }
    
    //   throw new AuthenticationError('You need to be logged in!');
    // }

    // addRating: async (parent, { interviewId, rateLocation, ratePeople }, context) => {
    //   if (context.user) {
    //     const updatedInterview = await Interview.findOneAndUpdate(
    //       { _id: interviewId },
    //       { $push: { ratings: { rateLocation, ratePeople, username: context.user.username } } },
    //       { new: true, runValidators: true }
    //     );
    
    //     return updatedInterview;
    //   }
    
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    
    // addRating: async (parent, { goalId, interviewPosition, interviewLocation, interviewDate, interviewTime }, context) => {
    //   if (context.user) {
    //     const updatedGoal = await Goal.findOneAndUpdate(
    //       { _id: goalId },
    //       { $push: { interviews: { interviewPosition, interviewLocation, interviewDate, interviewTime, username: context.user.username } } },
    //       { new: true, runValidators: true }
    //     );
    
    //     return updatedGoal;
    //   }
    
    //   throw new AuthenticationError('You need to be logged in!');
    // },

  

    // addRating: async (parent, { goalId, rateLocation }, context) => {
    //   if (context.user) {
    //     const updatedGoal = await Goal.findOneAndUpdate(
    //       { _id: interviewId },
    //       { $push: { ratings: { rateLocation, username: context.user.username } } },
    //       { new: true, runValidators: true }
    //     );
    
    //     return updatedInterview;
    //   }
    
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // removeInterview: async (parent, { goalId, interviewPosition, interviewLocation }, context) => {
    //   if (context.user) {
    //     const updatedGoal = await Goal.findOneAndUpdate(
    //       { _id: goalId },
    //       { $push: { interviews: { interviewPosition, interviewLocation, username: context.user.username } } },
    //       { new: true, runValidators: true }
    //     );
    
    //     return updatedGoal;
    //   }
    
    //   throw new AuthenticationError('You need to be logged in!');
    // },







  }
};

module.exports = resolvers