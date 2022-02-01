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
        // update(cache) {
        //   const normalizedId = cache.identify({ _id, __typename: 'Goal' });
        //   cache.evict({ _id: normalizedId });
        //   cache.gc();
        // }
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
          <button className='btn-block btn-danger' onClick={() => handleDeleteInterview(interview._id)}>
            Delete this Interview!
          </button>
        </div>
      </div>      
    </div>

    
  );
};

export default SingleInterview;
