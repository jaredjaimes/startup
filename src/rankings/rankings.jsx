// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './rankings.css';

// export function Rankings() {
//   return (
//     <main>
//       {/* Leaderboard Section */}
//       <section className="leaderboard-section">
//         <table className="table table-striped table-hover">
//           <caption>Leaderboard</caption>
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Level</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>도윤 이</td>
//               <td>54</td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Annie James</td>
//               <td>52</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td>Gunter Spears</td>
//               <td>50</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>

//       {/* Friends Progress Section */}
//       <section className="friends-progress-section mt-5">
//         <table className="table table-striped table-hover">
//           <caption>Friends Progress</caption>
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Level</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Jared Jaimes</td>
//               <td>10</td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Chris Pratt</td>
//               <td>9</td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td>Kendrick Lamar</td>
//               <td>6</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </main>
//   );
// }

import React, { useState, useEffect } from 'react';
import { SkillNotifier } from '../skillNotifier'; // Import SkillEventNotifier
import './rankings.css'; // Your original CSS file

export function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // Function to update rankings when events are broadcasted
    const updateRankings = (event) => {
      if (event.type === 'gameEnd') {
        setRankings((prevRankings) => {
          const updated = [...prevRankings];
          const index = updated.findIndex((p) => p.name === event.value.name);
          if (index !== -1) {
            // Update the existing player ranking
            updated[index] = { ...event.value };
          } else {
            // Add a new player ranking
            updated.push(event.value);
          }
          // Sort by total points in descending order
          return updated.sort((a, b) => b.score - a.score);
        });
      }
    };

    // Subscribe to the SkillEventNotifier
    SkillEventNotifier.addHandler(updateRankings);

    return () => {
      // Unsubscribe from SkillEventNotifier
      SkillEventNotifier.removeHandler(updateRankings);
    };
  }, []);

  return (
    <main className="container">
      <h2 id="rank-title">Player Rankings</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}