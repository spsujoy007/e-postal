import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <form className='mt-10 mb-40'>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className=" lg:text-left">
      <img className='md:w-full' src="https://cdn.dribbble.com/users/2500979/screenshots/6486096/dribbble_gif_login.gif" alt="" />
    </div>
    <div className="card w-full bg-base-100">
      <div className="card-body">
        <div className="form-control">
            <h2 className='text-4xl font-semibold text-primary uppercase'>Login now</h2>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" />
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
          <button className="btn btn-primary">Login</button>
        </div>
               
            </div>
            <div className="divider">OR</div>
        <div className="grid place-items-center">
            <div className='flex justify-center'>
                <button className='btn btn-primary px-20'>
                    <FaGoogle className='text-2xl text-white'></FaGoogle> 
                </button>
            </div> 
            <h2 className='my-3'>If you don't have an account. Please <Link to='/register' className='underline text-primary'>Register</Link></h2> 
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </form>
    );
};

export default Login;