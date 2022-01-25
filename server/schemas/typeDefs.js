// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    goals: [Goal]
  }

  type Goal {
    _id: ID
    goalName: String
    createdAt: String
    username: String
    interviewCount: Int
    Interviews: [Interview]
  }

  type Interview {
    _id: ID
    interviewPosition: String
    interviewLocation: String
    interviewDate: Int
    interviewTime: Int
    ratingCount: Int
    ratings: [Rating]
    createdAt: String
    username: String
  }

  type Rating {
    _id: ID
    rateLocation: Int
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    goals(username: String): [Goal]
    goal(_id: ID!): Goal
    interviews(username: String): [Interview]
    interview(_id: ID!): Interview
    ratings(username: String): [Rating]
    rating(_id: ID!): Rating
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGoal(goalName: String!): Goal
    addInterview(interviewPosition: String!, interviewLocation: String!): Interview
  }
`;

// export the typeDefs
module.exports = typeDefs;