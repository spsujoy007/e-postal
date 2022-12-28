import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Media = () => {
    const {data: posts = []} = useQuery({
        queryKey: ['posts'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/posts`);
            const data = await res.json();
            return data
        }
    })
    return (
        <div>
            <h2>Media section {posts.length}</h2>
        </div>
    );
};

export default Media;