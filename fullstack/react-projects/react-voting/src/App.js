import { BrowserRouter, Routes, Route } from "react-router-dom";
import Voting from "./Voting";
import Winner from "./winner";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Voting />} />
        <Route path="/winner" element={<Winner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;