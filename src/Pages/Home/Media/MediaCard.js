import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaComment, FaRegCommentAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import './Media'

const MediaCard = ({post}) => {
    const {user, caption, picture, date, likecount, _id } = post;
    const [showComment, setShowComment] = useState(false);
    const [loading, setLoading] = useState(false)
    const [plusLike, setPlusLike] = useState(false);
    console.log(showComment)
    // const [like, setLike] = useState(likecount);
    
    const handleIncrease = (id) => {
        setLoading(true)
        console.log(plusLike);

        fetch(`http://localhost:5000/postlike/${plusLike}?id=${id}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setLoading(false)
        })
    }

    const handleComment = (id) => {
        setShowComment(true)
    }

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

                  <p>{caption}</p>
                </div>
                {
                    picture && <img className='max-h-[300px]' src={picture} alt={caption.slice(0,6)} />
                }
                <div className='px-5 '>
                    {<p className='px-3 py-1'>{likecount} Likes</p>} <hr />
                    <div className='px-px flex justify-between gap-10 py-1'>
                    {
                        plusLike ? 
                        <button disabled className='hover:bg-blue-200 rounded-md flex gap-x-2 items-center p-2'>
                            <FaThumbsUp className='text-xl'></FaThumbsUp> Like
                        </button>
                        :
                        <button onClick={() => {
                            setPlusLike(!plusLike)
                            handleIncrease(_id)
                        }
                            }  className='hover:bg-blue-200 rounded-md flex gap-x-2 items-center p-2'>
                            <FaRegThumbsUp className='text-xl'></FaRegThumbsUp> Like
                        </button>
                    }

                    <button onClick={() => {
                        handleComment(_id)
                        setShowComment(!showComment)
                    }} className='hover:bg-blue-200 rounded-md flex items-center gap-x-2 p-2'><FaRegCommentAlt
                     className='text-xl '></FaRegCommentAlt> Comment</button>

                    </div>
                </div>
                <div className={showComment ? 'p-5 commentbox' : 'hidden'}>
                    <div className='flex gap-2'>
                        <input className='w-full input border-2 border-secondary' type="text" placeholder='comment'/>
                        <button className='btn btn-primary'>send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;