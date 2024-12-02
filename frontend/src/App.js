import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import AssignTask from "./components/AssignTask";

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Register User</Link> | <Link to="/assign-task">Assign Task</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/assign-task" element={<AssignTask />} />
      </Routes>
    </div>
  );
};

export default App;
