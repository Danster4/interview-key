import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = (props) => {
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
    <main className='columns is-multiline is-centered'>
      <div className='column is-6'>
        <div className='card'>
          <h4 className='card-header card-header-title is-centered'>Login</h4>
          <form className='card-content' onSubmit={handleFormSubmit}>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input
                  className='input'
                  placeholder='Email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
                <span class="icon is-medium is-left">
                  <FontAwesomeIcon icon={['fas', 'envelope']} />
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input
                  className='input'
                  placeholder='Password'
                  name='password'
                  type='password'
                  id='password'
                  value={formState.password}
                  onChange={handleChange}
                />
                <span class="icon is-medium is-left">
                  <FontAwesomeIcon icon={['fas', 'lock']} />
                </span>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-info">Submit</button>
              </div>
            </div>
            {error && <div>Login failed</div>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
