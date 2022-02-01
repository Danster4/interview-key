import React from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { REMOVE_GOAL } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';


const GoalList = ({ goals, username }) => {

  const [removeGoal] = useMutation(REMOVE_GOAL);

  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  const handleDeleteGoal = async (goalId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGoal({
        variables: { goalId }
      });

      <Redirect to="/dashboard" />

    } catch (err) {
      console.error(err);
    }
  };

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
                <p>Interviews: {goal.interviews.length}</p>
              </Link>
              <button className='btn-block btn-danger' onClick={() => handleDeleteGoal(goal._id)}>
                Delete this Goal!
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GoalList;