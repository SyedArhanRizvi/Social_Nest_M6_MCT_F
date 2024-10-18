import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from "axios"
import { IoHome } from "react-icons/io5";
import { useContext } from 'react';
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
import { UserContext } from '../../../../Context/userIdetify.Check';
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdAddLocationAlt } from "react-icons/md";
import { MdPoll } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { MdOutlineGifBox } from "react-icons/md";
import sample from "../../../Photos/linkdin .jpg";
import { useNavigate } from 'react-router';
import PostCard from '../Posts/PostCard';
import { Link } from 'react-router-dom';
function Home() {
  //description, gif, emoji, comments, shares, reposts, likes, likeCount, save, location, views,file
    const [file, setFile] = useState();
    const [description, setDescription] = useState('');
    const [gif, setGif] = useState('');
    const [emoji, setEmoji] = useState('');
    const [comments, setComments] = useState('');
    const [shares, setShares] = useState('');
    const [reposts, setReposts] = useState('');
    const [likes, setLikes] = useState();
    // const [likeCount, setLikeCount] = useState('');
    const [save, setSave] = useState('');
    const [location, setLocation] = useState('');
    const [demoFile, setDemoFile] = useState();
    const [postData, setPostData] = useState();
    const [acPopController, setAcPopUpController] = useState(false);
    const [addExistingAcPopUpController, setAddExistingAcPopCotroller] = useState(false);
    const [loggedOutPopController, setLoggedOutPopUpController] = useState(false);
    const [bgHandler, setBgHandler] = useState(false);
    const [profile, setProfile] = useState(false);
    const {user, setUser, userId, setUSerId} = useContext(UserContext);
    const [isImgActive, setImgActive] = useState(false);
    const [likeCount, setLikeCont] = useState(0);
    const [saveUser, setSaveUSer] = useState();
    //  comments: [CommentSchema],commentsCount // Array of comments 


    const likesHandler = async (postId)=>{
      console.log("Like", postId);
      await setLikeCont((prev) => prev+1);
      console.log(likeCount);
        try {
           const like = await axios.put(`http://localhost:8000/api/post/addLikeOrComment/${postId}`, {likeCount}, {withCredentials:true});
           console.log("Like has successfully added", like);
           getAllPosts();
        } catch (error) {
          console.log("There is some errors so we can not add your like on this post plz fix the bug first ", error);       
        }
    }

    const deleteHandler = async (postId)=>{
      try {
        const postDelete = await axios.delete(`http://localhost:8000/api/post/deletePost${postId}`);
        getAllPosts();
      } catch (error) {
        console.log("Sorry there is some errors so we can not delete your post plz fix the bug first ", error);
      }
    } 
    const fileHandler = async (e)=>{
     const selectedFile = e.target.files[0];
     setFile(selectedFile);
      console.log(selectedFile);
        try {
          if(selectedFile) {
            const data = new FormData();
            data.append('file', selectedFile);
            const uplodDemoFile = await axios.post("http://localhost:8000/api/post/fileHandler", data, {withCredentials:true});
            if(uplodDemoFile.status === 201) {
              setDemoFile(uplodDemoFile.data.uploadedFile.file);
              console.log(demoFile);  
              setImgActive(true);
            }
          }
        } catch (error) {
          console.log("There is some errors in demoFileHandler", error);
        
      }
    }
    const removeImg = ()=>{
      setDemoFile('');
      setImgActive(false);
    }

    const postFormHandler = async ()=>{
      console.log(file);
      const data = new FormData();
      data.append('description', description);
      data.append('file', file);
      
      try {
        const uploadedPost = await axios.post("http://localhost:8000/api/post/addNewPost", data, {withCredentials:true});
        getAllPosts();
        console.log(uploadedPost);
        setDescription('');
        setDemoFile('');
        setImgActive(false);
      } catch (error) {
        console.log("There is some errors in your postFormHandler plz fix the bug first ", error);
      }
    }

    const getAllPosts = async ()=>{
      try {
        const data = await axios.get("http://localhost:8000/api/post/getAllPosts");
        setPostData(data.data.allPosts);
        console.log(postData);
      } catch (error) {
        console.log("due to some reasons we can not show you all post data ", error);
      }
    }
  
    const navigator = useNavigate();

    const loggedOutHandler = async ()=>{
      try {
        const userLoggedOut = await axios.post("http://localhost:8000/api/profile/userLoggedOut", {}, {withCredentials:true});
        if(userLoggedOut.status === 201) {
          setBgHandler(false);
          setLoggedOutPopUpController(false);
          navigator("/");
        }
      } catch (error) {
        console.log("There is some issus in your logged out controller function plz fix the bug first ", error); 
      }
    }

    const userDetailsChecker = async (userId)=>{
      try {
          const userDetails = await axios.get(`http://localhost:8000/api/profile/getUserDetails${userId}`);
          // console.log(userDetails.data.user);
          setSaveUSer(userDetails.data.user);
          console.log(saveUser);
          
        
      } catch (error) {
        console.log("There is some issus in your user checker function plz fix the bug first ", error);
      }
    }
    useEffect(()=>{
      getAllPosts();
      console.log(userId);
      userDetailsChecker(userId);
    }, []);
  return (
    <main className='mainSection'  style={{overflow: bgHandler ? 'hidden' : 'auto'}}>
      {
        bgHandler && <div className='bgHandler'></div>
      }
      
      {
        loggedOutPopController &&  <div className="loggedOut">
          <div className='lgD'><h1>SN</h1></div>
          <div>
            <p><b>Log out of X?</b></p>
            <p>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </p>
          </div>
          <div className='lgD'>
            <p onClick={loggedOutHandler}>Log Out</p>
            <p onClick={()=>{
              setBgHandler(false);
              setLoggedOutPopUpController(false);
            }}>Cancel</p>
          </div>
      </div>``
      }
         <section className="sideNav">
          <div className='allFunc'>
              <div className='appLogo'><IoLogoAppleAr /><p>SOCIAL NEST</p></div>
              <div className='logo'><IoHome /><p>Home</p></div>
              <div className='logo'><IoSearch /><p>Explore</p></div>
              <div className='logo'><IoNotificationsCircleOutline /><p>Notifications</p></div>
              <div className='logo'><IoChatboxEllipses /><p>Messages</p></div>
              <div className='logo'><IoLogoDropbox /><p>Grok</p></div>
              <div className='logo'><IoIosPeople /><p>Communities</p></div>
              <div className='logo'><GiStarFormation /><p>Premium</p></div>
              <div className='logo'><AiOutlineThunderbolt /><p>Verified Orgs</p></div>
              <div className='logo'><FaUserSecret onClick={()=>setProfile(true)}/><Link to={"/profileSection"}><p>Profile</p></Link></div>
              <div className='logo'><CgMoreO /><p>More</p></div>
              <div className='pst'><p className='addPost'>Post</p></div>
          </div>
          <div className="acController" onClick={()=>setAcPopUpController(!acPopController)}>
            {
              acPopController &&  <div className="acHanderPoPuP">
              <div className="addExistingAcPopUp"><p>Add Existing Account</p></div>
              <div className="logoutSectionPoPUp"><p onClick={()=>{
                setLoggedOutPopUpController(true);
                setBgHandler(true)
              }}>Log out @{user.username}</p></div>
              </div>
            }
              <div className='userImg'><img src={sample} /></div>
              <div><p><b>{user.name}</b></p><p><i>@{user.username}</i></p></div>
              <div><p>...</p></div>
          </div>
        </section>
        <section className="mainPosts">
          <div className="relatedPosts">
            <p>For You</p>
            <p>Following</p>
          </div>
          {/* Post Uploader Section */}
          <div className="addPostForm">
              <div className="userImg"><img src={sample} alt="" /></div>
              <div className="userPostForm">
                <div className="inputField">
                  <textarea type="text" value={description} name='' placeholder='What is happening ?!' onChange={(e)=>{
                    setDescription(e.target.value)
                }}/></div><hr />
                {
                  isImgActive && <div className="addedImg">
                    <p onClick={removeImg}>X</p>
                    <img src={demoFile} alt="" /></div>
                }
                <div className="postBtn">
                  <div className='d1'>
                    {/* <label htmlFor="file" id='file'>
                      <MdAddPhotoAlternate id='file' htmlFor="file"/>
                      <input type='file' id='file' name='file' className='fileForLabel'/>
                    </label> */}
                      <p><label htmlFor="file" id="file-label" className="file-label">
                          <MdAddPhotoAlternate id="file-icon" style={{cursor:'pointer'}}/>
                          
                          <input
                              type="file"
                              id="file"
                              name="file"
                              className="fileForLabel"
                              onChange={(e)=>fileHandler(e)}
                              style={{ display: "none" }} // Hide the input element
                          />
                      </label></p>
                      
                    <p>
                  <MdEmojiEmotions /></p><p><MdAddLocationAlt /></p><p><MdOutlineGifBox /></p><p><MdPoll /></p></div>
                  <div className='d2'><p onClick={postFormHandler}>Post</p></div>
                </div>
              </div>
          </div>
          <div className="allPosts">
           {
            !postData ? <h1>There is no Post available</h1>
            : postData.map((post)=>{
              // console.log(post);
              
              return <PostCard post={post} deleteHandler={deleteHandler} likesHandler={likesHandler}/>
            })
           }
          </div>
        </section>
        <section className="searchAndExplore">
          <div className='search'>
            <input type="text" placeholder='Search ?'/>
          </div>
          <div className='trending'>
          <div>
            <h1>What's happening</h1>
          </div>
          </div>
        </section>
    </main>
  )
}

export default Home
