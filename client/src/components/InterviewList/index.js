import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_INTERVIEW } from '../../utils/mutations';
import Auth from '../../utils/auth';

const InterviewList = ({interviews, username, goalId}) => {

  const [removeInterview] = useMutation(REMOVE_INTERVIEW);
  // var url = `/goal/${goalId}`;
  // var goalId = url.substring(url.lastIndexOf('/') + 1);
  // alert(goalId);

  if (!interviews || !interviews.length ) {
    return <p className='bg-dark text-light p-3'>{username}, set up some interviews!</p>;
  }

  const handleDeleteInterview = async (goalId, _id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeInterview({
        variables: { goalId, _id },
        update(cache) {
          const normalizedId = cache.identify({ _id, __typename: 'Goal' });
          cache.evict({ _id: normalizedId });
          cache.gc();
        }
      });

      <Redirect to="/dashboard" />

    } catch (err) {
      console.error(err);
    }
  };
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
          <button className='button is-info' onClick={() => handleDeleteInterview(goalId, interview._id)}>
            Delete this Interview!
          </button>
        </button>
      ))}


    </div>
  );
};

export default InterviewList;