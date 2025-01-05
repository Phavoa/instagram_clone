import "./PostDetails.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiChat, BiHeart } from "react-icons/bi";
import { fetchFromApi } from "../../../utils/fetchFromApi";

const PostDetails = ({ currentPost }) => {
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(currentPost.like_count);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await fetchFromApi(`v1/comments?code_or_id_or_url=${currentPost.id}`);
        setComments(data.items);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, [currentPost]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="modal-caption">
      {/* Post Details Section */}
      <div className="details-header">
        <h3>@{currentPost.user.full_name}</h3>
        <p>Exploring the world 🌍 #travel #adventure</p>
      </div>

      {/* Likes and Comments Counter */}
      <div className="likes-comments">
        <div
          className="likes"
          onClick={handleLike}
        >
          <BiHeart className={`likes ${liked ? "liked" : ""} icon`} />
          <span>{likeCount} Likes</span>
        </div>
        <div className="comments-count">
          <BiChat className="icon" />
          <span>{currentPost.comment_count} Comments</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-container">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <strong>{comment.user.full_name}</strong>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  currentPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    comment_count: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostDetails;
