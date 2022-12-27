import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className=" lg:text-left">
      <img className='md:w-full' src="https://cdn.dribbble.com/users/669537/screenshots/5821620/dribbble-clip800x600_2.gif" alt="" />
    </div>
    <div className="card bg-base-100">
      <div className="card-body w-96">
        <h2 className='text-4xl mx-w-sm font-semibold text-primary uppercase'>Create account</h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input name='name' type="text" placeholder="your name" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input name='image' type="file" placeholder="image" className="file-input input-bordered" accept="image/*"/>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name='email' type="email" placeholder="your email" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" />
        </div>

        <div className="flex flex-col w-full border-opacity-50">
        
            <div className="grid">
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
               
            </div>
            <div className="divider">OR</div>
        <div className="grid place-items-center">
            <div className='flex justify-center'>
                <button className='btn btn-primary px-20'>
                    <FaGoogle className='text-2xl text-white'></FaGoogle> 
                </button>
            </div> 
            <h2 className='my-3'>If you have an account. Please <Link to='/login' className='underline text-primary'>login</Link></h2> 
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
        </div>
    );
};

export default Register;