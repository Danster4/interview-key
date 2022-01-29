import React from 'react';
import { Link } from 'react-router-dom';
import SingleGoal from '../../pages/SingleGoal'

const GoalList = ({ goals }) => {
  if (!goals.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      
      {goals &&
        goals.map(goal => (
          <div key={goal._id} className="card mb-3">
            <div className="card-body">
              <Link to={`/goal/${goal._id}`}>
                <p>{goal.goalName}</p>
                <p>Interviews: {goal.interviewCount}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GoalList;