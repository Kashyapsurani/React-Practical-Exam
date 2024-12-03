import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../redux/postsSlice"; // Import updatePost here
import { useNavigate, useParams } from "react-router-dom";

const PostForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode, get the id from URL params

    const post = useSelector((state) =>
        state.posts.posts.find((post) => post.id === id)
    ); // Find the post being edited from the state

    // Pre-fill form if editing
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setDescription(post.description);
            setImage(post.image); // Or use the image URL to display the current image
            setIsEditing(true);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, description, image: image ? URL.createObjectURL(image) : null };

        if (isEditing) {
            // Dispatch updatePost if we are editing an existing post
            dispatch(updatePost({ ...newPost, id }));
        } else {
            // Dispatch addPost if it's a new post
            dispatch(addPost(newPost));
        }
        setTitle("");
        setDescription("");
        setImage(null);
        navigate("/");
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container">
            <h2>{isEditing ? "Edit Post" : "Add Post"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {isEditing ? "Update Post" : "Add Post"}
                </button>
            </form>
        </div>
    );
};

export default PostForm;
