import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { imageSlice } from "./features/api/imageSlice";
import { teachersSlice } from "./features/api/teachersSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [imageSlice.reducerPath]: imageSlice.reducer,
        [teachersSlice.reducerPath]: teachersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, imageSlice.middleware, teachersSlice.middleware),
});