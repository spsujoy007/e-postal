import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const {createUser, googleSign, updateUserData} = useContext(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const picture = form.image.files[0];
        const email = form.email.value;
        const password = form.password.value;
        console.log(picture);

        const imgbbsecret = process.env.REACT_APP_imgbb_secret;
        console.log(imgbbsecret)
        const formData = new FormData();
        formData.append('image', picture);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbsecret}`;
        fetch( url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(pictureData => {
            console.log(pictureData);
            if(pictureData.success){
                createUser(email, password)
                .then(result => {
                console.log(result.user);
                toast.success('Account created');
                handleUpdateProfile(name, pictureData.data.url);
                navigate(from, {replace: true})
        })
        .catch(err => console.error(err))
            }
        })

        
    }

    const handleUpdateProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserData(profile)
        .then(() => {})
        .catch(err => console.error(err))

    }
    
    const handleGoogleSign = () => {
        googleSign()
        .then(result => {
            const user = result.user;
            console.log(user)
            navigate('/')
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
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
          <input required name='name' type="text" placeholder="your name" className="input input-bordered" />
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
          <input required name='email' type="email" placeholder="your email" className="input input-bordered" />
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
          <button type='submit' className="btn btn-primary">Register</button>
        </div>
               
            </div>
            <div className="divider">OR</div>
        <div className="grid place-items-center">
            <div className='flex justify-center'>
                <button onClick={handleGoogleSign} className='btn btn-primary px-20'>
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
        </form>
        </div>
    );
};

export default Register;