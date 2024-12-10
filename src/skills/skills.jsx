import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './skills.css';

export function Skills() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch tasks and score from the server
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setScore(data.score);
      })
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = { name: newTask, completed: false };
      fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks(data.tasks);
          setScore(data.score);
          setNewTask('');
        })
        .catch((err) => console.error('Error adding task:', err));
    }
  };

  const completeTask = (index) => {
    fetch(`/api/skills/${index}/complete`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
        setScore(data.score);
      })
      .catch((err) => console.error('Error completing task:', err));
  };

  return (
    <div className="skills-container">
      <h2>Skills</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}
            {!task.completed && (
              <button onClick={() => completeTask(index)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
      <div>Score: {score}</div>
    </div>
  );
}

//Part one simplified react
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './skills.css';

// export function Skills() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [score, setScore] = useState(0);

//   const addTask = () => {
//     if (newTask.trim() !== '') {
//       setTasks([...tasks, { name: newTask, completed: false }]);
//       setNewTask('');
//     }
//   };

//   const completeTask = (index) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, completed: true } : task
//     );
//     setTasks(updatedTasks);
//     setScore(score + 10); // Add 10 points for completing a task
//   };

//   const deleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   return (
//     <main className="container">
//       <h2>Task Manager</h2>
//       <p>Total Score: {score}</p>
//       <div className="d-flex mb-3">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Enter a new task"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={addTask}>
//           Add Task
//         </button>
//       </div>
//       <ul className="list-group">
//         {tasks.map((task, index) => (
//           <li
//             key={index}
//             className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
//           >
//             <span>{task.name}</span>
//             {!task.completed && (
//               <button
//                 className="btn btn-success btn-sm ms-2"
//                 onClick={() => completeTask(index)}
//               >
//                 Complete
//               </button>
//             )}
//             <button
//               className="btn btn-danger btn-sm ms-2"
//               onClick={() => deleteTask(index)}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }


// Below is the skills code before I simplified it.------------------
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

//   useEffect(() => {
//     // Fetch skills from the server
//     fetch('/api/skills')
//       .then((res) => res.json())
//       .then((data) => setSkills(data))
//       .catch((err) => console.error('Error fetching skills:', err));
//   }, []);


//   const addTask = () => {
//     if (newTask.trim() !== '' && taskXP > 0 && skill !== '') {
//       setTasks([...tasks, { name: newTask, xp: taskXP, completed: false, skill }]);
//       setNewTask('');
//       setTaskXP(10);
//       setSkill('');
//     }
//   };

//   const completeTask = (index) => {
//     const task = tasks[index];
//     if (!task.completed) {
//       const updatedSkills = skills.map((sk) =>
//         sk.name === task.skill
//           ? { ...sk, points: sk.points + task.xp, level: Math.floor((sk.points + task.xp) / 50) + 1 }
//           : sk
//       );

//       setSkills(updatedSkills);

//       fetch('/api/skills', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedSkills.find((sk) => sk.name === task.skill)),
//       }).catch((err) => console.error('Error saving skill:', err));
//     }

//     setTasks(tasks.map((t, i) => (i === index ? { ...t, completed: true } : t)));
//   };

//   const deleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   const addSkill = () => {
//     if (newSkill.trim() !== '' && !skills.some((sk) => sk.name.toLowerCase() === newSkill.toLowerCase())) {
//       const newSkillObj = { name: newSkill, points: 0, level: 1 };

//       setSkills([...skills, newSkillObj]);
//       fetch('/api/skills', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newSkillObj),
//       }).catch((err) => console.error('Error adding skill:', err));

//       setNewSkill('');
//     }
//   };

//   const deleteSkill = (skillName) => {
//     setSkills(skills.filter((sk) => sk.name !== skillName));
//     setTasks(tasks.filter((task) => task.skill !== skillName));
//   };

//   const totalPoints = skills.reduce((sum, sk) => sum + sk.points, 0);
//   const playerLevel = Math.floor(totalPoints / 100) + 1;

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
//           <option value="" disabled>
//             Select a skill
//           </option>
//           {skills.map((sk, index) => (
//             <option key={index} value={sk.name}>
//               {sk.name}
//             </option>
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
//         <button className="btn btn-primary" onClick={addTask}>
//           Add Task
//         </button>
//       </div>
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
//       {skills.map((sk) => (
//         <div key={sk.name} className="mb-4">
//           <h4>
//             {sk.name} - Level: {sk.level} (Points: {sk.points})
//           </h4>
//           <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteSkill(sk.name)}>
//             Delete Skill
//           </button>
//           <ul className="list-group">
//             {tasks
//               .filter((task) => task.skill === sk.name)
//               .map((task, index) => (
//                 <li
//                   key={index}
//                   className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
//                 >
//                   <span>
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

//   // useEffect(() => {
//   //   // Fetch skills from the server
//   //   fetch('/api/skills')
//   //     .then((res) => res.json())
//   //     .then((data) => setSkills(data))
//   //     .catch((err) => console.error('Error fetching skills:', err));
//   // }, []);
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch('/api/skills', {
//       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (res.status === 401) {
//           window.location.href = '/login';
//           throw new Error('Unauthorized');
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) setSkills(data);
//         else console.error('Invalid skills format:', data);
//       })
//       .catch((err) => console.error('Error fetching skills:', err));
//   }, []);

//   const addTask = () => {
//     if (newTask.trim() && taskXP > 0 && skill) {
//       setTasks([...tasks, { name: newTask, xp: taskXP, completed: false, skill }]);
//       setNewTask('');
//       setTaskXP(10);
//       setSkill('');
//     }
//   };

//   const completeTask = (index) => {
//     const task = tasks[index];
//     if (!task.completed) {
//       const updatedSkills = skills.map((sk) =>
//         sk.name === task.skill
//           ? { ...sk, points: sk.points + task.xp, level: Math.floor((sk.points + task.xp) / 50) + 1 }
//           : sk
//       );

//       setSkills(updatedSkills);

//       fetch('/api/skills', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedSkills.find((sk) => sk.name === task.skill)),
//       }).catch((err) => console.error('Error saving skill:', err));
//     }

//     setTasks(tasks.map((t, i) => (i === index ? { ...t, completed: true } : t)));
//   };

//   const deleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   const addSkill = () => {
//     if (newSkill.trim() !== '' && !skills.some((sk) => sk.name.toLowerCase() === newSkill.toLowerCase())) {
//       const newSkillObj = { name: newSkill, points: 0, level: 1 };

//       setSkills([...skills, newSkillObj]);
//       fetch('/api/skills', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newSkillObj),
//       }).catch((err) => console.error('Error adding skill:', err));

//       setNewSkill('');
//     }
//   };

//   const deleteSkill = (skillName) => {
//     setSkills(skills.filter((sk) => sk.name !== skillName));
//     setTasks(tasks.filter((task) => task.skill !== skillName));
//   };

//   const totalPoints = Array.isArray(skills)
//     ? skills.reduce((sum, sk) => sum + sk.points, 0)
//     : 0;
//   const playerLevel = Math.floor(totalPoints / 100) + 1;

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
//           <option value="" disabled>
//             Select a skill
//           </option>
//           {skills.map((sk, index) => (
//             <option key={index} value={sk.name}>
//               {sk.name}
//             </option>
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
//         <button className="btn btn-primary" onClick={addTask}>
//           Add Task
//         </button>
//       </div>
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
//       {skills.map((sk) => (
//         <div key={sk.name} className="mb-4">
//           <h4>
//             {sk.name} - Level: {sk.level} (Points: {sk.points})
//           </h4>
//           <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteSkill(sk.name)}>
//             Delete Skill
//           </button>
//           <ul className="list-group">
//             {tasks
//               .filter((task) => task.skill === sk.name)
//               .map((task, index) => (
//                 <li
//                   key={index}
//                   className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
//                 >
//                   <span>
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
//         </div>
//       ))}
//     </main>
//   );
// }

//--------------------------------------------------------------
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
