import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GOALS, QUERY_ME } from '../utils/queries';
import GoalList from '../components/GoalList';

import Auth from '../utils/auth';
import GoalForm from '../components/GoalForm';

const Dashboard = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_GOALS);
  const goals = data?.goals || [];
  console.log(goals);

  const loggedIn = Auth.loggedIn();
  
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME);
  console.log(userData);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        
        <div className={`col-12 mb-3`}>
          <h2 class="GoalTitle">
            Your Goals
          </h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GoalList goals={goals} />
          )}
        </div>

        {/* { userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <GoalList
              goals={userData.me.goals}
            />
          </div>
        ) : null} */}
        
          <div className="col-12 mb-3">
            <GoalForm />
          </div>
      
      </div>
    </main>
  );
};

export default Dashboard;
