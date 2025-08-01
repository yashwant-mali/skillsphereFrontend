// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//localhost url
//'http://localhost:3001'


export const apiSlice = createApi({
    reducerPath: 'api',
    // after backend deployment we are using this forllowing base URL
    baseQuery: fetchBaseQuery({ baseUrl: 'https://skillspherebackend.onrender.com' }),

    endpoints: (builder) => ({
        getRegisteredUsers: builder.query({
            query: () => '/register',
        }),
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),
    }),
});

export const {
    useGetRegisteredUsersQuery,
    useRegisterUserMutation,
} = apiSlice;
