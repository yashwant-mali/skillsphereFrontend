// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teachersSlice = createApi({
    reducerPath: 'teachers',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
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