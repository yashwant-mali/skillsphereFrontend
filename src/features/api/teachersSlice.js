// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//localhost url
//'http://localhost:3001'
// 'https://skillspherebackend.onrender.com'

export const teachersSlice = createApi({
    reducerPath: 'teachers',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://skillspherebackend.onrender.com' }),
    endpoints: (builder) => ({
        getTeachers: builder.query({
            query: () => '/teachers',
        }),
        createTeacher: builder.mutation({
            query: (newTeacher) => ({
                url: '/teachers',
                method: 'POST',
                body: newTeacher,
            }),
        }),
    }),
});

export const {
    useGetTeachersQuery,
    useCreateTeacherMutation,
} = teachersSlice;