import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

const store = configureStore({
    reducer: {
        posts: postsReducer, // Add the posts reducer
    },
});

export default store;
