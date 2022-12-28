import React, { useState } from 'react';
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
    }

    return (
        <div className='mb-20 '>
            <form onSubmit={handlePost}>
                <div className="card bg-base-100 shadow-xl border-2 border-primary">
                <div className="card-body">
                    <textarea name='caption' className="textarea textarea-bordered" placeholder="What's on your mind?"></textarea>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="fileInpu" className='border-2 border-primary flex items-center text-xl text-primary uppercase rounded-lg p-2'>
                            <FaFileImage></FaFileImage> 
                            <span className='ml-2'>Select photo</span>
                        </label>
                        <input id='fileInpu' name='postImage' type="file" className="file-input file-input-primary w-full border-1 border-gray-300 hidden none" />

                    </div>
                <div className="card-actions justify-end">
                    <button type='submit' className="btn btn-primary px-20">Post</button>
                </div>
                </div>
                </div>
            </form>
        </div>
    );
};

export default Postarea;