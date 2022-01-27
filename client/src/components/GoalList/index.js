import React from 'react';
import { Link } from 'react-router-dom';

const GoalList = ({ goals }) => {
  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  return (
    <div>
      <h3>Goals</h3>
      {goals &&
        goals.map(goal => (
          <div key={goal._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${goal.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {goal.username}
              </Link>{' '}
              goal on {goal.createdAt}
            </p>
            <div className="card-body">
              {/* <Link to={`/thought/${thought._id}`}>
                <p>{thought.thoughtText}</p>
                <p className="mb-0">
                  Reactions: {thought.reactionCount} || Click to{' '}
                  {thought.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GoalList;