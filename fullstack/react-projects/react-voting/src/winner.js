import { useLocation } from "react-router-dom";

function Winner() {

  const location = useLocation();
  const winner = location.state?.winner;

  return (
    <div>
      <h2>Winner Page</h2>
      <h1>{winner} Wins!</h1>
    </div>
  );
}

export default Winner;