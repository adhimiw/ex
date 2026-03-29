function StudentList({ students }) {
  return (
    <div>
      <h2>Student List</h2>

      <ul>
        {students.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>

    </div>
  );
}

export default StudentList;