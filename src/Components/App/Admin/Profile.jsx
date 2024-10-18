import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { IoHome } from "react-icons/io5";
import { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoLogoDropbox } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { GiStarFormation } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { IoLogoAppleAr } from "react-icons/io5";
// import { UserContext } from '../../../../Context/userIdetify.Check';
import { UserContext } from "../../../../Context/userIdetify.Check";
import sample from "../../../Photos/linkdin .jpg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import PostCard from "../Posts/PostCard";

function Profile() {
  //description, gif, emoji, comments, shares, reposts, likes, likeCount, save, location, views,file

  const [addExistingAcPopUpController, setAddExistingAcPopCotroller] =
    useState(false);
  const [loggedOutPopController, setLoggedOutPopUpController] = useState(false);
  const [bgHandler, setBgHandler] = useState(false);
  const [profile, setProfile] = useState(false);
  const [post, setPostData] = useState();
  const [acPopController, setAcPopUpController] = useState(false);

  const { user, userId } = useContext(UserContext);

  useEffect(() => {
    console.log(userId);
  }, []);
  const getAllPosts = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8000/api/post/getAllPosts"
      );

      setPostData(data.data.allPosts);
      console.log(post);
    } catch (error) {
      console.log(
        "due to some reasons we can not show you all post data ",
        error
      );
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  const navigator = useNavigate();

  const loggedOutHandler = async () => {
    try {
      const userLoggedOut = await axios.post(
        "http://localhost:8000/api/profile/userLoggedOut",
        {},
        { withCredentials: true }
      );
      if (userLoggedOut.status === 201) {
        setBgHandler(false);
        setLoggedOutPopUpController(false);
        navigator("/");
      }
    } catch (error) {
      console.log(
        "There is some issus in your logged out controller function plz fix the bug first ",
        error
      );
    }
  };

  // const userDetailsChecker = async ()=>{
  //   try {

  //       const userDetails = await axios.get("http://localhost:8000/api/profile/getUserDetails");
  //       console.log(userDetails);
  //       setUser(userDetails);

  //   } catch (error) {
  //     console.log("There is some issus in your user checker function plz fix the bug first ", error);
  //   }
  // }
  const timestamp = user.createdAt;

  // Create a Date object
  const dateObj = new Date(timestamp);

  // Extract the day, month, and year
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" }); // Long month format (e.g., October)
  const year = dateObj.getFullYear();

  // Format the date as "Date Month Year"
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <main
      className="mainSection"
      style={{ overflow: bgHandler ? "hidden" : "auto" }}
    >
      {bgHandler && <div className="bgHandler"></div>}

      {loggedOutPopController && (
        <div className="loggedOut">
          <div className="lgD">
            <h1>SN</h1>
          </div>
          <div>
            <p>
              <b>Log out of X?</b>
            </p>
            <p>
              You can always log back in at any time. If you just want to switch
              accounts, you can do that by adding an existing account.{" "}
            </p>
          </div>
          <div className="lgD">
            <p onClick={loggedOutHandler}>Log Out</p>
            <p
              onClick={() => {
                setBgHandler(false);
                setLoggedOutPopUpController(false);
              }}
            >
              Cancel
            </p>
          </div>
        </div>
      )}
      <section className="sideNav">
        <div className="allFunc">
          <div className="appLogo">
            <IoLogoAppleAr />
            <p>SOCIAL NEST</p>
          </div>
          <div className="logo">
            <IoHome />
            <p>Home</p>
          </div>
          <div className="logo">
            <IoSearch />
            <p>Explore</p>
          </div>
          <div className="logo">
            <IoNotificationsCircleOutline />
            <p>Notifications</p>
          </div>
          <div className="logo">
            <IoChatboxEllipses />
            <p>Messages</p>
          </div>
          <div className="logo">
            <IoLogoDropbox />
            <p>Grok</p>
          </div>
          <div className="logo">
            <IoIosPeople />
            <p>Communities</p>
          </div>
          <div className="logo">
            <GiStarFormation />
            <p>Premium</p>
          </div>
          <div className="logo">
            <AiOutlineThunderbolt />
            <p>Verified Orgs</p>
          </div>
          <div className="logo">
            <FaUserSecret onClick={() => setProfile(true)} />
            <Link to={"/profileSection"}>
              <p>Profile</p>
            </Link>
          </div>
          <div className="logo">
            <CgMoreO />
            <p>More</p>
          </div>
          <div className="pst">
            <p className="addPost">Post</p>
          </div>
        </div>
        <div
          className="acController"
          onClick={() => setAcPopUpController(!acPopController)}
        >
          {acPopController && (
            <div className="acHanderPoPuP">
              <div className="addExistingAcPopUp">
                <p>Add Existing Account</p>
              </div>
              <div className="logoutSectionPoPUp">
                <p
                  onClick={() => {
                    setLoggedOutPopUpController(true);
                    setBgHandler(true);
                  }}
                >
                  Log out @{user.username}
                </p>
              </div>
            </div>
          )}
          <div className="userImg">
            <img src={sample} />
          </div>
          <div>
            <p>
              <b>{user.name}</b>
            </p>
            <p>
              <i>@{user.username}</i>
            </p>
          </div>
          <div>
            <p>...</p>
          </div>
        </div>
      </section>
      <section className="profileContainer">
        {/* Profile Dashboard Section */}

        <div className="profileDashBoard">
          <div className="topD">
            <div className="div">
              <Link to={"/homePage"}>
                <p>
                  <IoMdArrowRoundBack />
                </p>
              </Link>
            </div>
            <div>
              <h4>Name</h4>
              <p>Post 0</p>
            </div>
          </div>
          <div className="bgPhoto">
            <img src="" alt="" />
          </div>
          <div className="userIng">
            <img src="" alt="" />
          </div>
        </div>
        <div className="profileDashBoard2">
          <div className="editProfile">
            <p>Edit Profile</p>
          </div>
          <div className="userDetails">
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p>{formattedDate}</p>
            <div>
              <h5>Followers</h5>
              <h5>Following</h5>
            </div>
          </div>
        </div>
        <div className="mainProfileSection">
          <div className="list">
            <p>Post</p>
            <p>Replies</p>
            <p>Highlight</p>
            <p>Likes</p>
            <p>Media</p>
            <p>Article</p>
          </div>
          <div className="allUserPosts">
          {
  !post || post.length === 0 ? (
    <h1>You have not posted till now</h1>
  ) : (
    post
      .filter((post) => post.postedBy._id.toString() === userId.toString())
      .map((filteredPost) => {
        console.log(filteredPost); // Check filtered result
        return (
          <PostCard  post={filteredPost} />
        );
      })
  )
}

          </div>
        </div>
      </section>
      <section className="searchAndExplore">
        <div className="search">
          <input type="text" placeholder="Search ?" />
        </div>
        <div className="trending">
          <div>
            <h1>What's happening</h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
