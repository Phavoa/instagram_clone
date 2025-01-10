import "./NavBar.css";
// import "./Search.css";

import Home from "../../../assets/images/icons/home.svg";
import Chat from "../../../assets/images/icons/Vector.svg";
import FindPeople from "../../../assets/images/icons/FindPeople.svg";
import NewPost from "../../../assets/images/icons/NewPosts.svg";
import Heart from "../../../assets/images/icons/heart.svg";
import InstagramIcon from "../../../assets/images/icons/Logo.svg";

import HomeDM from "../../../assets/images/icons/homeDM.svg";
import ChatDM from "../../../assets/images/icons/messageDM.svg";
import FindPeopleDM from "../../../assets/images/icons/locateDM.svg";
import NewPostDM from "../../../assets/images/icons/addDm.svg";
import HeartDM from "../../../assets/images/icons/heartDM.svg";
import InstagramIconDM from "../../../assets/images/icons/iconDarkmode.svg";

// import a from "../../../assets/images/icons"

import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";
import { useTheme } from "../../../context/useTheme";


const icons = [Home, Chat, NewPost, FindPeople, Heart];

const iconsDM = [HomeDM, ChatDM, NewPostDM, FindPeopleDM, HeartDM];


const IconButton = ({ src, alt }) => (
  <img src={src} alt={alt} className="nav-icon" />
);

IconButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};


const Navbar = ({ children }) => {
  const { theme } = useTheme(); 
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="navbar">
      {/* Desktop Navbar */}
      <nav className="navbar-container">
        <div className="logo">
                  {theme === "light" ? (
                    <img src={InstagramIcon} alt="Instagram Logo" />
                  ) : (
                    <img src={InstagramIconDM} alt="Instagram Logo" />
                  )}
                </div>

        <form className="search" onSubmit={(e) => handleSubmit(e)}>
          <button type="submit">
            <CiSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="nav-buttons">
          {theme === "light"
            ? icons.map((icon, index) => (
                <IconButton key={index} src={icon} alt={`icon-${index}`} />
              ))
            : iconsDM.map((icon, index) => (
                <IconButton key={index} src={icon} alt={`icon-${index}`} />
              ))}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar-sm-mb">
        <button>
          <IoIosArrowBack />
        </button>
        <p>Username</p>
      </nav>

      {children}

      {/* Mobile Footer Navbar */}
      <div className="navbar-footer-sm">
      <div className="nav-buttons">
          {theme === "light"
            ? icons.map((icon, index) => (
                <IconButton key={index} src={icon} alt={`icon-${index}`} />
              ))
            : iconsDM.map((icon, index) => (
                <IconButton key={index} src={icon} alt={`icon-${index}`} />
              ))}
        </div>
      </div>
     
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
  onResultSelected: PropTypes.func,
};
export default Navbar;