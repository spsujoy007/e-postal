import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../../Components/Spinner/Spinner';
import MediaCard from './MediaCard';

const Media = () => {
    const {data: posts = [], refetch, isLoading} = useQuery({
        queryKey: ['posts'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/posts`);
            const data = await res.json();
            return data
        }
    })

    refetch();

    if(isLoading){
        return <Spinner></Spinner>
    }

    return (
        <div className='mb-20 md:max-w-[400px] mx-auto'>
            <div className='grid grid-cols-1 gap-10'>
                {
                    posts.map(post => <MediaCard
                        key={post._id}
                        post={post}
                    ></MediaCard>)
                }
            </div>
        </div>
    );
};

export default Media;