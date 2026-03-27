import { useState } from "react";

export default function VotingApp() {
  const [votes, setVotes] = useState({ JavaScript: 0, Python: 0, Java: 0 });

  const vote = (lang) => {
    setVotes((prev) => ({ ...prev, [lang]: prev[lang] + 1 }));
  };

  return (
    <div>
      <h2>Best Programming Language Poll</h2>
      {Object.entries(votes).map(([lang, count]) => (
        <div key={lang}>
          <button onClick={() => vote(lang)}>Vote {lang}</button>
          <span> Votes: {count}</span>
        </div>
      ))}
    </div>
  );
}
