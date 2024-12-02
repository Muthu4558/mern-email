import React, { useState, useEffect } from "react";
import { fetchUsers, assignTask } from "../api";

const AssignTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    getUsers();
  }, []);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await assignTask({ taskTitle, taskDate, userId: selectedUser });
      setMessage(response.data.message);
      setTaskTitle("");
      setTaskDate("");
      setSelectedUser("");
    } catch (error) {
      setMessage("Error assigning task");
    }
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          required
        />
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Assign Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignTask;
