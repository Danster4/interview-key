// import React from 'react';
// import { Redirect, useParams } from 'react-router-dom';
// import { QUERY_GOALS, QUERY_ME } from '../utils/queries';
// import GoalList from '../components/GoalList';
// import Auth from '../utils/auth';
// import GoalForm from '../components/GoalForm';
// import { useQuery, useMutation } from '@apollo/client';
// import { ADD_GOAL } from '../utils/mutations';



// const Profile = () => {
//   const [addGoal] = useMutation(ADD_GOAL);
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(QUERY_ME, {
//     variables: { username: userParam }
//   });

//   const user = data?.me || {};

//   // redirect to personal profile page if username is the logged-in user's
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Redirect to="/profile" />;
//   }


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this page. Use the navigation links about to sign up or log in!
//       </h4>
//     )
//   }

//   const handleClick = async () => {
//     try {
//       await addGoal({
//         variables: { id: goal._id}
//       });

//       window.alert(`You have added a new goal, ${user.username}!`)
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   return (
//     <div>
//       <div className="flex-row mb-3">
//         <h2 className="bg-dark text-secondary p-3 display-inline-block">
//           Viewing {userParam ? `${user.username}'s` : `your`} profile.
//         </h2>

//         {userParam && (<button className="btn ml-auto" onClick={handleClick}>
//           Add Friend
//         </button>
//         )}
//       </div>

//       <div className="flex-row justify-space-between mb-3">
//         <div className="col-12 mb-3 col-lg-8">
//           <GoalList
//               goals={userData.me.goals}
//           />
//         </div>

//       </div>
//       <div className='mb-3'>{!userParam && <GoalForm />}</div>
//     </div>
//   );
// };

// export default Profile;
