import React, { useContext, useEffect, useState } from 'react'
import "./AccountLandingPage.css"
import axios from "axios";
import logo from "../../../Photos/Gold Luxury Initial Logo.png";
import { useNavigate } from 'react-router';
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../../../../Context/userIdetify.Check';


function AccountLandingPage() {
  const navigator = useNavigate();
  // name, username, email, phone, password
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);
  const [bgHandler, setBgHandler] = useState(false);
  

  const [newAc, setNewAc] = useState(false);
  const [oldAc, setOldAc] = useState(false);
  
  // Create New User Account ::
  const createNewAccountHandler = async (e)=>{
    e.preventDefault();
    try {
      const createdUser = await axios.post("http://localhost:8000/api/profile/createNewAccount", {name, username, email, phone, password}, {withCredentials:true});
      console.log("User has successfully registered there account ", createdUser);
      if(createdUser.status === 201) {
        toast.success("Account Created Successfully Plz logged in");
        setNewAc(false);
      }
    } catch (error) {
      if((error.response.data.error.errorResponse.code === 11000)) {
        toast.error("You have already have an account with this username or email plz add unique username and email");
        setNewAc(false)
      }
    }
  }
  // *******************************

  // User Logged In Form Handler ::
    const userLoggedInHandler = async (e)=>{
      e.preventDefault();
      try {
        const user = await axios.post("http://localhost:8000/api/profile/signIn", {email, password}, {withCredentials:true});
        console.log("User has successfully logged in ", user);
        if(user.status === 201) {
          setOldAc(false);
          toast.success("Congratulations, Now You Have Logged In Successfully");
          setTimeout(() => {
            navigator("/homePage");
          }, 1000);
        }
      } catch (error) {
        console.log("There is some errors in your loggedIn Page handler ", error);
      }
    }
  // ******************************

  const checkIsUserHaveToken = async ()=>{
    try {
       const user = await axios.post("http://localhost:8000/api/profile/userAuthentication", {}, {withCredentials:true});
       setUser(user.data.user);
       if(user.status === 201) {
       
        navigator("/homePage");
       }
    } catch (error) {
      console.log("There is some issus to verify the user plz fix the bug first ", error);
      console.log(userVerified);
    }
  };
  useEffect(()=>{
    setTimeout( checkIsUserHaveToken(),1000)
  }, []);
  // ************************** //
  
  return (
    <section className='ACLandingPage'>
      {
        bgHandler && <div className='formateHandler'></div>
      }
       <Toaster position="top-center" reverseOrder={false}/>

       {/* Drop Down for Logged In Account */}
        <div className="siginPage" style={{display:oldAc?'flex' : 'none'}}>
        <div className="close"><IoMdClose onClick={()=>{
          setOldAc(false);
          setBgHandler(false)}}/></div>
          <form onSubmit={userLoggedInHandler}>
            <input type="email" name='email' placeholder='Enter Your Existing Email here..' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name='password' placeholder='Enter Your Existing Password here..' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" className='siginPageBtn' value={"Submit"}/>
          </form>
        </div>

      {/* Drop Down For Create A New Account */}
      <div className='newAc' style={{display: newAc ? 'flex' : 'none'}}>
          <div className="close"><IoMdClose onClick={()=>{
            setNewAc(false);
            setBgHandler(false)
            }}/></div>
          <form onSubmit={createNewAccountHandler}>
          <input type="text" name='name' placeholder='Enter Your Name here..' onChange={(e)=>{setName(e.target.value)}}/>
          <input type="text" name='username' placeholder='Enter Your username here..' onChange={(e)=>{setUsername(e.target.value)}}/>
          <input type="text" name='email' placeholder='Enter Your email here..' onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="number" name='phone' placeholder='Enter Your Phone no. here..' onChange={(e)=>{setPhone(e.target.value)}}/>
          <input type="password" name='password' placeholder='Enter Your Password here..' onChange={(e)=>{setPassword(e.target.value)}}/>
          <input type="submit" className='newAcBtn' value={"Submit"}/>
          </form>
      </div>
      {/* ********************************************* */}
        <div className="logo"><img src={logo} alt="" /></div>
        <div className="form">
            <div className='heading'>
              <h1>Happening Now</h1>
              <h2>Join today.</h2>
            </div>
          <div className="acOptions">
          <div className='fdiv'>
          <button>Continue With Google</button>
          <button>Continue With FaceBook</button></div><hr />
          <div>
          <button className='ctAc' onClick={()=>{
            setNewAc(true);
            setBgHandler(true)
            }}>Create Account</button>
          <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p>
          </div>
          </div>
          <div className="alreadyHaveAc">
            <p><b>Already Have an Ac ?</b></p>
            <button onClick={()=>{
              setOldAc(true);
              setBgHandler(true)
              }}>Sign in</button>
          </div>
        </div>
        <div className="otherLinks">
        
            
            <td><p>About</p></td>
            <td><p>Download the SN app</p></td>
            <td><p>Help Center</p></td>
            <td><p>Terms of Service</p></td>
            <td><p>Privacy Policy</p></td>
            <td><p>Cookie Policy</p></td>
            <td><p>Accessibility</p></td>
            <td><p>Ads info</p></td>
            <td><p>Blog</p></td>
            <td><p>Careers</p></td>
            <td><p>Brand Resources</p></td>
            <td><p>Advertising</p></td>
            <td><p>Marketing</p></td>
            <td><p>SN for Business</p></td>
            <td><p>Developers</p></td>
            <td><p>Directory</p></td>
            <td><p>Settings</p></td>
            <td><p>© 2024 SN Corp.</p></td>
          
        </div>
    </section>
  )
}

export default AccountLandingPage
