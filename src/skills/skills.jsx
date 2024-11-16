import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './skills.css';

export default function Skills() {
  return (
    <main>
      <h2 id="rank-lvl">Level: 10</h2>

      {/* Spiritual Skills Section */}
      <section className="skill-section">
        <hr />
        <h3>Spiritual: lv 3</h3>
        <div className="d-flex mb-3">
          <input
            type="text"
            id="spiritualQuest"
            className="form-control me-2"
            placeholder="Input quest"
            aria-label="Add Spiritual Quest"
          />
          <button type="button" className="btn btn-primary">Add Quest</button>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <label>
              <input type="checkbox" name="studyScriptures" value="Quest 1" />
              Study Scriptures
            </label>
          </li>
          <li className="list-group-item">
            <label>
              <input type="checkbox" name="conveyWithTheLord" value="Quest 2" />
              Convey with the Lord
            </label>
          </li>
        </ul>
      </section>

      {/* Finance Skills Section */}
      <section className="skill-section">
        <hr />
        <h3>Finance: lv 2</h3>
        <div className="d-flex mb-3">
          <input
            type="text"
            id="financeQuest"
            className="form-control me-2"
            placeholder="Input quest"
            aria-label="Add Finance Quest"
          />
          <button type="button" className="btn btn-primary">Add Quest</button>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <label>
              <input type="checkbox" name="budget" value="Quest 1" />
              Look at budget
            </label>
          </li>
        </ul>
      </section>

      {/* Add Skill Section */}
      <section className="add-skill-section">
        <hr />
        <div className="d-flex mb-3">
          <input
            type="text"
            id="newSkill"
            className="form-control me-2"
            placeholder="Ex: Strength, Knowledge"
            aria-label="Add New Skill"
          />
          <button type="button" className="btn btn-success">Add Skill</button>
        </div>
      </section>

      {/* Quests Board */}
      <section className="quests-board-section">
        <hr />
        <h3>Quests Board</h3>
        <p>Select quests to embark on for extra EXP points</p>
        <ul className="list-group">
          <li className="list-group-item">
            <label>
              <input type="checkbox" name="Exercise" value="Quest 1" />
              Exercise for 30 mins: +50xp
            </label>
          </li>
          <li className="list-group-item">
            <label>
              <input type="checkbox" name="cleanCar" value="Quest 2" />
              Clean car: +20xp
            </label>
          </li>
          <li className="list-group-item">
            <label>
              <input type="checkbox" name="goForAWalk" value="Quest 3" />
              Go for a walk: +10xp
            </label>
          </li>
        </ul>
      </section>
    </main>
  );
}
