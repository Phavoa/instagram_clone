import "./App.css";
import { useTheme } from "./context/useTheme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/ProfilePage";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme(); // Assuming useTheme is defined elsewhere

  return (
    <div className="theme-toggler">
      <div
        className={`toggle ${theme === "light" ? "light" : "dark"}`}
        onClick={toggleTheme}
      >
        <div className="toggle-circle" />
      </div>
    </div>
  );
};

const App = () => {
  const { theme } = useTheme();


  return (
    <div className={`app ${theme}`}>
      <ThemeToggler />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:username_or_id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
