import React from 'react';
import { Link } from 'react-router-dom';

const InterviewList = ({interviews, username, goalId}) => {
  if (!interviews || !interviews.length ) {
    return <p className='bg-dark text-light p-3'>{username}, set up some interviews!</p>;
  }

  return (
    <div>
    
      
      <h5>
        You have {interviews.length} {interviews.length === 1 ? 'interview' : 'interviews'}
      </h5>

      {interviews.map(interview => (

        <button className="btn w-100 display-block mb-2" key={interview._id}>
          <Link to={{ pathname: `/goal/${goalId}/interview/${interview._id}`, state: { goalId: goalId, interview: interview, username: username } }}>
            <h2>{interview.interviewPosition}
              <br /> 
              at {interview.interviewLocation}</h2> 
          </Link>
        </button>
      ))}


    </div>
  );
};

export default InterviewList;