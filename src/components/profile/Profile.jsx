import "./Profile.css";
import PropTypes from "prop-types"; // Import prop-types library
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaEllipsis } from "react-icons/fa6";
import HighLight from "../highLight/HighLight";
import { useEffect, useState } from "react";
import { fetchFromApi } from "../../utils/fetchFromApi";
import { MdVerified } from "react-icons/md";
import { useParams } from "react-router-dom";

// Bio component to display user's full name and bio description
const Bio = ({ fullName, bio }) => (
  <div className="bio">
    <strong>{fullName || "Unknown User"}</strong>
    <p>{bio?.description || "No bio available."}</p>
    {bio?.link && (
      <a href={`https://${bio.link}`} target="_blank" rel="noopener noreferrer">
        {bio.link}
      </a>
    )}
  </div>
);

Bio.propTypes = {
  fullName: PropTypes.string,
  bio: PropTypes.shape({
    description: PropTypes.string,
    link: PropTypes.string,
  }),
};

// Stats component to display user's posts, followers, and following counts
const Stats = ({ posts, followers, following, formatNumber }) => (
  <div className="stats">
    <div>
      <span className="bold">{formatNumber(posts || 0)}</span> posts
    </div>
    <div>
      <span className="bold">{formatNumber(followers || 0)}</span> followers
    </div>
    <div>
      <span className="bold">{formatNumber(following || 0)}</span> following
    </div>
  </div>
);

Stats.propTypes = {
  posts: PropTypes.number,
  followers: PropTypes.number,
  following: PropTypes.number,
  formatNumber: PropTypes.func.isRequired,
};

// FollowedBy component to display a list of users who follow this profile
const FollowedBy = ({ followedBy }) => (
  <div className="followed-by">
    <p>
      Followed by{" "}
      {followedBy && followedBy.length > 0 ? (
        followedBy.map((name, index) => (
          <strong key={index}>
            {name}
            {index < followedBy.length - 1 ? ", " : ""}
          </strong>
        ))
      ) : (
        <span>No followers yet.</span>
      )}
    </p>
  </div>
);

FollowedBy.propTypes = {
  followedBy: PropTypes.arrayOf(PropTypes.string),
};

// Main Profile component to display the user's profile
const Profile = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);

  const{ username_or_id} = useParams();
  console.log(username_or_id)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const usernameOrId = user?.id || username_or_id;
        const { data } = await fetchFromApi(
          `v1/info?username_or_id_or_url=${usernameOrId}`
        );

        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  const profileData = {
    username: userInfo?.username || "mrbeast",
    fullName: userInfo?.full_name || "MrBeast",
    posts: userInfo?.media_count || 0,
    followers: userInfo?.follower_count || 0,
    following: userInfo?.following_count || 0,
    bio: {
      description: userInfo?.biography || "No bio available.",
      link: userInfo?.bio_links?.[0]?.url || null,
    },
    followedBy: userInfo?.followed_by || ["Jane", "John", "others"],
  };

  const formatNumber = (number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (number >= 1e6) {
      return (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (number >= 1e3) {
      return (number / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return number;
  };

  return (
    <div className="profile-container">
      <div className="profile-header-lg">
        <div className="img-container">
          <img
            src={
              userInfo?.hd_profile_pic_url_info?.url ||
              "default-profile-pic.png"
            }
            alt={`${profileData.username}'s profile`}
            loading="lazy"
          />
          {userInfo?.is_verified && (
            <MdVerified style={{ color: "#64BFFA", fontSize: "1.5rem" }} />
          )}
        </div>
        <div className="profile-details">
          <div className="top-row">
            <h2 className="username">{profileData.username}</h2>
            <button className="button">Message</button>
            <button className="button">
              <IoPersonAddSharp />
            </button>
            <button className="button">
              <IoIosArrowDown />
            </button>
            <FaEllipsis style={{ cursor: "pointer" }} />
          </div>

          <Bio fullName={profileData.fullName} bio={profileData.bio} />
          <FollowedBy followedBy={profileData.followedBy} />
        </div>
      </div>

      <div className="highlights-container-lg">
        <HighLight userHighlight={user?.id || username_or_id} />
      </div>

      <div className="profile-header-sm-md">
        <div className="profile-header">
          <div className="img-container">
            <img
              src={
                userInfo?.hd_profile_pic_url_info?.url ||
                "default-profile-pic.png"
              }
              alt={`${profileData.username}'s profile`}
              loading="lazy"
            />
            {userInfo?.is_verified && (
              <MdVerified style={{ color: "#64BFFA", fontSize: "1.5rem" }} />
            )}

            <div className="top-row">
              <div className="username-container">
                <h2 className="username">{profileData.username}</h2>
                <FaEllipsis style={{ cursor: "pointer" }} />
              </div>

              <div className="buttons">
                <button className="button">Message</button>
                <button className="button">
                  <IoPersonAddSharp />
                </button>
                <button className="button">
                  <IoIosArrowDown />
                </button>
              </div>
            </div>
          </div>
          <div className="profile-details">
            <Bio fullName={profileData.fullName} bio={profileData.bio} />
            <FollowedBy followedBy={profileData.followedBy} />

            <div className="highlights-container-sm-md">
              <HighLight userHighlight={user?.id || username_or_id} />
            </div>

            <Stats
              posts={profileData.posts}
              followers={profileData.followers}
              following={profileData.following}
              formatNumber={formatNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Profile;
