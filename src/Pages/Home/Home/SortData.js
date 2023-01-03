import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import MediaCard from '../Media/MediaCard';

const SortData = () => {

    const {data: posts = [], refetch, isLoading} = useQuery({
        queryKey: ['posts'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/sortposts`);
            const data = await res.json();
            return data
        }
    })

    refetch();

    if(isLoading){
        return <Spinner></Spinner>
    }

    return (
        <div>
            <div className='grid grid-cols-1 gap-10 mb-20'>
                {
                    posts.map((post) => <MediaCard
                        key={post._id}
                        post={post}
                    ></MediaCard>)
                }
            <div className='flex justify-center'>
                <Link to='/media'><button className='btn btn-primary px-10'>All post</button></Link>
            </div>
            </div>
        </div>
    );
};

export default SortData;