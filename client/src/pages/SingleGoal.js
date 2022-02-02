import React from 'react';
import InterviewList from '../components/InterviewList';
import InterviewForm from '../components/InterviewForm';

const SingleGoal = (props) => {
  const { goal, username } = props.location.state
console.log(goal.interviews)
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
           
          </span>{' '}
          this goal was created on {goal.createdAt}
        </p>
        <div className="card-body">
          <p>{goal.goalName}</p>
        </div>
      </div>

      {goal.interviews.length > 0 && <InterviewList interviews={goal.interviews} username={username} goalId={goal._id}/>}
      <div className="col-12 mb-3">
        <InterviewForm  goalId={goal._id}/>
      </div>
        
    </div>

    
  );
};

export default SingleGoal;
