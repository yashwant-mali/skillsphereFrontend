import React from 'react'
import { useGetImagesQuery } from '../../features/api/imageSlice'
import { useParams } from 'react-router-dom';
import Teacher from './Teacher';

export default function Details() {
    const { id, name } = useParams(); // get the id from URL

    const { data: images, isLoading, isError, error } = useGetImagesQuery();


    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    // Find the image by id
    const image = images?.find(img => img.Name === name);

    if (!image) return <p>Image not found</p>;

    return (
        <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>

                <h2>{image.Name}</h2>

                <img
                    src={`/images/${image.ImagePath}`}
                    alt={image.Name}
                    style={{ width: '300px', borderRadius: '12px' }}
                />

                <p>Type: {image.ImageType}</p>

            </div>
            <div>
                <Teacher name={name} />
            </div>
        </div>
    );
}


