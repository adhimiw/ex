import React, { useState } from "react";

function App() {

  const [students, setStudents] = useState([
    "Adhithan",
    "Rahul",
    "Priya"
  ]);

  const [name, setName] = useState("");

  const addStudent = () => {
    if(name === "") return;

    setStudents([...students, name]);
    setName("");
  };

  const deleteStudent = (index) => {
    const newList = students.filter((_, i) => i !== index);
    setStudents(newList);
  };

  return (
    <div style={{textAlign:"center"}}>

      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student}
            <button onClick={() => deleteStudent(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;