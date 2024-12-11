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
          <td>{ranking.email.split('@')[0]}</td>
          <td>{ranking.score}</td>
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
          </tr>
        </thead>
        <tbody id="rankings">{rankingRows}</tbody>
      </table>
    </main>
  );
}