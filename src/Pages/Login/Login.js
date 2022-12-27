import React from 'react';

const Login = () => {
    return (
        <div className='mt-10 mb-40'>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className=" lg:text-left">
      <img className='md:w-9/12' src="https://cdn.dribbble.com/users/2500979/screenshots/6486096/dribbble_gif_login.gif" alt="" />
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
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;