import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($goalName: String!) {
    addGoal(goalName: $goalName) {
      _id
      goalName
      createdAt
      username
    }
  }
`;

export const ADD_INTERVIEW = gql`
  mutation addInterview($goalId: ID!, $interviewPosition: String!, $interviewLocation: String!, $interviewDate: String!, $interviewTime: String!) {
    addInterview(goalId: $goalId, interviewPosition: $interviewPosition, interviewLocation: $interviewLocation, interviewDate: $interviewDate, interviewTime: $interviewTime) {
      _id
      interviews {
        _id
        interviewPosition
        interviewLocation
        interviewDate
        interviewTime
        createdAt
        username
      }
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($goalId: ID!) {
    removeGoal(goalId: $goalId) {
      _id
      goalName
    } 
  }
`;