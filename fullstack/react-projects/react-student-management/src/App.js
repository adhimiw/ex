import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";

function App() {
  const [students, setStudents] = useState(["Adhithan", "Rahul", "Priya"]);

  const addStudent = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setStudents((currentStudents) => [...currentStudents, trimmedName]);
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/add">Add Student</Link> | 
        <Link to="/students">Student List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent addStudent={addStudent} />} />
        <Route path="/students" element={<StudentList students={students} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;