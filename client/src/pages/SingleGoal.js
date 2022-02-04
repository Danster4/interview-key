import React from 'react';
import InterviewList from '../components/InterviewList';
import InterviewForm from '../components/InterviewForm';

const SingleGoal = (props) => {
  const { goal, username } = props.location.state

  return (
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {goal.goalName}
        </p>
      </header>
      
      <div class="card-content">
        <div class="content">
          <p className="title">
            <span style={{ fontWeight: 700 }} className="text-light">
             
            </span>{' '}
            You created this goal on {goal.createdAt}
          </p>
        </div>
      </div>
      
      <footer class="card-footer">
        {goal.interviews.length > 0 && <InterviewList interviews={goal.interviews} username={username} goalId={goal._id}/>}
        <div className="col-12 mb-3">
          <InterviewForm  goalId={goal._id}/>
        </div>
      </footer>
    </div>

    
  );
};

export default SingleGoal;
