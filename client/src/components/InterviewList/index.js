import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_INTERVIEW } from '../../utils/mutations';
import Auth from '../../utils/auth';

const InterviewList = ({ interviews, username, goalId }) => {

  const [removeInterview] = useMutation(REMOVE_INTERVIEW);
  // var url = `/goal/${goalId}`;
  // var goalId = url.substring(url.lastIndexOf('/') + 1);
  // alert(goalId);

  if (!interviews || !interviews.length) {
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

        /*{/*<button className="btn w-100 display-block mb-2" key={interview._id}>
          <Link to={{ pathname: `/goal/${goalId}/interview/${interview._id}`, state: { goalId: goalId, interview: interview, username: username } }}>
            <h2>{interview.interviewPosition}
              <br />
              at {interview.interviewLocation}</h2>
          </Link>
          <button className='button is-info' onClick={() => handleDeleteInterview(goalId, interview._id)}>
            Delete this Interview!
          </button>
        </button>*/

          < div key = { interview._id } class= "box" >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                {/*<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"></img>*/}
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                {/*<p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                </p>*/}

                <Link to={{ pathname: `/goal/${goalId}/interview/${interview._id}`, state: { goalId: goalId, interview: interview, username: username } }}>
                  <h2>{interview.interviewPosition}
                    <br />
                    at {interview.interviewLocation}</h2>
                </Link>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" aria-label="reply">
                    <a>
                      <i class="fa fa-trash" aria-hidden="true" onClick={() => handleDeleteInterview(goalId, interview._id)}></i>
                    </a>
                    
                  </a>


                </div>
              </nav>
            </div>
          </article>
        </div>


  ))
};

    </div >
  );
};

export default InterviewList;