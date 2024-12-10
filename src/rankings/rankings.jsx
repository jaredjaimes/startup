import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
      });
  }, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <table className='table table-warning table-striped-columns'>
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id='scores'>{scoreRows}</tbody>
      </table>
    </main>
  );
}


// import React, { useState, useEffect } from 'react';
// import './rankings.css';

// export function Rankings() {
//   const [rankings, setRankings] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/api/rankings')
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else if (res.status === 401) {
//           throw new Error('Unauthorized. Please log in.');
//         } else {
//           throw new Error('Failed to fetch rankings.');
//         }
//       })
//       .then((data) => setRankings(data || []))
//       .catch((err) => setError(err.message));
//   }, []);

//   return (
//     <main className="container">
//       <h2 id="rank-title">Player Rankings</h2>
//       {error && <p className="error">{error}</p>}
//       <table className="rankings-table">
//         <thead>
//           <tr>
//             <th>Player</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(rankings) && rankings.length > 0 ? (
//             rankings.map((player, index) => (
//               <tr key={index}>
//                 <td>{player.name}</td>
//                 <td>{player.score}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2">No rankings available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </main>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import './rankings.css';

// export function Rankings() {
//   const [rankings, setRankings] = useState([]);

//   useEffect(() => {
//     // Fetch rankings from the server
//     fetch('/api/rankings')
//       .then((res) => res.json())
//       .then((data) => setRankings(data))
//       .catch((err) => console.error('Error fetching rankings:', err));
//   }, []);

//   return (
//     <main className="container">
//       <h2 id="rank-title">Player Rankings</h2>
//       <table className="rankings-table">
//         <thead>
//           <tr>
//             <th>Player</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rankings.map((player, index) => (
//             <tr key={index}>
//               <td>{player.name}</td>
//               <td>{player.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </main>
//   );
// }

//Before simplification
// import React, { useState, useEffect } from 'react';
// import './rankings.css';

// export function Rankings() {
//   const [rankings, setRankings] = useState([]);

//   useEffect(() => {
//     // Fetch rankings from the server
//     fetch('/api/rankings')
//       .then((res) => res.json())
//       .then((data) => setRankings(data))
//       .catch((err) => console.error('Error fetching rankings:', err));
//   }, []);

//   return (
//     <main className="container">
//       <h2 id="rank-title">Player Rankings</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>Total Points</th>
//             <th>Player Level</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {rankings.map((player, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{player.name}</td>
//               <td>{player.points}</td>
//               <td>{player.level}</td>
//             </tr>
//           ))} */}
//         </tbody>
//       </table>
//     </main>
//   );
// }


//---------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import './rankings.css';

// export function Rankings() {
//   const [rankings, setRankings] = useState([]);

//   useEffect(() => {
//     const updateRankings = () => {
//       const storedData = localStorage.getItem('playerData');
//       if (storedData) {
//         const playerData = JSON.parse(storedData);

//         setRankings((prevRankings) => {
//           const updated = [...prevRankings];
//           const index = updated.findIndex((p) => p.name === playerData.name);
//           if (index !== -1) {
//             updated[index] = playerData;
//           } else {
//             updated.push(playerData);
//           }
//           return updated.sort((a, b) => b.score - a.score);
//         });
//       }
//     };

//     const interval = setInterval(updateRankings, 1000); // Mock real-time updates

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <main className="container">
//       <h2 id="rank-title">Player Rankings</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>Total Points</th>
//             <th>Player Level</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rankings.map((player, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{player.name}</td>
//               <td>{player.score}</td>
//               <td>{player.level}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </main>
//   );
// }