import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import PostDetails from "../postDetails/PostDetails";
import "./PostModal.css";
const PostModal = ({ post, onClose, posts }) => {
  const [currentPostId, setCurrentPostId] = useState(post?.id);

  const currentPost = posts.find((p) => p.id === currentPostId);

  useEffect(() => {
    if (post?.id !== currentPostId) {
      setCurrentPostId(post?.id);
    }
  }, [post]);

  const currentIndex = posts.findIndex((p) => p.id === currentPostId);

  const handleKeyDown = useCallback(
    (e) => {
      if (["ArrowRight", "ArrowLeft", "Escape"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowRight" && currentIndex < posts.length - 1) {
        setCurrentPostId(posts[currentIndex + 1].id);
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentPostId(posts[currentIndex - 1].id);
      }
      if (e.key === "Escape") {
        onClose();
      }
    },
    [currentIndex, posts, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!currentPost) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button
        className="modal-prev"
        onClick={(e) => {
          e.stopPropagation();
          if (currentIndex > 0) {
            setCurrentPostId(posts[currentIndex - 1].id);
          }
        }}
        disabled={currentIndex === 0}
        aria-label="Previous post"
      >
        <FaArrowLeft />
      </button>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="video-image">
          {!currentPost.is_video ? (
            <img
              src={currentPost.thumbnail_url || "placeholder-image-url.jpg"}
              alt={currentPost.caption || "Image post"}
              className="modal-image"
            />
          ) : (
            <video
              src={currentPost.video_url || ""}
              controls
              autoPlay
              className="modal-video"
            ></video>
          )}
        </div>
        <PostDetails currentPost={currentPost} />
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <button
        className="modal-next"
        onClick={(e) => {
          e.stopPropagation();
          if (currentIndex < posts.length - 1) {
            setCurrentPostId(posts[currentIndex + 1].id);
          }
        }}
        disabled={currentIndex === posts.length - 1}
        aria-label="Next post"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

PostModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    caption: PropTypes.string,
    thumbnail_url: PropTypes.string,
    video_url: PropTypes.string,
    is_video: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      caption: PropTypes.string,
      thumbnail_url: PropTypes.string,
      video_url: PropTypes.string,
      is_video: PropTypes.bool,
    })
  ).isRequired,
};

PostModal.defaultProps = {
  posts: [],
};

export default PostModal;
