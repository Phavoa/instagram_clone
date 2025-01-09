import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types"; // For props validation
import "./Posts.css";
import { FaTh, FaPlayCircle, FaUserTag } from "react-icons/fa";

import PostGrid from "../custom_ui/postGrid/PostGrid";
import PostModal from "../custom_ui/postModal/PostModal";
import { fetchFromApi } from "../../utils/fetchFromApi";

const Posts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState("POSTS");

  // Memoized function to fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      const usernameOrId = user?.username || "mrbeast"; // Fallback to "mrbeast"
      const { data } = await fetchFromApi(`v1.2/posts?username_or_id_or_url=${usernameOrId}`);
      setPosts(data.items || []); // Safeguard if `data.items` is undefined
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [user]);

  // Fetch posts on component mount or when `user` changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filtered posts based on active tab
  const getFilteredPosts = () => {
    if (activeTab === "REELS") return posts.filter((p) => p.is_video === true);
    if (activeTab === "TAGGED") return []; // Placeholder for tagged posts (if needed later)
    return posts;
  };

  // Tab content rendering
  const renderTabContent = () => {
    if (activeTab === "TAGGED") {
      return <div>Tagged content goes here.</div>;
    }
    const filteredPosts = getFilteredPosts();
    return <PostGrid posts={filteredPosts} onPostClick={setSelectedPost} />;
  };

  // Loading state
  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-page">
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
            <span>{tab}</span>
          </button>
        ))}
      </div>
      {renderTabContent()}
      {selectedPost && (
        <PostModal
          posts={posts}
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

// Props validation
Posts.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default Posts;
