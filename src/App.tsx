import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setName={setName} />} />
        <Route path="/app" element={<MainPage name={name} />} />
      </Routes>
    </Router>
  );
}

export default App;
