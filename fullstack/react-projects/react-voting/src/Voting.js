import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Voting() {

  const [votes, setVotes] = useState({
    Alice: 0,
    Bob: 0
  });

  const navigate = useNavigate();

  const vote = (name) => {
    setVotes({ ...votes, [name]: votes[name] + 1 });
  };

  const showWinner = () => {
    const winner =
      votes.Alice > votes.Bob ? "Alice" : "Bob";

    navigate("/winner", { state: { winner } });
  };

  return (
    <div>
      <h2>Voting Page</h2>

      <p>Alice Votes: {votes.Alice}</p>
      <button onClick={() => vote("Alice")}>Vote Alice</button>

      <p>Bob Votes: {votes.Bob}</p>
      <button onClick={() => vote("Bob")}>Vote Bob</button>

      <br /><br />

      <button onClick={showWinner}>
        Show Winner
      </button>

    </div>
  );
}

export default Voting;