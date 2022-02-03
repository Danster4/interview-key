import React from 'react';
import InterviewList from '../components/InterviewList';
import InterviewForm from '../components/InterviewForm';

const SingleGoal = (props) => {
  const { goal, username } = props.location.state

  return (
    <div class="card is-centered">
      <header class="card-header">
        <p class="card-header-title is-size-2 has-text-centered">
          {goal.goalName}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p className="title is-size-4">
            <span style={{ fontWeight: 700 }} className="text-light">
             
            </span>{' '}
            This position was created on {goal.createdAt}
          </p>
        </div>
      </div>
      <div class="card-footer">
        {goal.interviews.length > 0 && <InterviewList interviews={goal.interviews} username={username} goalId={goal._id}/>}
      </div>
      <div className="card">
      <h4 className='card-header card-header-title is-centered'>New Interview</h4>
        <InterviewForm  goalId={goal._id}/>
      </div>
    </div>

    
  );
};

export default SingleGoal;
