import React from 'react';
import Postarea from '../Postarea/Postarea';
import SortData from './SortData';

const Home = () => {

    return (
        <div className='md:max-w-[600px] mx-auto'>
            <Postarea></Postarea>
            <div className='md:max-w-[460px] mx-auto'>
                <SortData></SortData>
            </div>
        </div>
    );
};

export default Home;