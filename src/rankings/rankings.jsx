import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './rankings.css';

export function Rankings() {
  return (
    <main>
      {/* Leaderboard Section */}
      <section className="leaderboard-section">
        <table className="table table-striped table-hover">
          <caption>Leaderboard</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>도윤 이</td>
              <td>54</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Annie James</td>
              <td>52</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Gunter Spears</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Friends Progress Section */}
      <section className="friends-progress-section mt-5">
        <table className="table table-striped table-hover">
          <caption>Friends Progress</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Jared Jaimes</td>
              <td>10</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Chris Pratt</td>
              <td>9</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Kendrick Lamar</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
