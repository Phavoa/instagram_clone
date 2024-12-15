import { useState } from "react";
import "./Posts.css";
import { FaTh, FaPlayCircle, FaUserTag } from "react-icons/fa";

import PostGrid from "../custom_ui/postGrid/PostGrid";
import PostModal from "../custom_ui/postModal/PostModal";
import { postsData } from "../../data/data";

const userData = {
  username: "tega_dev",
  name: "Efemiaya Favour",
  bio: "Full-Stack Developer 🚀 | React & Node.js Enthusiast 💻",
  profilePic: "https://via.placeholder.com/150",
  followers: 350,
  following: 180,
  posts: 12,
};

const ProfileHeader = ({ user, isFollowing, onFollowToggle }) => {
  return (
    <div className="profile-header">
      <img
        src={user.profilePic}
        alt={`${user.username}'s profile`}
        className="profile-image"
      />
      <div className="profile-details">
        <div className="profile-meta">
          <h2 className="profile-username">{user.username}</h2>
          <button
            className={`follow-btn ${isFollowing ? "following" : ""}`}
            onClick={onFollowToggle}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className="settings-btn">⚙️</button>
        </div>
        <div className="profile-stats">
          <div>
            <strong>{user.posts}</strong> posts
          </div>
          <div>
            <strong>{user.followers + (isFollowing ? 1 : 0)}</strong> followers
          </div>
          <div>
            <strong>{user.following}</strong> following
          </div>
        </div>
        <p className="profile-bio">{user.bio}</p>
      </div>
    </div>
  );
};

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("POSTS");

  const handleFollowToggle = () => setIsFollowing(!isFollowing);

  const renderTabContent = () => {
    const filteredPosts =
      activeTab === "REELS"
        ? postsData.filter((p) => p.type === "video")
        : postsData;

    if (activeTab === "TAGGED") {
      return <div>Tagged content goes here.</div>;
    }

    return <PostGrid posts={filteredPosts} onPostClick={setSelectedPost} />;
  };

  return (
    <div className="post-page">
      <ProfileHeader
        user={userData}
        isFollowing={isFollowing}
        onFollowToggle={handleFollowToggle}
      />
      <div className="post-navigation">
        {["POSTS", "REELS", "TAGGED"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "POSTS" && <FaTh />}
            {tab === "REELS" && <FaPlayCircle />}
            {tab === "TAGGED" && <FaUserTag />}
            {tab}
          </button>
        ))}
      </div>
      {renderTabContent()}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Posts;
