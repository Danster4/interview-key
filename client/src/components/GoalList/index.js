import React from 'react';
import { Link } from 'react-router-dom';
import SingleGoal from '../../pages/SingleGoal'

const GoalList = ({ goals, username }) => {
  if (!goals.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h1>
        Hi, {username}!
      </h1>
      {goals &&
        goals.map(goal => (
          <div key={goal._id} className="card mb-3">
            <div className="card-body">
              <Link to={{ pathname: `/goal/${goal._id}`, state: { goal: goal, username: username } }}>
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