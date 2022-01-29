import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GOAL } from '../utils/queries';
// import Auth from '../utils/auth';
import InterviewList from '../components/InterviewList';
// import ReactionForm from '../components/ReactionForm';

const SingleGoal = (props) => {
  const { _id: goalId } = useParams();

  // const { loading, data } = useQuery(QUERY_GOAL, {
  //   variables: { id: goalId }
  // });

  const { goal, username } = props.location.state


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
           
          </span>{' '}
          goal created on {goal.createdAt}
        </p>
        <div className="card-body">
          <p>{goal.goalName}</p>
        </div>
      </div>

      {goal.interviewCount > 0 && <InterviewList interviews={goal.interviews} username={username} goalId={goal._id}/>}
      
    </div>

    
  );
};

export default SingleGoal;
