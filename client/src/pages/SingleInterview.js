import React from 'react';

const SingleInterview = (props) => {

  const { interview, username } = props.location.state

  return (
    <div>
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
