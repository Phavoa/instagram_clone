/* eslint-disable react/prop-types */
import menuIcon from "../../assets/options.svg";
import likeIcon from "../../assets/likeIcon.png";
import commentIcon from "../../assets/commentIcon.png";
import shareIcon from "../../assets/shareIcon.png";
import bookmarkIcon from "../../assets/bookmarkIcon.png";
import emoji from "../../assets/emoji.png";

import "./styles/General.css";
import { useNavigate } from "react-router-dom";

const PostFeed = ({
    username,
    profileImage,
    postImage,
    likes,
    caption,
    // comment,
    duration,
}) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/${username}`)
    }
 
    // console.log(username)
    return (
        <div className="feed_card full-width">
            <div className="botton_line full-width">
                <div className="round_colour outline">
                    <a href="" className="profile-img" onClick={handleNavigation}>
                        <img src={profileImage}/>
                    </a>
                </div>
                <div className="flex_in white-bg ">
                    <div className="post-icon-text white-bg">
                        <p className="white-bg feed-profile-name" onClick={handleNavigation}>
                            <a href="" className="white-bg">{username}</a>
                        </p>
                    </div>

                    <div className="options1 white-bg">
            
                        <a href="#" className="white-bg menu-anchor" >
                            <img src={menuIcon}  className="white-bg"/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="full-width white-bg">
            <img className="feed_image full-width white-bg" src={postImage} alt="feed image" />
            </div>

            <div className="pad white-bg">
                <div className="inner_flex icon_cover white-bg">
                    <div className="icons white-bg">
                        <a href="#" className="white-bg">
                            <img src={likeIcon} alt="like button" className="white-bg"/>
                        </a>
                        <a href="#" className="white-bg">
                            {" "}
                            <img src={commentIcon} alt="comment button" className="white-bg"/>
                        </a>
                        <a href="#" className="white-bg">
                            <img src={shareIcon} alt="share button" className="white-bg"/>
                        </a>
                    </div>
                    <div className="white-bg">
                        <a href="#" className="white-bg">
                            {" "}
                            <img src={bookmarkIcon} alt="save button" className="white-bg" />
                        </a>
                    </div>
                </div>
                <div className="space white-bg">
                    <div className="space_below white-bg">
                     {/* <p>Liked by <b>you</b> and {likes} <b>others</b></p> */}

                        <a className="bold bold-null white-bg" href="#">
                        Liked by <b className="white-bg">you</b> and <b className="white-bg">{likes}  others</b>
                        </a>
                    </div>
                    <div className="space_below white-bg caption-cover">
                        <p className="black white-bg ">
                            {/* <a className="bold  white-bg" href="#">
                                womenintech
                            </a> */}
                            <span className="caption-text white-bg">{caption}</span>
                             <span className="white-bg">...more</span>
                            {/* As we observe Day 10 of #16daysofactivism, here are five ways to
                            support Gender-based violence survivors:... */}
                            {/* <a className="gray white-bg" href="#">
                                 more
                            </a> */}
                        </p>
                       
                    </div>
                    <div className="white-bg">
                        <div className="space_below white-bg">
                            <a className="gray white-bg" href="#">
                                View all 8 comments
                            </a>
                        </div>
                        <div className="white-bg">
                            <a className="small white-bg" href="#">
                                {duration} days ago
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="base white-bg">
                <div className="another_flex white-bg">
                    <img src={emoji} alt="face" className="white-bg"/>
                    <div className="inner_flex white-bg">
                        <input type="text" placeholder="Add a comment..." className="white-bg comment-input"/>
                        <a className="faint_blue white-bg" href="#">
                            Publish
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostFeed;
