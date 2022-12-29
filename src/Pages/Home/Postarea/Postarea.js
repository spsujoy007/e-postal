import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaFileImage } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Postarea = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const currentdate = new Date();
    const date = currentdate.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const handlePost = (event) => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const caption = form.caption.value;
        const postImage = form.postImage.files[0];
        console.log(caption, postImage)

        const imgbbsecret = process.env.REACT_APP_imgbb_secret;
            console.log(imgbbsecret)
            const formData = new FormData();
            formData.append('image', postImage);
            const url = `https://api.imgbb.com/1/upload?key=${imgbbsecret}`;
            fetch( url, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(pictureData => {
                const picture = pictureData.data.url;
                const postBody = {
                    caption,
                    picture,
                    date,
                    likecount: 0,
                    user
                }
        
                fetch(`http://localhost:5000/posts/posts`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(postBody) 
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.acknowledged){
                        setLoading(false);
                        navigate('/media');
                        toast.success('Post added')
                    }
                })
            })
    }


    return (
        <div className='mb-20 '>
            <form onSubmit={handlePost}>
                <div className="card bg-[#fdf4ff] shadow-md ">
                <div className="card-body">
                    <div className='md:flex md:gap-x-2'>
                    <textarea name='caption' className="md:flex-1 w-full textarea border-2 border-primary textarea-bordered min-h-[100px]" placeholder="What's on your mind?"></textarea>

        <label htmlFor="fileInpu" className='flex justify-center gap-2 hover:bg-primary hover:text-white hover:cursor-pointer items-center border-2 border-primary p-2 text-primary uppercase rounded-lg'>
        <div >
            <div className='flex flex-col items-center text-xl  '>
                <FaFileImage></FaFileImage> 
                <span>Select photo</span>
            </div>
                <input id='fileInpu' name='postImage' type="file" className="file-input file-input-primary w-full border-1 border-gray-300 hidden none" />

        </div>
        </label>
                    </div>
                <div className="card-actions">
                    {
                        loading ?
                        <button className="btn btn-secondary loading w-full">posting...</button>
                        :
                        <button type='submit' className="btn btn-primary w-full">Post</button>
                    }
                </div>
                </div>
                </div>
            </form>
        </div>
    );
};

export default Postarea;