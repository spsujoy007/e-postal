import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Header = () => {

  const {user, logout} = useContext(AuthContext);

  const handleLogout = () => {
    console.log('logout')
    logout()
    .then(() => {})
    .catch(err => console.error(err))
  }

    const menubar = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/media'>Media</Link></li>
        <li><Link to='/'>Message</Link></li>
        <li><Link to='/about'>About</Link></li>
        {
          user?.uid ?
          <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
        :
          <>
            <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
          </>
        
        }
    </>
    return (
        <div>
            <div className="navbar glass fixed z-20">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {menubar}
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case text-xl">E-Postal</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menubar}
    </ul>
  </div>
  <div className="navbar-end">
       {
        user?.uid && <div className='flex items-center gap-5'>
        <h2 className='text-xl'>{user?.displayName}</h2>
          <div className="avatar">
            <div className=" rounded-full">
              {
                user?.photoURL ?
                <img style={{width: '40px', height: '40px'}} src={user?.photoURL} alt=''/>
                :
                <img style={{width: '40px', height: '40px'}} src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' alt=''/>
              }
            </div>
          </div>
        </div>
       }
  </div>
</div>
        </div>
    );
};

export default Header;