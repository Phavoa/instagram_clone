import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import Profile from "../../components/profile/Profile";

const ProfilePage = () => {
   const [selectedResult, setSelectedResult] = useState({});
  
  
    const handleSelectedResult = (result) => {
      setSelectedResult(result);
    };
  return (
    <div>
      <Navbar onResultSelected={handleSelectedResult}>
        <Profile user={selectedResult} />
        <Posts user={selectedResult} />
      </Navbar>
    </div>
  );
};

export default ProfilePage;
