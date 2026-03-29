import { useState } from "react";

function AddStudent({ addStudent }) {

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Add</button>

    </form>
  );
}

export default AddStudent;