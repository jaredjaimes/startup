// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './skills.css';

// export function Skills() {
//   // State for tasks and skills
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [taskXP, setTaskXP] = useState(10); // Default XP for a task
//   const [skill, setSkill] = useState('');
//   const [skills, setSkills] = useState([]); // No default skills
//   const [newSkill, setNewSkill] = useState('');

//   // Function to handle adding a new task
//   const addTask = () => {
//     if (newTask.trim() !== '' && taskXP > 0 && skill !== '') {
//       setTasks([...tasks, { name: newTask, xp: taskXP, completed: false, skill }]);
//       setNewTask(''); // Clear the input field
//       setTaskXP(10); // Reset XP to default
//       setSkill(''); // Reset skill to default
//     }
//   };

//   // Function to toggle task completion
//   const completeTask = (index) => {
//     const task = tasks[index];

//     if (!task.completed) {
//       // Add XP to the corresponding skill when task is completed
//       setSkills(
//         skills.map((sk) =>
//           sk.name === task.skill
//             ? {
//                 ...sk,
//                 points: sk.points + task.xp, // Add task XP
//                 level: Math.floor((sk.points + task.xp) / 50) + 1, // Level up every 50 XP
//               }
//             : sk
//         )
//       );
//     }

//     // Mark the task as completed
//     setTasks(
//       tasks.map((t, i) =>
//         i === index ? { ...t, completed: true } : t
//       )
//     );
//   };

//   // Function to delete a task
//   const deleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   // Function to add a new skill
//   const addSkill = () => {
//     if (
//       newSkill.trim() !== '' &&
//       !skills.some((sk) => sk.name.toLowerCase() === newSkill.toLowerCase())
//     ) {
//       setSkills([...skills, { name: newSkill, points: 0, level: 1 }]);
//       setNewSkill(''); // Clear the input field
//     }
//   };

//   // Function to delete a skill
//   const deleteSkill = (skillName) => {
//     // Remove the skill and associated tasks
//     setSkills(skills.filter((sk) => sk.name !== skillName));
//     setTasks(tasks.filter((task) => task.skill !== skillName));
//   };

//   // Calculate total skill points
//   const totalPoints = skills.reduce((sum, sk) => sum + sk.points, 0);

//   // Calculate total player level
//   const playerLevel = Math.floor(totalPoints / 100) + 1;

//   return (
//     <main className="container">
//       <h2 id="rank-lvl">Skill Manager</h2>
//       <p>Total Skill Points: {totalPoints}</p>
//       <p>Player Level: {playerLevel}</p>

//       {/* Input Section for Adding Tasks */}
//       <div className="d-flex mb-3">
//         {/* Dropdown for selecting a skill */}
//         <select
//           className="form-select me-2"
//           value={skill}
//           onChange={(e) => setSkill(e.target.value)}
//         >
//           <option value="" disabled>
//             Select a skill
//           </option>
//           {skills.map((sk, index) => (
//             <option key={index} value={sk.name}>
//               {sk.name}
//             </option>
//           ))}
//         </select>

//         {/* Input for entering a task */}
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new way to develop the skill"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />

//         {/* Input for setting XP */}
//         <input
//           type="number"
//           className="form-control me-2"
//           placeholder="XP"
//           value={taskXP}
//           onChange={(e) => setTaskXP(Number(e.target.value))}
//         />

//         {/* Add Task Button */}
//         <button className="btn btn-primary" onClick={addTask}>
//           Add Task
//         </button>
//       </div>

//       {/* Input Section for Adding a New Skill */}
//       <div className="d-flex mb-4">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new skill"
//           value={newSkill}
//           onChange={(e) => setNewSkill(e.target.value)}
//         />
//         <button className="btn btn-secondary" onClick={addSkill}>
//           Create New Skill
//         </button>
//       </div>

//       {/* Skills and Tasks Section */}
//       {skills.map((sk) => (
//         <div key={sk.name} className="mb-4">
//           <h4>
//             {sk.name} - Level: {sk.level} (Points: {sk.points})
//             <button
//               className="btn btn-danger btn-sm ms-3"
//               onClick={() => deleteSkill(sk.name)}
//             >
//               Delete Skill
//             </button>
//           </h4>
//           <ul className="list-group">
//             {tasks
//               .filter((task) => task.skill === sk.name)
//               .map((task, index) => (
//                 <li
//                   key={index}
//                   className={`list-group-item d-flex justify-content-between align-items-center ${
//                     task.completed ? 'list-group-item-success' : ''
//                   }`}
//                 >
//                   <span
//                     style={{
//                       textDecoration: task.completed ? 'line-through' : 'none',
//                     }}
//                   >
//                     {task.name} (XP: {task.xp})
//                   </span>
//                   {!task.completed && (
//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={() => completeTask(index)}
//                     >
//                       Complete
//                     </button>
//                   )}
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteTask(index)}
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//           </ul>
//           {/* Display a message if no tasks exist for this skill */}
//           {tasks.filter((task) => task.skill === sk.name).length === 0 && (
//             <p className="text-muted">No tasks for this skill.</p>
//           )}
//         </div>
//       ))}
//     </main>
//   );
// }

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './skills.css';
import { SkillNotifier, SkillEvent } from '../skillNotifier'; // Import SkillEventNotifier

