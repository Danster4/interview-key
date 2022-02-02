import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_GOAL } from '../../utils/mutations';
import { QUERY_GOALS, QUERY_ME } from '../../utils/queries';


const GoalForm = () => {
  const [goalName, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addGoal, { error }] = useMutation(ADD_GOAL, {
    update(cache, { data: { addGoal } }) {
      try {
        // read what's currently in the cache
        const { goals } = cache.readQuery({ query: QUERY_GOALS });

        // prepend the newest goal to the front of the array
        cache.writeQuery({
          query: QUERY_GOALS,
          data: { goals: [addGoal, ...goals] }
        });
      } catch (e) {
        console.error(e)
      }

      // update me object's cache, appending new goal to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({ 
        query: QUERY_ME,
        data: { me: { ...me, goals: [...me.goals, addGoal] } }
      });
    }
  });

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length)
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      // add thought to database
      await addGoal({
        variables: {goalName}
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
    <form 
        className="card-header card-header-title is-centered"
        onSubmit={handleFormSubmit}
      >
        <textarea 
          placeholder="Here's a new goal..."
          value={goalName}
          className="input is-info is-medium is-hover"
          onChange={handleChange}
        ></textarea>
        <button className="button is-info" type="submit">
          Submit
        </button>
      </form>
      
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className='ml-2'>Something went wrong...</span>}
      </p>
    </div>
  );
};

export default GoalForm;