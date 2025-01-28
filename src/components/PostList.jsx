import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../redux/postsSlice";
import { Link } from "react-router-dom";
import apple from './Screenshot 2025-01-28 at 9.56.22 AM.png'
import smooth from './Screenshot 2025-01-28 at 9.59.28 AM.png'
import jiocinema from './Screenshot 2025-01-28 at 10.02.00 AM.png'
import "./PostList.css";

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deletePost(id));
    };

    // Default posts
    const defaultPosts = [
        { id: "Projeact", title: "Apple clone", description: "This is my Apple Clone Make With Html Css", image: apple },
        { id: "Projeact", title: "smoothie", description: "This is smoothie projeact ", image: smooth },
        { id: "Projeact", title: "Jio-Cinema", description: "This Is My Jio-Cinema Clone Projeact Make with html css js jqurey", image: jiocinema },
    ];

    // Combine default posts and fetched/added posts
    const combinedPosts = [...defaultPosts, ...posts];

    return (
        <div className="post-list-container">
            <Link to="/add" className="btn btn-primary mb-3">Add New Post</Link>
            {status === "loading" && <p>Loading posts...</p>}
            {status === "failed" && <p>Error: {error}</p>}

            <div className="row g-4"> {/* Bootstrap grid system */}
                {combinedPosts.map((post) => (
                    <div key={post.id} className="col-12 col-md-6 col-lg-4"> {/* Responsive column */}
                        <div className="post-card card shadow-sm h-100">
                            <div className="post-card-image">
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="post-card-img card-img-top"
                                    />
                                )}
                            </div>
                            <div className="post-card-content card-body">
                                <h5 className="post-card-title card-title">{post.title}</h5>
                                <p className="post-card-description card-text">{post.description}</p>
                                <div className="d-flex justify-content-between mb-5">
                                    {/* Only show delete and update buttons for fetched/added posts */}
                                    {!post.id.startsWith("default") && (
                                        <>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(post.id)}
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                to={`/update/${post.id}`}  // Link to update route
                                                className="btn btn-warning"
                                            >
                                                Update
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
