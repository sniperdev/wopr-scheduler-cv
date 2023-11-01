import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter as Router, HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import { User } from "./interfaces/User";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [user, setUser] = useState<User>();
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        {user ? (
          <>
            <Route path="/app" element={<MainPage user={user} />} />
            <Route path="/adminpanel" element={<AdminPanel user={user} />} />
          </>
        ) : (
          <>
            <Route path="/app" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/adminpanel"
              element={<LoginPage setUser={setUser} />}
            />
          </>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
