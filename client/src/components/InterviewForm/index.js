import React, { useState } from 'react';
import { ADD_INTERVIEW } from '../../utils/mutations';
import { QUERY_INTERVIEWS, QUERY_ME, QUERY_GOALS } from '../../utils/queries';
import { useMutation } from '@apollo/client';

const InterviewForm = ({ goalId }) => {
  const [interviewPosition, setPosition] = useState('');
  const [interviewLocation, setLocation] = useState('');
  const [interviewTime, setTime] = useState('');
  const [interviewDate, setDate] = useState('');

  // addInterview Cache additional needed here
  const [addInterview, { error }] = useMutation(ADD_INTERVIEW, {
    update(cache, { data: { addGoal } }) {
      try {
        // read what's currently in the cache
        const { goals } = cache.readQuery({ query: QUERY_GOALS });

        console.log(goals)
        // prepend the newest goal to the front of the array
        // cache.writeQuery({
        //   query: QUERY_GOALS,
        //   data: { goals: [addGoal, ...goals] }
        // });
      } catch (e) {
        console.error(e)
      }

      // update me object's cache, appending new goal to the end of the array
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({ 
      //   query: QUERY_ME,
      //   data: { me: { ...me, goals: [...me.goals, addGoal] } }
      // });
    }
  });

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setPosition(event.target.value);
    }
  };

  const handleChange2 = event => {
    if (event.target.value.length <= 280) {
      setLocation(event.target.value);
    }
  };

  const handleChange3 = event => {
    if (event.target.value.length <= 280) {
      setTime(event.target.value);
    }
  };

  const handleChange4 = event => {
    if (event.target.value.length <= 280) {
      setDate(event.target.value);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      // add thought to database
      await addInterview({
        variables: { goalId, interviewPosition, interviewLocation, interviewTime, interviewDate }
      });

      // clear form value
      setPosition('');
      setLocation('');
      setTime('');
      setDate('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 error ? 'text-error' : ''}`}>

        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch container"
        onSubmit={handleFormSubmit}
      >
        <div class="field">
          <div class="control">
            <textarea
              placeholder="What is the interview position..."
              value={interviewPosition}
              className="form-input col-12 col-md-9 textarea is-normal"
              onChange={handleChange}
            ></textarea>          </div>
        </div>


        <div class="field">
          <div class="control">
            <textarea
              placeholder="Where is the interview location..."
              value={interviewLocation}
              className="form-input col-12 col-md-9 textarea is-normal"
              onChange={handleChange2}
            ></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea
              placeholder="When is the interview time..."
              value={interviewTime}
              className="form-input col-12 col-md-9 textarea is-normal"
              onChange={handleChange3}
            ></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea
              placeholder="When is the interview date..."
              value={interviewDate}
              className="form-input col-12 col-md-9 textarea is-normal"
              onChange={handleChange4}
            ></textarea>
          </div>
        </div>

        <button className="btn col-12 col-md-3 button is-info" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;


// const [addInterview, { error }] = useMutation(ADD_INTERVIEW, {
//   update(cache, { data: { addInterview } }) {
//     try {
//       // read what's currently in the cache
//       const { interviews } = cache.readQuery({ query: QUERY_INTERVIEWS });

//       // prepend the newest thought to the front of the array
//       cache.writeQuery({
//         query: QUERY_INTERVIEWS,
//         data: { interviews: [addInterview, ...interviews] }
//       });
//     } catch (e) {
//       console.error(e)
//     }

//     // update me object's cache, appending new thought to the end of the array
//     const { me } = cache.readQuery({ query: QUERY_ME });
//     cache.writeQuery({
//       query: QUERY_ME,
//       data: { me: { ...me.goals, interviews: [...me.goals.interviews, addInterview] } }
//     });
//   }
// });


// const [addInterview, { error }] = useMutation(ADD_INTERVIEW, {
//   update(cache, { data: { addInterview } }) {
//     try {
//       // read what's currently in the cache
//       const { interviews } = cache.readQuery({ query: QUERY_INTERVIEWS });

//       // prepend the newest interview to the front of the array
//       cache.writeQuery({
//         query: QUERY_INTERVIEWS,
//         data: { interviews: [addInterview, ...interviews] }
//       });
//     } catch (e) {
//       console.error(e)
//     }

//     // update me object's cache, appending new interview to the end of the array
//     const { me } = cache.readQuery({ query: QUERY_ME });
//     cache.writeQuery({
//       query: QUERY_ME,
//       data: { me: { goals: {interviews: [...me.goals.interviews, addInterview]} } }
//     });
//   }
// });