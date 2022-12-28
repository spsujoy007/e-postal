import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaFileImage, FaPlus, FaRegFileImage, FaRegPlusSquare } from "react-icons/fa";

const Postarea = () => {

    const currentdate = new Date();
    const date = currentdate.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const handlePost = (event) => {
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
            })
    }


    return (
        <div className='mb-20 '>
            <form onSubmit={handlePost}>
                <div className="card bg-[#fdf4ff] shadow-md ">
                <div className="card-body">
                    <div className='md:flex md:gap-x-2'>
                    <textarea name='caption' className="md:flex-1 textarea border-2 border-primary textarea-bordered min-h-[100px]" placeholder="What's on your mind?"></textarea>

<div className='flex gap-2 hover:bg-primary hover:text-white hover:cursor-pointer items-center border-2 border-primary p-2 text-primary uppercase rounded-lg'>
    <label htmlFor="fileInpu" className='flex flex-col items-center text-xl  '>
        <FaFileImage></FaFileImage> 
        <span className='ml-2'>Select photo</span>
    </label>
    <input id='fileInpu' name='postImage' type="file" className="file-input file-input-primary w-full border-1 border-gray-300 hidden none" />

</div>
                    </div>
                <div className="card-actions">
                    <button type='submit' className="btn btn-primary w-full">Post</button>
                </div>
                </div>
                </div>
            </form>
        </div>
    );
};

export default Postarea;