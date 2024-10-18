import React from 'react'
import "./PostCard.css"
import sample from "../../../Photos/linkdin .jpg";
import { HiAnnotation } from "react-icons/hi";

import { HiFire } from "react-icons/hi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { HiReceiptRefund } from "react-icons/hi";
import { HiOutlineSaveAs } from "react-icons/hi";
import { HiOutlineShare } from "react-icons/hi";


function PostCard({post}) {
  console.log(post);
  
  return (
    <div className='card'>
      <div className="userDP"><img src={sample} alt="" /></div>
      <div className="postDetails">

        <div className="header">
            <div><p>Name</p>
            <p>@username</p>
            <p>Date and Time</p> </div>
            <div>
                <p>...</p>
            </div>
        </div>
        <div className="body">
            <div>
           <p>{post.description}</p></div>
            <div className='postImg'><img src={post.file} alt="" /></div>
        </div>
        <div className="footer">
            <p><HiAnnotation /> {post.commentsCount}</p>
            <p><HiFire /> {post.likeCount}</p>
            <p><HiReceiptRefund /> {post.repostCount}</p>
            <p><HiOutlineChartSquareBar /> {post.views}</p>
            <div>
            <p><HiOutlineSaveAs /></p>
            <p><HiOutlineShare /></p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default PostCard
