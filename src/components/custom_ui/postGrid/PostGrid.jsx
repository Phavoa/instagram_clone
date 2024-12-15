import { FaPlayCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const PostGrid = ({ posts, onPostClick }) => (
  <div className="post-grid">
    {posts.map((post) => (
      <div
        key={post.id}
        className="post-item"
        onClick={() => onPostClick(post)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onPostClick(post)}
      >
        {post.type === "image" ? (
          <img
            src={post.content || "placeholder-image-url.jpg"}
            alt={post.caption || "Image post"}
            className="post-content"
          />
        ) : (
          <div className="video-thumbnail">
            <video
              src={post.content || ""}
              muted
              loop
              className="post-content"
              aria-label={post.caption || "Video post"}
            ></video>
            <div className="video-overlay">
              <FaPlayCircle />
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]).isRequired,
      content: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ).isRequired,
  onPostClick: PropTypes.func.isRequired,
};

export default PostGrid;
