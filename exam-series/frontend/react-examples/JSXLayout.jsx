export default function JSXLayout() {
  const subjects = ["JavaScript", "Node.js", "React", "MongoDB"];

  return (
    <section>
      <h1>Web Technology Overview</h1>
      <p>This module covers frontend and backend tools required for full-stack development.</p>
      <ul>
        {subjects.map((sub) => <li key={sub}>{sub}</li>)}
      </ul>
    </section>
  );
}
