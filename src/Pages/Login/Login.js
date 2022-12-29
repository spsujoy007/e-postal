import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const {user, singIn, googleSign} = useContext(AuthContext);
  const [error, setError] = useState('');


  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    singIn(email, password)
    .then(result => {
      const user = result.user;
      toast.success('Login successful')
      navigate(from, {replace: true})
      setError('')
    })
    .catch(err => {
      setError(err.message)
    })
  }

  const handlenGoogleLogin = () => {
    googleSign()
    .then(() => {})
    .catch(err => setError(err.message))
  }

    return (
        <div className='mt-10 mb-40'>
          <form onSubmit={handleSignIn} >
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
          <input required name='email' type="text" placeholder="email" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input required name='password' type="password" placeholder="password" className="input input-bordered" />
        </div>

        <div className="flex flex-col w-full border-opacity-50">
            <div className="grid">
        <div className="form-control mt-6">
          {error && <p className='mb-3 text-error'>{error}</p>}
          <button type='submit' className="btn btn-primary">Login</button>
        </div>
               
            </div>
            
        </div>
      </div>
    </div>
  </div>
</div>
        </form>

        <div className=''>
            <div className=''>
                
        <button onClick={handlenGoogleLogin} className='btn btn-primary px-20'>
        <FaGoogle className='text-2xl text-white'></FaGoogle> 
    </button>
            </div> 
            <h2 className='my-3'>If you don't have an account. Please <Link to='/register' className='underline text-primary'>Register</Link></h2> 
        </div>
        
        </div>
    );
};

export default Login;