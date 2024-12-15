import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { postsData } from "../../../data/data";
import PostDetails from "../postDetails/PostDetails";

const PostModal = ({ post, onClose }) => {
  const [currentPostId, setCurrentPostId] = useState(post?.id);

  // Find current post by ID
  const currentPost = postsData.find((p) => p.id === currentPostId);

  useEffect(() => {
    if (post?.id !== currentPostId) {
      setCurrentPostId(post?.id);
    }
  }, [post]); // Correct dependencies

  const currentIndex = postsData.findIndex((p) => p.id === currentPostId);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && currentIndex < postsData.length - 1) {
        setCurrentPostId(postsData[currentIndex + 1].id);
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentPostId(postsData[currentIndex - 1].id);
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose]);



  if (!currentPost) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Navigation Buttons */}
      <button
        className="modal-prev"
        onClick={(e) => {
          e.stopPropagation();
          if (currentIndex > 0) {
            setCurrentPostId(postsData[currentIndex - 1].id);
          }
        }}
        disabled={currentIndex === 0}
        aria-label="Previous post"
      >
        <FaArrowLeft />
      </button>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {currentPost.type === "image" ? (
          <img
            src={currentPost.content}
            alt={currentPost.caption || "Image post"}
            className="modal-image"
          />
        ) : (
          <video
            src={currentPost.content}
            controls
            autoPlay
            className="modal-video"
          ></video>
        )}
        <PostDetails currentPost={currentPost} />
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <button
        className="modal-next"
        onClick={(e) => {
          e.stopPropagation();
          if (currentIndex < postsData.length - 1) {
            setCurrentPostId(postsData[currentIndex + 1].id);
          }
        }}
        disabled={currentIndex === postsData.length - 1}
        aria-label="Next post"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

// PropTypes Validation
PostModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["image", "video"]).isRequired,
    content: PropTypes.string.isRequired,
    caption: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostModal;
