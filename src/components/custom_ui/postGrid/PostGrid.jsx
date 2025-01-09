import { FaPlayCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const PostGrid = ({ posts, onPostClick }) => {
    // console.log(posts);

  return (
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
          {!post.is_video ? (
            <img
              src={post.thumbnail_url || "placeholder-image-url.jpg"}
              alt={post.caption || "Image post"}
              className="post-content"
            />
          ) : (
            <div className="video-thumbnail">
              <video
                src={post.video_url || ""}
                poster={post.thumbnail_url || "placeholder-image-url.jpg"}
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
};

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    //   type: PropTypes.oneOf(["image", "video"]),
    //   content: PropTypes.string.isRequired,
    //   caption: PropTypes.string,
    })
  ).isRequired,
  onPostClick: PropTypes.func.isRequired,
};

export default PostGrid;
