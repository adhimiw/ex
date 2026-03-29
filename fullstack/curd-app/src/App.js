import React, { useState } from "react";

function App() {

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE
  const addItem = (e) => {
    e.preventDefault();

    if (!name) return;

    const newItem = {
      id: Date.now(),
      name: name
    };

    setItems([...items, newItem]);
    setName("");
  };

  // DELETE
  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  // START EDIT
  const startEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
  };

  // UPDATE
  const updateItem = (e) => {
    e.preventDefault();

    const updatedItems = items.map(item =>
      item.id === editId ? { ...item, name: name } : item
    );

    setItems(updatedItems);
    setEditId(null);
    setName("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>React CRUD</h1>

      <form onSubmit={editId ? updateItem : addItem}>

        <input
          type="text"
          placeholder="Enter item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}

            <button onClick={() => startEdit(item)}>
              Edit
            </button>

            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;