import React from 'react';
import { FaPlus, FaRegFileImage } from "react-icons/fa";

const Postarea = () => {
    const handlePost = (event) => {
        event.preventDefault();
        const form = event.target;
        const caption = form.caption.value;
        const postImage = form.postImage.files[0];
        console.log(caption, postImage)
    }
    return (
        <div className='py-10 '>
            <form onSubmit={handlePost}>
                <div className="card  bg-base-100 shadow-xl border-4 border-primary">
                <div className="card-body">
                    <textarea name='caption' className="textarea textarea-bordered" placeholder="Bio"></textarea>
                    <div className='flex gap-2 items-center'>
                        {/* <input name='postImage' type="file" placeholder='chose image' className="file-input file-input-primary w-full border-1 border-gray-300" /> */}
                        <button type='file'>photo</button>
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