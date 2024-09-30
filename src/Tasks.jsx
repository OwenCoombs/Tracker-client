import React, { useState, useEffect } from "react";
import "./App.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [editIndex, setEditIndex] = useState(null); // To track which task is being edited

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrEditTask = () => {
    if (taskName && difficulty) {
      const xp = difficulty === "Easy" ? 5 : difficulty === "Medium" ? 10 : 15;
      const newTask = { name: taskName, xp, completed: false };

      if (editIndex !== null) {
        // Editing an existing task
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditIndex(null); // Reset edit index
      } else {
        // Adding a new task
        setTasks([...tasks, newTask]);
      }
      setTaskName("");
      setDifficulty("");
    }
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) =>
        idx === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setDifficulty(taskToEdit.xp === 5 ? "Easy" : taskToEdit.xp === 10 ? "Medium" : "Hard");
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-page">
      <h1>Daily Habits Tracker</h1>
      <p>Track your tasks and earn XP!</p>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="task"
            onClick={() => toggleTaskCompletion(index)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            <span>{task.name}</span>
            <span>Earn {task.xp} XP</span>
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="add-task">
        <h2>{editIndex !== null ? "Edit Task" : "Create New Task"}</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy (5 XP)</option>
          <option value="Medium">Medium (10 XP)</option>
          <option value="Hard">Hard (15 XP)</option>
        </select>
        <button onClick={handleAddOrEditTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
}

export default Tasks;



