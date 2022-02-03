import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_INTERVIEW } from '../utils/mutations';
import Auth from '../utils/auth';


const SingleInterview = (props) => {
  

  const { interview, username, goalId } = props.location.state
  
  const url = `/goal/${goalId}/interview/${interview._id}`;
  const interviewId = url.substring(url.lastIndexOf('/') + 1);
  console.log(interviewId);

  const _id = interview._id

  const [removeInterview] = useMutation(REMOVE_INTERVIEW);

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
      {/* leave area for back button ... working on back button to individual goal - for now, use browser back arrow or dashboard button */}
      {/* <button key={goalId}>
        {/* <Redirect to="/goal/${goalId}">
          <h4>Back to your Goal</h4> 
        </Redirect>  */}
        {/* <Link to={{ pathname: `/goal/${goalId}` }}>
                <p>Back to Goal</p>
        </Link> */}
      {/* </button> */} 

      <h1 className='is-size-2 has-text-centered'>
        Hi {username}
      </h1>
      <div className="card mb-3 has-text-centered is-centered">
        <p className="is-size-4 has-text-centered is-centered">
            {interview.interviewPosition} at {interview.interviewLocation}
        </p>
        <p>
          Interview created on {interview.createdAt}
        </p>
        <div className="card-body">
          <p><strong>Position:</strong> {interview.interviewPosition}</p>
          <p><strong>Location:</strong> {interview.interviewLocation}</p>
          <p><strong>Interview:</strong> {interview.interviewTime} at {interview.interviewDate}</p>
          <a className='btn-block btn-danger fa fa-trash' onClick={() => handleDeleteInterview(goalId, interview._id)}>
            
          </a>
        </div>
      </div>      
    </div>

    
  );
};

export default SingleInterview;
