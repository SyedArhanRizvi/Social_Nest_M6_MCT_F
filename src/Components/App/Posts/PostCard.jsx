import React, { useContext, useState } from 'react'
import "./PostCard.css"
import sample from "../../../Photos/linkdin .jpg";
import { HiAnnotation } from "react-icons/hi";

import { HiFire } from "react-icons/hi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { HiReceiptRefund } from "react-icons/hi";
import { HiOutlineSaveAs } from "react-icons/hi";
import { HiOutlineShare } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { UserContext } from '../../../../Context/userIdetify.Check';

function PostCard({post, deleteHandler, likesHandler}) {
  const [postOwner, setPostOwner] = useState(false);
  const {userId} = useContext(UserContext);
  // console.log(post.postedBy);
  
  return (
    <div className='card'>
      <div className="userDP"><img src={sample} alt="" /></div>
      <div className="postDetails">

        <div className="header">
            <div><h4>{post.postedBy.name}</h4>
            <p>@{post.postedBy.username}</p>
            </div>
            <div>
                <p style={{cursor:'pointer'}}>...</p>
            </div>  
        </div>
        <div className="body">
            <div>
           <p>{post.description}</p></div>
            <div className='postImg'><img src={post.file} alt="" /></div>
        </div>
        <div className="footer">
            <p><HiAnnotation /> {post.commentsCount}</p>
            <p><HiFire onClick={()=>likesHandler(post._id)}/> {post.likeCount}</p>
            <p><HiReceiptRefund /> {post.repostCount}</p>
            <p><HiOutlineChartSquareBar /> {post.views}</p>
            <div>
            <p><HiOutlineSaveAs /></p>
            <p><HiOutlineShare /></p>
            {
              userId === post.postedBy._id &&  <p><MdDeleteForever onClick={()=>deleteHandler(post._id)}/></p>
            }
           
            </div>
        </div>

      </div>
    </div>
  )
}

export default PostCard
