import React from "react";

function StudentDetails() {

  const name = "Adhithan";
  const rollNo = "23CS101";
  const department = "Computer Science";

  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {name}</p>
      <p>Roll Number: {rollNo}</p>
      <p>Department: {department}</p>
    </div>
  );
}

function App(){
  return <StudentDetails />;
}

export default App;