import React from 'react';
import './rankings.css';

export function Rankings() {
  const [rankings, setRankings] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/rankings')
      .then((response) => response.json())
      .then((rankings) => {
        setRankings(rankings);
      })
      .catch((error) => {
        console.error('Error fetching rankings:', error);
      });
  }, []);

  const rankingRows = [];
  if (rankings.length) {
    for (const [i, ranking] of rankings.entries()) {
      rankingRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{ranking.name}</td>
          <td>{ranking.score}</td>
          <td>{ranking.date ? new Date(ranking.date).toLocaleDateString() : "N/A"}</td>
        </tr>
      );
    }
  } else {
    rankingRows.push(
      <tr key="0">
        <td colSpan="4">No rankings available</td>
      </tr>
    );
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <table className="table table-warning table-striped-columns">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="rankings">{rankingRows}</tbody>
      </table>
    </main>
  );
}

//Before the big changes
// import React from 'react';
// import './rankings.css';

// export function Rankings() {
//   const [rankings, setRankings] = React.useState([]);

//   // Fetch rankings from the backend when the component mounts
//   React.useEffect(() => {
//     fetch('/api/rankings')
//       .then((response) => response.json())
//       .then((rankings) => {
//         setRankings(rankings);
//       })
//       .catch((error) => {
//         console.error('Error fetching rankings:', error);
//       });
//   }, []);

//   // Prepare ranking rows
//   const rankingRows = [];
//   if (rankings.length) {
//     for (const [i, ranking] of rankings.entries()) {
//       rankingRows.push(
//         <tr key={i}>
//           <td>{i + 1}</td>
//           <td>{ranking.name}</td>
//           <td>{ranking.score}</td>
//           <td>{new Date(ranking.date).toLocaleDateString()}</td>
//         </tr>
//       );
//     }
//   } else {
//     rankingRows.push(
//       <tr key="0">
//         <td colSpan="4">No rankings available</td>
//       </tr>
//     );
//   }

//   return (
//     <main className="container-fluid bg-secondary text-center">
//       <table className="table table-warning table-striped-columns">
//         <thead className="table-dark">
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>Score</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody id="rankings">{rankingRows}</tbody>
//       </table>
//     </main>
//   );
// }



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