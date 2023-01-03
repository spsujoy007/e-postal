import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaComment, FaInfoCircle, FaRegCommentAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import './Media'

const MediaCard = ({post}) => {
    const [moreDetails, setMoreDetails] = useState(false);
    const {user} = useContext(AuthContext)

    const {user: ptuser, caption, picture, date, likecount, _id } = post;
    const navigate = useNavigate();

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

    const currentdate = new Date();
    const pdate = currentdate.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    

    const handleSendComment = (event) => {
        setLoading(true)
        event.preventDefault()
        const comment = event.target.comment.value;

        const commentBody = {
            comment,
            post_id: _id,
            name: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            date: pdate
        }

        fetch(`http://localhost:5000/comments`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(commentBody)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoading(false)
        })
        event.target.reset()
    }

    return (
        <div>
            <div className="card bg-[#fdf4ff] drop-shadow-lg text-left rounded-none">
                <div className="card-body">
                
                <div className='flex gap-x-5 items-center'>
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                        <img className='mediaimg' src={ptuser?.photoURL} alt={user?.displayName} />
                    </div>
                </div>
                
                <div>
                    <h2 className="card-title m-0 ">{ptuser?.displayName}</h2>
                    <p className='text-blue-400'>{date}</p>
                </div>

                </div>

                </div>

                <p className='ml-3 py-2'>
                    {
                        moreDetails === false ? <>
                    {
                        caption.length > 85 ? 
                        <>{caption.slice(0, 85)}...<button onClick={() => setMoreDetails(!moreDetails)} className='text-blue-600 text-bold'> see more</button></>
                        :
                        <>{caption}</>
                    }
                    </>
                    :
                    <><button className='text-left' onClick={() => setMoreDetails(!moreDetails)}>{`${caption}`}</button></>
                    }
                </p>

                {
                    picture && <figure><img className='max-h-[350px] mediaimg' src={picture} alt={caption.slice(0,6)} /></figure>
                }
                <div className='px-5 text-md'>
                    {
                        <p className='px-3 py-1 flex items-center'>
                            <div className='p-1 bg-blue-500 rounded-full text-white mr-1 '><FaRegThumbsUp className=''>
                        </FaRegThumbsUp></div>
                             {likecount} Likes</p>
                    } <hr />

                    <div className='px-px flex justify-center gap-10 py-1'>
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
                    
                    
                    <Link to={`/posts/${_id}`}><button className='p-3 flex items-center'><FaInfoCircle className='mr-2'></FaInfoCircle> Details</button></Link>

                    </div>
                    <div className={showComment ? 'p-5 commentbox' : 'hidden'}>
                    <form onSubmit={handleSendComment}>
                        <div className='flex gap-2'>
                            <input required name='comment' className='w-full input border-2 border-secondary' type="text" placeholder='comment'/>
                            {
                                user?.uid ? 
                                <button type='submit' className='btn btn-primary'>send</button>
                                :
                                <Link to='/login'><button type='submit' className='btn btn-primary'>send</button></Link>

                            }
                        </div>
                    </form>

                    
                </div>
                </div>
            </div>
        </div>
    );
};

export default MediaCard;