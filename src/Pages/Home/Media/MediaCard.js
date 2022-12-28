import React from 'react';

const MediaCard = ({post}) => {
    const {user, caption, picture, date, likeCount } = post;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl text-left rounded-none">
                <div className="card-body">
                
                <div className=''>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                </div>
                  <h2 className="card-title ">{user.displayName}</h2>
                </div>

                  <p>{caption}</p>
                </div>
                {
                    picture && <figure><img src={picture} alt={caption.slice(0,6)} /></figure>
                }
                <div>
                    {date}
                </div>
            </div>
        </div>
    );
};

export default MediaCard;