// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//localhost url
//'http://localhost:3001'


export const imageSlice = createApi({
    reducerPath: 'image',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getImages: builder.query({
            query: () => '/images',
        }),
        createSkill: builder.mutation({
            query: (newImage) => ({
                url: '/images',
                method: 'POST',
                body: newImage,
            }),
        }),
    }),
});

export const {
    useGetImagesQuery,
    useCreateSkillMutation,
} = imageSlice;
