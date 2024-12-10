import React, { useState, useEffect } from 'react';
import './rankings.css';

export function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // Fetch rankings from the server
    fetch('/api/rankings')
      .then((res) => res.json())
      .then((data) => setRankings(data))
      .catch((err) => console.error('Error fetching rankings:', err));
  }, []);

  return (
    <main className="container">
      <h2 id="rank-title">Player Rankings</h2>
      <table className="rankings-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

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