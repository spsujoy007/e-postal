import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaRegCommentAlt, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../context/AuthProvider';


const MediaCardDetail = () => {
    const post = useLoaderData();
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

        fetch(`https://e-postal-server.vercel.app/postlike/${plusLike}?id=${id}`, {
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

        fetch(`https://e-postal-server.vercel.app/comments`, {
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

    const {data: comments = [], refetch, isLoading} = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(`https://e-postal-server.vercel.app/comments`)
            const data = await res.json();
            return data
        }
    })

    refetch()
    if(isLoading){
        return <Spinner></Spinner>
    }

    return (
        <div className='pb-20'>
            <div className="card bg-[#fdf4ff] drop-shadow-lg text-left rounded-none">
                <div className="card-body">
                
                <div className='flex gap-x-5 items-center'>
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                        <img src={ptuser?.photoURL} alt={user?.displayName} />
                    </div>
                </div>
                
                <div>
                    <h2 className="card-title m-0 ">{user?.displayName}</h2>
                  <p className='text-blue-400'>{date}</p>
                </div>

                </div>

                </div>
                <p className='ml-3 py-2 max-h-[500px] mx-auto'>{caption}</p>
                {
                    picture && <figure><img className='max-h-[500px]' src={picture} alt={caption.slice(0,6)} /></figure>
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

                <div className='p-5'>
                        <h2 className='text-2xl uppercase py-1 mt-4'>comment's</h2> <hr />
                        {
                            comments.map(comment => <>
                            {
                                comment.post_id === _id && <div 
                            key={comment._id} 
                            className="mt-5 px-3 py-5 bg-white rounded-lg">
                                <div className='flex gap-5 items-center'>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={comment?.photoURL} alt="Tailwind-CSS-Avatar-component" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className='text-xl inline uppercase'>{comment?.name}</h5>
                                        <p className='p-2 bg-pink-100 rounded-xl block'>{comment.comment}</p>
                                    </div>
                                </div>

                                {/* <div className='px-3 py-px bg-base-50 md:ml-12 rounded-xl'>
                                </div> */}
                            </div>
                            }
                            </>
                            
                            )}
                    </div>
            </div>
        </div>
    );
};

export default MediaCardDetail;