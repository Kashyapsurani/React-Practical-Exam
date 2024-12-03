import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost } from '../redux/actions';

const PostDetails = () => {
    const { id } = useParams();
    const post = useSelector((state) => state.posts.find((p) => p.id === parseInt(id)));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deletePost(post.id));
        navigate('/');
    };

    if (!post) return <p>Post not found!</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} className="img-fluid" />
            <p>{post.description}</p>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Post</button>
        </div>
    );
};

export default PostDetails;
