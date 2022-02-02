import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email 
      goals {
        _id
        goalName
        createdAt
        interviewCount
        interviews {
          _id
          interviewPosition
          interviewLocation
          interviewDate
          interviewTime
          createdAt
        }
      }
    }
  }
`;

export const QUERY_USERS = gql `
  query {
    users {
      username
      _id
      email
      goalCount
      goals {
        _id
        goalName
        createdAt
        interviewCount
        interviews {
          interviewPosition
          interviewLocation
          interviewDate
          interviewTime
          createdAt
        }
      }
    }
  }
`;

export const QUERY_USER = gql `
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      goalCount
      goals {
        _id
        goalName
        interviewCount
        interviews {
          _id
          interviewPosition
          interviewLocation
          interviewDate
          interviewTime
          createdAt
        }
      }
    }
  }
`;


export const QUERY_GOALS = gql `
  query goals($username: String) {
    goals(username: $username) {
      _id
      goalName
      createdAt
      username
      interviewCount
      interviews {
        _id
        interviewPosition
        interviewLocation
        interviewDate
        interviewTime
        createdAt
      }
    }
  }
`;

export const QUERY_GOAL = gql `
  query goal($goalId: ID!) {
    goal(_id: $goalId) {
      _id
      goalName
      createdAt
      username
      interviewCount
      interviews {
        _id
        interviewPosition
        interviewLocation
        interviewDate
        interviewTime
        createdAt
      }
    }
  }
`;

export const QUERY_INTERVIEWS = gql`
  query goals($goalId: ID!) {
    interviews(_id: $goalId) {
      _id
      interviewPosition
      interviewLocation
      interviewDate
      interviewTime
      createdAt   
    }
  }
`;