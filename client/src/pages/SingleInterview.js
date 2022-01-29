import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const SingleInterview = (props) => {

  const { interview, username, goalId } = props.location.state

  return (
    <div>
      {/* leave area for back button ... working on back button to individual goal - for now, use browser back arrow or dashboard button */}
      {/* <button key={goalId}>
        {/* <Redirect to="/goal/${goalId}">
          <h4>Back to your Goal</h4> 
        </Redirect>  */}
        {/* <Link to={{ pathname: `/goal/${goalId}` }}>
                <p>Back to Goal</p>
        </Link> */}
      {/* </button> */} 

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
