import { useState, useEffect } from "react";
import "./styles/HomePage.css";
import ProfilePicture from "../../assets/ProfilePicture.png";
import postImage from "../../assets/postImage.png";
import SideBar from "./SideBar";
import UseAxios from "../../hooks/UseAxios";
import axios from "axios";
import Story from "./Story";
import PostFeed from "./PostFeed";

const HomePage = () => {
  const [followingUsernames, setFollowingUsernames] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);

  // Fetch following usernames using custom hook
  const [followings] = UseAxios({
    method: "GET",
    url: "https://instagram-scraper-api2.p.rapidapi.com/v1/following",
    headers: {
      // "x-rapidapi-key": "3b1ccea967msh80ad344527936acp17d2f9jsn6eb3ecc88e9d",
      "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
    },
    params: {
      username_or_id_or_url: "mrbeast",
      amount: "10",
    },
  });

  useEffect(() => {
    if (followings?.data?.items?.length) {
      setFollowingUsernames(followings.data.items.map((user) => user.username));
    }
  }, [followings]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (followingUsernames.length === 0) return;

      const fetchPromises = followingUsernames
        .slice(0, 10)
        .map(async (username) => {
          try {
            const { data } = await axios({
              method: "GET",
              url: "https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts",
              headers: {
                // "x-rapidapi-key":
                //   "3b1ccea967msh80ad344527936acp17d2f9jsn6eb3ecc88e9d",
                "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
              },
              params: {
                username_or_id_or_url: username,
                url_embed_safe: "true",
              },
            });
            return data?.data?.items?.[0] || null;
          } catch (err) {
            console.error(`Error fetching posts for ${username}:`, err);
            return null;
          }
        });

      const postsArray = await Promise.all(fetchPromises);
      setFollowingPosts(postsArray.filter(Boolean)); // Filter out null responses
    };

    fetchPosts();
  }, [followingUsernames]);

  const defaultPosts = [
    {
      username: "olima_omega",
      profileImage:
        "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "871,368",
      caption:
        "As we observe Day 10 of #16daysofactivism, here are five ways to support Gender-based violence survivors. As we observe Day 10 of #16daysofactivism, here are five ways to support Gender-based violence survivors",
      comment: "81",
      postDuration: 5,
    },
    {
      username: "oxladeofficial",
      profileImage:
        "https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://plus.unsplash.com/premium_photo-1713628398142-b0a4be37e94a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "296,573",
      caption: "Mock caption 2: #mediamodifier #mockups #design",
      comment: "16",
      postDuration: 3,
    },
    {
      username: "iam_slimcase",
      profileImage:
        "https://plus.unsplash.com/premium_photo-1709440655728-295d8c1cb722?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1725500760837-410af960b788?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "746,611",
      caption: "Mock caption 3: #mediamodifier #mockups #design",
      comment: "2",
      postDuration: 7,
    },
    {
      username: "iamnasboi",
      profileImage:
        "https://plus.unsplash.com/premium_photo-1694475062567-288df8173d30?q=80&w=893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "873,828",
      caption: "Mock caption 12: #mediamodifier #mockups #design",
      comment: "13",
      postDuration: 9,
    },
    {
      username: "itshelenpaul",
      profileImage:
        "https://plus.unsplash.com/premium_photo-1711238064070-108cd85b747d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://plus.unsplash.com/premium_photo-1675818517634-a82c6559c511?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "757,201",
      caption: "Mock caption 4: #mediamodifier #mockups #design",
      comment: "94",
      postDuration: 4,
    },
    {
      username: "fyham.rai",
      profileImage:
        "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "222,226",
      caption: "Mock caption 5: #mediamodifier #mockups #design",
      comment: "7",
      postDuration: 6,
    },
    {
      username: "ohrionstar",
      profileImage:
        "https://images.unsplash.com/photo-1541617392762-9bd12653bd12?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1735875432677-08906b3c1c04?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "587,582",
      caption: "Mock caption 6: #mediamodifier #mockups #design",
      comment: "12",
      postDuration: 8,
    },
    {
      username: "manjinder_dhindsa7",
      profileImage:
        "https://images.unsplash.com/photo-1559405201-8f58c61e7dde?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1612733801642-cd246ff82b0f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "382,655",
      caption: "Mock caption 7: #mediamodifier #mockups #design",
      comment: "96",
      postDuration: 10,
    },
    {
      username: "dadlifejason",
      profileImage:
        "https://images.unsplash.com/photo-1708420417631-420a01fff31b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1657013232106-5ea966088634?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "335,166",
      caption: "Mock caption 8: #mediamodifier #mockups #design",
      comment: "74",
      postDuration: 12,
    },
    {
      username: "arron_crascall",
      profileImage:
        "https://images.unsplash.com/photo-1486938652242-058ebc2cdfc2?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "621,987",
      caption: "Mock caption 9: #mediamodifier #mockups #design",
      comment: "76",
      postDuration: 11,
    },
    {
      username: "janemena",
      profileImage:
        "https://plus.unsplash.com/premium_photo-1678396804166-0dea162819dc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1516917104098-066b41e68d49?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "762,466",
      caption: "Mock caption 10: #mediamodifier #mockups #design",
      comment: "4",
      postDuration: 14,
    },
    {
      username: "bullyjuice",
      profileImage:
        "https://images.unsplash.com/photo-1591901206004-1b3cc4ffbe3c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      postImage:
        "https://images.unsplash.com/photo-1591901206025-cf902bf74f22?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "929,740",
      caption: "Mock caption 11: #mediamodifier #mockups #design",
      comment: "43",
      postDuration: 13,
    },
  ];

  return (
    <div className="container">
      <div className="main">
        <div className="main-left"></div>

        <div className="main-center">
          {/* Story Section */}
          <div className="story-container">
            <div className="story_update">
              <div className="story_flex">
                {(followingPosts.length > 0
                  ? followingPosts
                  : defaultPosts
                ).map((data, index) => (
                  <Story
                    key={index}
                    profileImg={
                      data?.caption?.user?.profile_pic_url || data.profileImage
                    }
                    profileName={data?.caption?.user?.username || data.username}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Post Feed Section */}
          <div className="post-container">
            {(followingPosts.length > 0 ? followingPosts : defaultPosts).map(
              (data, index) => (
                <PostFeed
                  key={index}
                  username={
                    data?.caption?.user?.username ||
                    data.username ||
                    "John_Smith"
                  }
                  profileImage={
                    data?.caption?.user?.profile_pic_url ||
                    data.profileImage ||
                    ProfilePicture
                  }
                  postImage={data?.thumbnail_url || data.postImage || postImage}
                  likes={data?.like_count || data.likes || "905,235"}
                  caption={data?.caption?.text || data.caption || ""}
                  comment={data?.comment_count || data.comment || "0"}
                  duration={data?.postDuration || "0"}
                />
              )
            )}
          </div>
        </div>

        <div className="main-right">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
