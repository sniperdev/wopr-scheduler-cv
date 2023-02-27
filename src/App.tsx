import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/app" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