export function Skills() {
  // State for tasks and skills
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskXP, setTaskXP] = useState(10); // Default XP for a task
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]); // No default skills
  const [newSkill, setNewSkill] = useState('');

  // Function to handle adding a new task
  const addTask = () => {
    if (newTask.trim() !== '' && taskXP > 0 && skill !== '') {
      setTasks([...tasks, { name: newTask, xp: taskXP, completed: false, skill }]);
      setNewTask(''); // Clear the input field
      setTaskXP(10); // Reset XP to default
      setSkill(''); // Reset skill to default
    }
  };

  // Function to toggle task completion
  const completeTask = (index) => {
    const task = tasks[index];

    if (!task.completed) {
      // Add XP to the corresponding skill when task is completed
      setSkills(
        skills.map((sk) =>
          sk.name === task.skill
            ? {
                ...sk,
                points: sk.points + task.xp, // Add task XP
                level: Math.floor((sk.points + task.xp) / 50) + 1, // Level up every 50 XP
              }
            : sk
        )
      );
    }

    // Mark the task as completed
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: true } : t
      )
    );
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Function to add a new skill
  const addSkill = () => {
    if (
      newSkill.trim() !== '' &&
      !skills.some((sk) => sk.name.toLowerCase() === newSkill.toLowerCase())
    ) {
      setSkills([...skills, { name: newSkill, points: 0, level: 1 }]);
      setNewSkill(''); // Clear the input field
    }
  };

  // Function to delete a skill
  const deleteSkill = (skillName) => {
    // Remove the skill and associated tasks
    setSkills(skills.filter((sk) => sk.name !== skillName));
    setTasks(tasks.filter((task) => task.skill !== skillName));
  };

  // Calculate total skill points
  const totalPoints = skills.reduce((sum, sk) => sum + sk.points, 0);

  // Calculate total player level
  const playerLevel = Math.floor(totalPoints / 100) + 1;

  // Broadcast skill data to SkillEventNotifier
  useEffect(() => {
    skills.forEach(skill => {
      SkillEventNotifier.broadcastUpdate({
        name: skill.name,
        skills: { points: skill.points, level: skill.level }
      });
    });
  }, [skills]);

  return (
    <main className="container">
      <h2 id="rank-lvl">Skill Manager</h2>
      <p>Total Skill Points: {totalPoints}</p>
      <p>Player Level: {playerLevel}</p>

      {/* Input Section for Adding Tasks */}
      <div className="d-flex mb-3">
        {/* Dropdown for selecting a skill */}
        <select
          className="form-select me-2"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="" disabled>
            Select a skill
          </option>
          {skills.map((sk, index) => (
            <option key={index} value={sk.name}>
              {sk.name}
            </option>
          ))}
        </select>

        {/* Input for entering a task */}
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a new way to develop the skill"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        {/* Input for setting XP */}
        <input
          type="number"
          className="form-control me-2"
          placeholder="XP"
          value={taskXP}
          onChange={(e) => setTaskXP(Number(e.target.value))}
        />

        {/* Add Task Button */}
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Input Section for Adding a New Skill */}
      <div className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={addSkill}>
          Create New Skill
        </button>
      </div>

      {/* Skills and Tasks Section */}
      {skills.map((sk) => (
        <div key={sk.name} className="mb-4">
          <h4>
            {sk.name} - Level: {sk.level} (Points: {sk.points})
            <button
              className="btn btn-danger btn-sm ms-3"
              onClick={() => deleteSkill(sk.name)}
            >
              Delete Skill
            </button>
          </h4>
          <ul className="list-group">
            {tasks
              .filter((task) => task.skill === sk.name)
              .map((task, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    task.completed ? 'list-group-item-success' : ''
                  }`}
                >
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.name} (XP: {task.xp})
                  </span>
                  {!task.completed && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => completeTask(index)}
                    >
                      Complete
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          {/* Display a message if no tasks exist for this skill */}
          {tasks.filter((task) => task.skill === sk.name).length === 0 && (
            <p className="text-muted">No tasks for this skill.</p>
          )}
        </div>
      ))}
    </main>
  );
}





