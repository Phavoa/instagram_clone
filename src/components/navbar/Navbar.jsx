import "./NavBar.css";
import "./Search.css";

import Home from "../../assets/images/icons/home.svg";
import Chat from "../../assets/images/icons/Vector.svg";
import FindPeople from "../../assets/images/icons/FindPeople.svg";
import NewPost from "../../assets/images/icons/NewPosts.svg";
import Heart from "../../assets/images/icons/heart.svg";
import InstagramIcon from "../../assets/images/icons/Logo.svg";

import HomeDM from "../../assets/images/icons/homeDM.svg";
import ChatDM from "../../assets/images/icons/messageDM.svg";
import FindPeopleDM from "../../assets/images/icons/locateDM.svg";
import NewPostDM from "../../assets/images/icons/addDm.svg";
import HeartDM from "../../assets/images/icons/heartDM.svg";
import InstagramIconDM from "../../assets/images/icons/iconDarkmode.svg";

import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce"; // Debounce to optimize API calls
import { X } from "lucide-react";

import { useTheme } from "../../context/useTheme";

const icons = [Home, Chat, NewPost, FindPeople, Heart];
const iconsDM = [HomeDM, ChatDM, NewPostDM, FindPeopleDM, HeartDM];

// Reusable IconButton component for rendering icons
const IconButton = ({ src, alt }) => (
  <img src={src} alt={alt} className="nav-icon" />
);

IconButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

// Search Results Component
const SearchResults = ({ searchResults, status, onResultSelected }) => {
  if (status.loading) {
    return <p className="loading">Loading...</p>;
  }

  if (status.error) {
    return (
      <p className="error">Failed to load users. Please try again later.</p>
    );
  }

  if (searchResults?.data?.items?.length === 0) {
    return <p className="no-results">No users found.</p>;
  }

  return (
    <div className="results-container">
      {searchResults?.data?.items?.map((user, index) => (
        <div
          key={index}
          className="search-result"
          onClick={() => {
            onResultSelected(user);
          }}
        >
          <div className="profile-pic-container">
            <img
              src={user.profile_pic_url}
              alt={`${user.full_name}'s profile`}
              className="profile-pic"
            />
          </div>
          <p className="user-name">{user.full_name}</p>
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          profile_pic_url: PropTypes.string.isRequired,
          full_name: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
  status: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  onResultSelected: PropTypes.func.isRequired,
};

const Navbar = ({ children, onResultSelected }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [status, setStatus] = useState({ loading: false, error: false });
  const [removedSearch, setRemovedSearch] = useState(false);
  const { theme } = useTheme(); // Assuming useTheme is defined elsewhere

  console.log(searchResults)

  // Debounced API call to reduce the number of API requests
  const fetchUsersByUserName = debounce(async (searchInput) => {
    const options = {
      method: "GET",
      url: "https://instagram-scraper-api2.p.rapidapi.com/v1/search_users",
      params: {
        search_query: searchInput,
        url_embed_safe: "true",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
      },
    };

    try {
      setStatus({ loading: true, error: false });
      const response = await axios.request(options);
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setStatus({ loading: false, error: true });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, 500);

  useEffect(() => {
    if (search.trim()) {
      fetchUsersByUserName(search);
    } else {
      setSearchResults({});
    }
    return () => fetchUsersByUserName.cancel();
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRemovedSearch(false); // Show search results when search is not empty
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <p>user</p>
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

      {/* Search Results */}
      {search && (
        <div
          className={`search-results ${
            removedSearch ? "remove-search-from-display" : ""
          }`}
        >
          <X onClick={() => setRemovedSearch(true)} className="cancel-search" />
          <h1>Search</h1>
          <SearchResults
            searchResults={searchResults}
            status={status}
            onResultSelected={onResultSelected}
          />
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
  onResultSelected: PropTypes.func.isRequired,
};
export default Navbar;
