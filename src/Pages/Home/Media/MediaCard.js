import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaComment, FaRegCommentAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Media'

const MediaCard = ({post}) => {
    const {user, caption, picture, date, likecount, _id } = post;
    


    return (
        <div>
            <div className="card bg-[#fdf4ff] drop-shadow-lg text-left rounded-none">
                <div className="card-body">
                
                <div className='flex gap-x-5 items-center'>
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                        <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                </div>
                
                <div>
                    <h2 className="card-title m-0 ">{user?.displayName}</h2>
                  <p className='text-blue-400'>{date}</p>
                </div>

                </div>

                </div>
                <p className='ml-3 py-2'>{caption}</p>
                {
                    picture && <img className='max-h-[300px]' src={picture} alt={caption.slice(0,6)} />
                }
                <div className='px-5 '>
                    {<p className='px-3 py-1'>{likecount} Likes</p>} <hr />
                    <div className='px-px flex justify-center gap-10 py-1'>
                    
                    <Link to={`/posts/${_id}`}><button className='p-3'>Details</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;