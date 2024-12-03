import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// JSON server URL
const BASE_URL = "http://localhost:3000/posts";

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
});

// Async thunk to add a post
export const addPost = createAsyncThunk("posts/addPost", async (newPost, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL, newPost);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add post");
    }
});

// Async thunk to delete a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return id; // Return the id of the post deleted
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete post");
    }
});

// Async thunk to update a post
export const updatePost = createAsyncThunk("posts/updatePost", async (updatedPost, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${updatedPost.id}`, updatedPost);
        return response.data; // Return the updated post
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update post");
    }
});

// Slice definition
const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch posts";
            })

            // Add Post
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.error = action.payload || "Failed to add post";
            })

            // Delete Post
            .addCase(deletePost.pending, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.meta.arg); // Optimistic update
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                // Optional: no changes here as it's already handled optimistically
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to delete post";
            })

            // Update Post
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload; // Replace the updated post
                }
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to update post";
            });
    },
});

export default postsSlice.reducer;
