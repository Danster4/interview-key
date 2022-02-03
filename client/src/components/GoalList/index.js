import React from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { REMOVE_GOAL } from '../../utils/mutations';
import { QUERY_GOALS, QUERY_ME } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';


const GoalList = ({ goals, username }) => {

  const [removeGoal] = useMutation(REMOVE_GOAL);

  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  const handleDeleteGoal = async (goalId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGoal({
        variables: { goalId },
        update(cache) {
          const normalizedId = cache.identify({ goalId, __typename: 'Goal' });
          cache.evict({ goalId: normalizedId });
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
      <h1>
        Hi, {username}!
      </h1>
      {goals &&
        goals.map(goal => (
          // <div key={goal._id} className="card mb-3">
          //   <div className="card-body">
          //     <Link to={{ pathname: `/goal/${goal._id}`, state: { goal: goal, username: username } }}>
          //       <p>{goal.goalName}</p>
          //       <p>Interviews: {goal.interviews.length}</p>
          //     </Link>
          //     <button className='btn-block btn-danger' onClick={() => handleDeleteGoal(goal._id)}>
          //       Delete this Goal!
          //     </button>
          //   </div>
          // </div>
          <div key={goal._id} class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  {/* <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" /> */}
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  {/* <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                    <br/>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus t/urpis.
                  </p> */}
                  <Link to={{ pathname: `/goal/${goal._id}`, state: { goal: goal, username: username } }}>
                    <strong><p>{goal.goalName}</p></strong>
                    <small><p>Interviews: {goal.interviews.length}</p></small>
                  </Link>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">


                    <a>
                      <i class="fa fa-trash" aria-hidden="true" onClick={() => handleDeleteGoal(goal._id)}></i>
                    </a>
                    {/* <button className='btn-block btn-danger' onClick={() => handleDeleteGoal(goal._id)}>
                 Delete this Goal!
               </button> */}
                  </div>
                </nav>
              </div>
            </article>
          </div>
        ))}
    </div>
  );
};



export default GoalList;

// ,
//         update(cache) {
//           cache.modify({
//             fields: {
//               goals(currentGoalsRefs, { readField }) {
//                 return currentGoalsRefs.filter(
//                   goalRef => goalId !== readField('goalId', goalRef),
//                 )
//               }
//             }
//           })
//         }



// const [removeGoal, { error }] = useMutation(REMOVE_GOAL, {
//   update(cache, { data: { addGoal } }) {
//     try {
//       // read what's currently in the cache
//       const { goals } = cache.readQuery({ query: QUERY_GOALS });

//       // prepend the newest thought to the front of the array
//       cache.writeQuery({
//         query: QUERY_GOALS,
//         data: { goals: [addGoal, ...goals] }
//       });
//     } catch (e) {
//       console.error(e)
//     }

//     // update me object's cache, appending new thought to the end of the array
//     const { me } = cache.readQuery({ query: QUERY_ME });
//     cache.writeQuery({
//       query: QUERY_ME,
//       data: { me: { ...me, goals: [...me.goals, addGoal] } }
//     });
//   }
// });