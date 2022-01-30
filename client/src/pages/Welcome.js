import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Welcome = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState}
      });
      Auth.login(data.login.token)
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  
  if (Auth.loggedIn()) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className='columns is-multiline'>
      <h1 className='column is-full'>Welcome to Interview Key!</h1>
      <div className='column is-half'>
        <div className='card'>
          <h4 className='card-header card-header-title'>Login</h4>
          <div className='card-content'>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  className='input'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  className='input'
                  placeholder='******'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
            </div>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
