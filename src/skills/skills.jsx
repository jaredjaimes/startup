import React, { useState, useEffect } from 'react';
import './skills.css';
import {TaskEvent, TaskNotifier} from './taskNotifier';

export function Skills(props) {
  const userName = props.userName;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  // Fetch tasks and score from the server on component mount
  useEffect(() => {
    fetch('/api/skills')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error('Unauthorized. Please log in.');
        } else {
          throw new Error('Failed to fetch tasks.');
        }
      })
      .then((data) => {
        setTasks(data.tasks || []);
        setScore(data.score || 0);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = { name: newTask, completed: false };

    fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to add task.');
        }
      })
      .then((data) => {
        setTasks(data.tasks || []);
        setNewTask('');
      })
      .catch((err) => setError(err.message));

    //Lets other users know someone has started a task
    TaskNotifier.broadcastEvent(userName, TaskEvent.Start, taskName);
  };

  // Complete a task and update the score
  const completeTask = (taskName) => {
    fetch(`/api/skills/${taskName}/complete`, {
      method: 'POST',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to complete task.');
        }
      })
      .then((data) => {
        setTasks(data.tasks || []);
        setScore(data.score); // Increment score by 10 for each completed task
      })
      .catch((err) => setError(err.message));

    //Lets other users know someone has completed a task
    TaskNotifier.broadcastEvent(userName, TaskEvent.End, taskName);
  };

  // Delete a task
  const deleteTask = (taskName) => {
    fetch(`/api/skills/${taskName}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to delete task.');
        }
      })
      .then((data) => {
        setTasks(data.tasks || []);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="skills-container">
      <h3>{userName}</h3>
      <h2>Your Tasks</h2>
      {error && <p className="error">{error}</p>}
      <p>Score: {score}</p>
      <ul>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.name}>
              {task.name}
              {!task.completed && (
                <button onClick={() => completeTask(task.name)}>Complete</button>
              )}
              <button onClick={() => deleteTask(task.name)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No tasks available.</li>
        )}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}