// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './skills.css';

// export function Skills() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [taskXP, setTaskXP] = useState(10);
//   const [skill, setSkill] = useState('');
//   const [skills, setSkills] = useState(() => {
//     // Load skills from localStorage on initial render
//     const savedSkills = localStorage.getItem('skills');
//     return savedSkills ? JSON.parse(savedSkills) : [];
//   });
//   const [newSkill, setNewSkill] = useState('');

//   // Fetch the username from localStorage
//   const username = localStorage.getItem('userName') || 'Unknown Player';

//   // Save the skills state to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('skills', JSON.stringify(skills));
//   }, [skills]);

//   // Function to handle adding a new task
//   const addTask = () => {
//     if (newTask.trim() !== '' && taskXP > 0 && skill !== '') {
//       setTasks([...tasks, { name: newTask, xp: taskXP, completed: false, skill }]);
//       setNewTask('');
//       setTaskXP(10);
//       setSkill('');
//     }
//   };

//   // Function to toggle task completion
//   const completeTask = (index) => {
//     const task = tasks[index];
//     if (!task.completed) {
//       setSkills(
//         skills.map((sk) =>
//           sk.name === task.skill
//             ? {
//                 ...sk,
//                 points: sk.points + task.xp,
//                 level: Math.floor((sk.points + task.xp) / 50) + 1,
//               }
//             : sk
//         )
//       );
//     }
//     setTasks(
//       tasks.map((t, i) =>
//         i === index ? { ...t, completed: true } : t
//       )
//     );
//   };

//   const deleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   const addSkill = () => {
//     if (
//       newSkill.trim() !== '' &&
//       !skills.some((sk) => sk.name.toLowerCase() === newSkill.toLowerCase())
//     ) {
//       setSkills([...skills, { name: newSkill, points: 0, level: 1 }]);
//       setNewSkill('');
//     }
//   };

//   const deleteSkill = (skillName) => {
//     setSkills(skills.filter((sk) => sk.name !== skillName));
//     setTasks(tasks.filter((task) => task.skill !== skillName));
//   };

//   // Calculate total skill points and level
//   const totalPoints = skills.reduce((sum, sk) => sum + sk.points, 0);
//   const playerLevel = Math.floor(totalPoints / 100) + 1;

//   // Save the current player's ranking data to localStorage
//   useEffect(() => {
//     const playerData = {
//       name: username,
//       score: totalPoints,
//       level: playerLevel,
//     };
//     localStorage.setItem('playerData', JSON.stringify(playerData));
//   }, [totalPoints, playerLevel]);

//   return (
//     <main className="container">
//       <h2 id="rank-lvl">Skill Manager</h2>
//       <p>Total Skill Points: {totalPoints}</p>
//       <p>Player Level: {playerLevel}</p>
//       <div className="d-flex mb-3">
//         <select
//           className="form-select me-2"
//           value={skill}
//           onChange={(e) => setSkill(e.target.value)}
//         >
//           <option value="" disabled>Select a skill</option>
//           {skills.map((sk, index) => (
//             <option key={index} value={sk.name}>{sk.name}</option>
//           ))}
//         </select>
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new way to develop the skill"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <input
//           type="number"
//           className="form-control me-2"
//           placeholder="XP"
//           value={taskXP}
//           onChange={(e) => setTaskXP(Number(e.target.value))}
//         />
//         <button className="btn btn-primary" onClick={addTask}>Add Task</button>
//       </div>
//       <div className="d-flex mb-4">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new skill"
//           value={newSkill}
//           onChange={(e) => setNewSkill(e.target.value)}
//         />
//         <button className="btn btn-secondary" onClick={addSkill}>Create New Skill</button>
//       </div>
//       {skills.map((sk) => (
//         <div key={sk.name} className="mb-4">
//           <h4>{sk.name} - Level: {sk.level} (Points: {sk.points})</h4>
//           <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteSkill(sk.name)}>Delete Skill</button>
//           <ul className="list-group">
//             {tasks.filter((task) => task.skill === sk.name).map((task, index) => (
//               <li key={index} className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}>
//                 <span>{task.name} (XP: {task.xp})</span>
//                 {!task.completed && <button className="btn btn-success btn-sm" onClick={() => completeTask(index)}>Complete</button>}
//                 <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </main>
//   );
// }

//-------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './skills.css';

// export function Skills() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [taskXP, setTaskXP] = useState(10);
//   const [skill, setSkill] = useState('');
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState('');

//   // Fetch the username from localStorage
//   const username = localStorage.getItem('userName') || 'Unknown Player';

//   // Fetch skills and tasks from the backend
//   useEffect(() => {
//     const fetchSkillsAndTasks = async () => {
//       try {
//         const response = await fetch(`/api/skills/${username}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSkills(data.skills || []);
//           setTasks(data.tasks || []);
//         }
//       } catch (error) {
//         console.error('Error fetching skills and tasks:', error);
//       }
//     };

//     fetchSkillsAndTasks();
//   }, [username]);

//   // Update skills and tasks in the backend whenever they change
//   useEffect(() => {
//     const updateBackend = async () => {
//       try {
//         await fetch(`/api/skills/${username}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ skills, tasks }),
//         });
//       } catch (error) {
//         console.error('Error updating backend:', error);
//       }
//     };

