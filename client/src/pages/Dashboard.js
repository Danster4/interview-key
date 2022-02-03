import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import GoalList from '../components/GoalList';

import Auth from '../utils/auth';
import GoalForm from '../components/GoalForm';

const Dashboard = () => {
  const loggedIn = Auth.loggedIn();

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME);
  console.log(userData);

  return (
    <main>
      <div className=''>

        <div className={`col-12 mb-3`}>
          <h2 class="GoalTitle is-size-3 has-text-centered">
            Your Positions
          </h2>
        </div>

        {/* userData is undefined in console log, but token is saved in localStorage */}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3 ">
            <GoalList
              goals={userData.me.goals}
              username={userData.me.username}
            />
          </div>
        ) : null}
        
          <div className="card">
          <h4 className='card-header card-header-title is-centered'>New Job Title</h4>
            <GoalForm />
          </div>
      
      </div>
    </main>
  );
};

export default Dashboard;
