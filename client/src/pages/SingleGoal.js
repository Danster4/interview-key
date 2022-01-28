import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GOAL } from '../utils/queries';
// import Auth from '../utils/auth';
// import ReactionList from '../components/ReactionList';
// import ReactionForm from '../components/ReactionForm';

const SingleGoal = props => {
  const { id: goalId } = useParams();

  const { loading, data } = useQuery(QUERY_GOAL, {
    variables: { id: goalId }
  });

  const goal = data?.goal || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {goal.username}
          </span>{' '}
          goal created on {goal.createdAt}
        </p>
        <div className="card-body">
          <p>{goal.goalName}</p>
        </div>
      </div>

      {/* {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />} */}
    </div>

    
  );
};

export default SingleGoal;
