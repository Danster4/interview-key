import React, { useState } from 'react';
import { ADD_INTERVIEW } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const InterviewForm = ({ goalId }) => {
  const [interviewPosition, setPosition] = useState('');
  const [interviewLocation, setLocation] = useState('');
  const [interviewTime, setTime] = useState('');
  const [interviewDate, setDate] = useState('');
  const [addInterview, { error }] = useMutation(ADD_INTERVIEW);


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
        variables: {goalId, interviewPosition, interviewLocation, interviewTime, interviewDate}
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
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="What is the interview position..."
          value={interviewPosition}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <textarea
          placeholder="Where is the interview location..."
          value={interviewLocation}
          className="form-input col-12 col-md-9"
          onChange={handleChange2}
        ></textarea>

        <textarea
          placeholder="When is the interview time..."
          value={interviewTime}
          className="form-input col-12 col-md-9"
          onChange={handleChange3}
        ></textarea>

        <textarea
          placeholder="When is the interview date..."
          value={interviewDate}
          className="form-input col-12 col-md-9"
          onChange={handleChange4}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;