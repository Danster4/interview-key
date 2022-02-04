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

      <form class="box">
        <div class="field">
          <h1>
            Hello {username}
          </h1>
          <p className="card-header">
            <span style={{ fontWeight: 700 }} className="text-light">
              {interview.interviewPosition} at {interview.interviewLocation}
            </span>
            {' '}
            Goal created on {interview.createdAt}
          </p>
        </div>
        <div class="field">
          <label class="label">Postion</label>
          <div class="control">
            <p>{interview.interviewPosition}</p>
          </div>
        </div>
  
        <div class="field">
          <label class="label">Location</label>
          <div class="control">
            <p>{interview.interviewLocation}</p>
          </div>
        </div>

        <div class="field">
          <label class="label">Interview</label>
          <div class="control">
            <p>{interview.interviewTime} at {interview.interviewDate}</p>
          </div>
        </div>
  
        <button className='btn-block btn-danger' onClick={() => handleDeleteInterview(goalId, interview._id)}>
          Delete this Interview!
        </button>
      </form>
    </div>

    
  );
};

export default SingleInterview;
