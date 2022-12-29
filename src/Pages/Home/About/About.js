import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaUserEdit } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthProvider';

const About = () => {

    const {user} = useContext(AuthContext);
    // const [closeModal, setCloseModal] = useState(false);

    const handleSubmitAbout = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const collage = form.collage.value;
        const address = form.address.value;
        console.log(name, email, collage, address)

        const aboutBody = {
            name,
            email, 
            collage,
            address,
            user_email: user.email
        }
        fetch(`https://e-postal-server.vercel.app/about`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(aboutBody)
        })
        .then(res => res.json())
        .then(data => {
            toast.success('About updated')
            window.location.reload()
        })
    }

    const {data: about = {}, refetch, isLoading} = useQuery({
        queryKey: ['about'],
        queryFn: async () => {
            const res = await fetch(`https://e-postal-server.vercel.app/about/${user.email}`);
            const data = await res.json();
            return data
        }
    })

    const {name, email, collage, address, user_email} = about;

    refetch()

    return (
        <div>
            {
                !user?.uid && <div className='h-[500px]'>
                <h2 className='text-center text-bold text-3xl mt-20'>Login to view about</h2>
            </div>

            }
            {
                user?.uid && <>
                <div>
            <div className='flex justify-end p-5'>
            {
                user_email === user.email ?
                <label aria-disabled  className='hover:cursor-pointer text-2xl bg-primary text-white rounded-full p-3'><FaUserEdit></FaUserEdit> </label>
                :
                <label htmlFor="my-modal-3" className='hover:cursor-pointer text-2xl bg-primary text-white rounded-full p-3'><FaUserEdit></FaUserEdit> </label>
            }

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Edit about you.</h3>

    <form onSubmit={handleSubmitAbout}>
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">What is your name?</span>
        </label>
        <input name='name' type="text" placeholder="John Doe" className="input input-bordered w-full" />
    </div>

    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">What is your email?</span>
        </label>
        <input name='email' type="email" placeholder="johndoe@gmail.com" className="input input-bordered w-full" />
    </div>

    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Your univercity or collage?</span>
        </label>
        <input name='collage' type="text" placeholder="type here" className="input input-bordered w-full" />
    </div>

    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Your address?</span>
        </label>
        <input name='address' type="text" placeholder="type here" className="input input-bordered w-full" />
    </div>
    
    <div className='flex justify-end my-2'>
        <button className='btn' type='submit'>Submit</button>
    </div>

    </form>

  </div>
</div>
            </div>

            <div className='justify-start'>

            <div className='flex items-center text-xl mb-5 gap-5'>
                <h2 className='text-primary uppercase font-semibold'>Name:</h2>
                <h2>{name}</h2>
            </div> <hr />
            <div className='flex items-center text-xl mb-5 gap-5'>
                <h2 className='text-primary uppercase font-semibold'>EmaiL:</h2>
                <h2>{email}</h2>
            </div> <hr />
            <div className='flex items-center text-xl mb-5 gap-5'>
                <h2 className='text-primary uppercase font-semibold'>University/collage:</h2>
                <h2>{collage}</h2>
            </div> <hr />
            <div className='flex items-center text-xl mb-5 gap-5'>
                <h2 className='text-primary uppercase font-semibold'>Address:</h2>
                <h2>{address}</h2>
            </div>

            </div>
        </div>
                </>
            }
        </div>
    );
};

export default About;