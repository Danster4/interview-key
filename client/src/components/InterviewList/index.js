// import React from 'react';
// import { Link } from 'react-router-dom';

// const InterviewList = ({ interviewCount, username, interviewPosition, interviewLocation }) => {
//   if (!interviews || !interviews.length) {
//     return <p className='bg-dark text-light p-3'>{username}, set up some interviews!</p>;
//   }

//   return (
//     <div>
//       <h5>
//         {username}'s {interviewCount} {interviewCount === 1 ? 'interview' : 'interviews'}
//       </h5>
//       {interviews.map(interview => (
//         <button className="btn w-100 display-block mb-2" key={interview._id}>
//           <Link to={`/profile/${username}/${goal._id}/${interview._id}`}>
//             <h2>{interviewPosition}</h2> 
//               <br /> 
//               at {interviewLocation}
//           </Link>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default InterviewList;