//     updateBackend();
//   }, [skills, tasks, username]);

//   // Save the current player's ranking data to the backend
//   useEffect(() => {
//     const totalPoints = skills.reduce((sum, sk) => sum + sk.points, 0);
//     const playerLevel = Math.floor(totalPoints / 100) + 1;

//     const playerData = {
//       name: username,
//       score: totalPoints,
//       level: playerLevel,
//     };

//     const updateRankings = async () => {
//       try {
//         await fetch('/api/rankings', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(playerData),
//         });
//       } catch (error) {
//         console.error('Error updating rankings:', error);
//       }
//     };

//     updateRankings();
//   }, [skills, username]);

//   // Add Task
//   const addTask = () => {
//     if (newTask.trim() !== '' && taskXP > 0 && skill !== '') {
//       setTasks([...tasks, { name: newTask, xp: taskXP, completed: false, skill }]);
//       setNewTask('');
//       setTaskXP(10);
//       setSkill('');
//     }
//   };

//   // Add Skill
//   const addSkill = () => {
//     if (newSkill.trim() !== '' && !skills.some((sk) => sk.name.toLowerCase() === newSkill.toLowerCase())) {
//       setSkills([...skills, { name: newSkill, points: 0, level: 1 }]);
//       setNewSkill('');
//     }
//   };


// return (
//     <main className="container">
//       <h2 id="rank-lvl">Skill Manager</h2>
//       <p>Total Skill Points: {totalPoints}</p>
//       <p>Player Level: {playerLevel}</p>
//       <div className="d-flex mb-3">
//         <select
//           className="form-select me-2"
//           value={skill}
//           onChange={(e) => setSkill(e.target.value)}
//         >
//           <option value="" disabled>Select a skill</option>
//           {skills.map((sk, index) => (
//             <option key={index} value={sk.name}>{sk.name}</option>
//           ))}
//         </select>
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new way to develop the skill"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <input
//           type="number"
//           className="form-control me-2"
//           placeholder="XP"
//           value={taskXP}
//           onChange={(e) => setTaskXP(Number(e.target.value))}
//         />
//         <button className="btn btn-primary" onClick={addTask}>Add Task</button>
//       </div>
//       <div className="d-flex mb-4">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new skill"
//           value={newSkill}
//           onChange={(e) => setNewSkill(e.target.value)}
//         />
//         <button className="btn btn-secondary" onClick={addSkill}>Create New Skill</button>
//       </div>
//       {skills.map((sk) => (
//         <div key={sk.name} className="mb-4">
//           <h4>{sk.name} - Level: {sk.level} (Points: {sk.points})</h4>
//           <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteSkill(sk.name)}>Delete Skill</button>
//           <ul className="list-group">
//             {tasks.filter((task) => task.skill === sk.name).map((task, index) => (
//               <li key={index} className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}>
//                 <span>{task.name} (XP: {task.xp})</span>
//                 {!task.completed && <button className="btn btn-success btn-sm" onClick={() => completeTask(index)}>Complete</button>}
//                 <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </main>
//   );
// }

//-------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './skills.css';

export function Skills() {
  const [tasks, setTasks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskXP, setTaskXP] = useState(10);
  const [skill, setSkill] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(1);

  // Fetch tasks and skills
  useEffect(() => {
    async function fetchData() {
      try {
        const [skillsResponse, tasksResponse] = await Promise.all([
          fetch('/api/skills').then((res) => res.json()),
          fetch('/api/tasks').then((res) => res.json()),
        ]);
        setSkills(skillsResponse);
        setTasks(tasksResponse);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const points = skills.reduce((sum, sk) => sum + sk.points, 0);
    setTotalPoints(points);
    setPlayerLevel(Math.floor(points / 100) + 1);
  }, [skills]);

  const addSkill = async () => {
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSkill }),
      });

      if (response.ok) {
        const skill = await response.json();
        setSkills([...skills, skill]);
        setNewSkill('');
      }
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTask, xp: taskXP, completed: false, skillId: skill }),
      });

      if (response.ok) {
        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask('');
        setTaskXP(10);
        setSkill('');
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <main className="container">
      <h2 id="rank-lvl">Skill Manager</h2>
      <p>Total Skill Points: {totalPoints}</p>
      <p>Player Level: {playerLevel}</p>
      <div className="d-flex mb-3">
        <select
          className="form-select me-2"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="" disabled>Select a skill</option>
          {skills.map((sk, index) => (
            <option key={index} value={sk.name}>{sk.name}</option>
          ))}
        </select>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a new way to develop the skill"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="number"
          className="form-control me-2"
          placeholder="XP"
          value={taskXP}
          onChange={(e) => setTaskXP(Number(e.target.value))}
        />
        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
      </div>
      <div className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={addSkill}>Create New Skill</button>
      </div>
      {skills.map((sk) => (
        <div key={sk.name} className="mb-4">
          <h4>{sk.name} - Level: {sk.level} (Points: {sk.points})</h4>
          <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteSkill(sk.name)}>Delete Skill</button>
          <ul className="list-group">
            {tasks.filter((task) => task.skill === sk.name).map((task, index) => (
              <li key={index} className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}>
                <span>{task.name} (XP: {task.xp})</span>
                {!task.completed && <button className="btn btn-success btn-sm" onClick={() => completeTask(index)}>Complete</button>}
                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
