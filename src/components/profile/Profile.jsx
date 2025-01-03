import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="container">
      <div className="profileHeader">
        <img 
          src="https://s3-alpha-sig.figma.com/img/ecdd/5718/face4a9a321545531132fdeb31881fa4?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=owbMwFa4g0U2Wj1QS8XMgSmXB8T7G4I2DGcHz4X7qFa6c0Z7ygcYOXpInkp~bP9r2Ls5gJvKsEKdO1QBlSUtovtekorRe44oWh8rDJAAchc~OlnCpyj3Cr-HFpgsSAIteGVbwdMk2j1Bp9oPJP733XefCxfaY8j0hbVH1wDG1yhKNKjkmRsL~~fWv8TvZpvVvH2JByQUDawU0oBz7YkADqqQuhxPphQmyEfTb6HU-SmiPnHTnAhBWzFy5lI28r9mRL3pIi3mc4gTaJmXw1oMeNYzpmdvjD-jGTx-LP5RrxFHFUTbxG0jGr4IThIOeDJ2wjteJ3zHKhr6veFQyuG-ag__"
          alt="Profile"
          className="profileImage"
        />
        <div className="profileDetails">
            <div className='actionsButton'>
            <h2 className="username">mediamodifier</h2>
              <button className='button'>Send a message</button>
              <button>
                &#x2713; 
              </button>
              <div className="dropdown">
                <button className="menu" onClick={toggleDropdown}>▼</button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li>Option 1</li>
                      <li>Option 2</li>
                      <li>Option 3</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className='menu'>...</div>
            </div>

          <div className="stats">
            <span><span className="font-num">1,132</span> Posts</span>
            <span><span className="font-num">60K</span> Followers</span>
            <span><span className="font-num">4</span> Following</span>
          </div>
          <p className="bio">Mediamodifier - Building Brands</p>
          <p className="bioDescription">
            We provide essential tools to help entrepreneurs grow their businesses online.
          </p>
          <a href="https://mediamodifier.com" className="websiteLink">
            mediamodifier.com 
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
