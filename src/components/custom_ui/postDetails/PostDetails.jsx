import PropTypes from "prop-types";

const PostDetails = ({ currentPost }) => {
  return (
    <div className="modal-caption">
      <p>{currentPost.caption || "No caption available"}</p>
    </div>
  );
};

// PostModal.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     type: PropTypes.oneOf(["image", "video"]).isRequired,
//     content: PropTypes.string.isRequired,
//     caption: PropTypes.string,
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
// };

PostDetails.PropTypes = {
  currentPost: PropTypes.shape({}),
};

export default PostDetails;
