import Posts from "./components/posts/Posts";
import Profile from "./components/profile/Profile";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import { useTheme } from "./context/useTheme";


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
  const [selectedResult, setSelectedResult] = useState({});
  const { theme } = useTheme();


  const handleSelectedResult = (result) => {
    setSelectedResult(result);
  };


  return (
    <div className={`app ${theme}`}>
      <ThemeToggler />
      <Navbar onResultSelected={handleSelectedResult}>
        <Profile user={selectedResult} />
        <Posts user={selectedResult} />
      </Navbar>
    </div>
  );
};

export default App;
