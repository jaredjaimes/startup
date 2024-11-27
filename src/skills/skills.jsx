import React, { useState } from 'react';
// this manages the components state
import 'bootstrap/dist/css/bootstrap.min.css';
import './skills.css';

export function Skills() {
  // State for the list of skills
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  // Function to handle adding a new skill
  const addSkill = () => {
    if (newSkill.trim() !== '') { //checks if input is not empty
      setSkills([...skills, { name: newSkill, completed: false }]);//adds new skill
      setNewSkill(''); // Clear the input field
    }
  };

  // Function to toggle skill completion
  const toggleCompletion = (index) => {
    setSkills(
      skills.map((skill, i) =>
        i === index ? { ...skill, completed: !skill.completed } : skill
      )
    );
  };

  // Function to delete a skill
  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <main className="container">
      <h2 id="rank-lvl">Skill Tracker</h2>

      {/* Input Field for Adding Skills */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addSkill}>
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <ul className="list-group">
        {skills.map((skill, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              skill.completed ? 'list-group-item-success' : ''
            }`}
          >
            <span
              style={{
                textDecoration: skill.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleCompletion(index)}
            >
              {skill.name}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteSkill(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}


