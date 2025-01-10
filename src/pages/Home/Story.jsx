/* eslint-disable react/prop-types */
import "./styles/General.css";

const Story = ({ profileImg, profileName }) => {
  return (
        <div className="mini">
          <div className="colour_border outline">
            <a href="#">
              <img src={profileImg} alt="story cover image" />
            </a>
          </div>
          <p>
            <a href="#">{profileName}</a>
          </p>
        </div>
  );
};

export default Story;
