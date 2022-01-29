import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GOAL } from '../utils/queries';
// import Auth from '../utils/auth';
import InterviewList from '../components/InterviewList';
// import ReactionForm from '../components/ReactionForm';

const SingleInterview = (props) => {
  // const { _id: goalId } = useParams();

  // const { loading, data } = useQuery(QUERY_GOAL, {
  //   variables: { id: goalId }
  // });

  const { interview, username } = props.location.state


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>
        Hi {username}
      </h1>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {interview.interviewPosition} at {interview.interviewLocation}
          </span>
          {' '}
          goal created on {interview.createdAt}
        </p>
        <div className="card-body">
          <p>Position: {interview.interviewPosition}</p>
          <p>Location: {interview.interviewLocation}</p>
          <p>Interview: {interview.interviewTime} at {interview.interviewDate}</p>
        </div>
      </div>      
    </div>

    
  );
};

export default SingleInterview;
