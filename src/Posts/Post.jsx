import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { apiDeletePost, apiLikePost } from "../../helpers/API";
import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import { useAuthStore } from "../store";
import Comments from "./Comments";

function Post({ initialPost, deletePost }) {
    const currentUser = useAuthStore((state) => state.currentUser);

    const [post, setPost] = useState(initialPost);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isPostOwner, setIsPostOwner] = useState(false);

    useEffect(() => {
        if (post.user._id === currentUser._id) setIsPostOwner(true);

        return () => {
            setIsPostOwner(false);
            setLiked(false);
            setShowComments(false);
        };
    }, []);

    useEffect(() => {
        if (post.likes.includes(currentUser._id)) setLiked(true);
        else setLiked(false);

        return () => {
            setLiked(false);
        };
    }, [post.likes]);

    async function handleLike() {
        const res = await apiLikePost(post._id);

        if (res.status === 200) {
            if (post.likes.includes(currentUser._id)) removeLike();
            else addLike();
        }
    }

    async function handleDelete() {
        const res = await apiDeletePost(post._id);

        if (res.status === 200) {
            deletePost(post._id);
        }
    }

    async function toggleComments() {
        setShowComments((showComments) => !showComments);
    }

    function addLike() {
        setPost({ ...post, likes: [...post.likes, currentUser._id] });
    }

    function removeLike() {
        setPost({
            ...post,
            likes: post.likes.filter((like) => like !== currentUser._id),
        });
    }

    return (
        <div>
            <UserBox user={post.user} />
            <h3>{post.text}</h3>
            {isPostOwner && <AsyncButton mainAction={handleDelete} text="Delete" loadingText="Deleting..." />}
            {post.photo && <img height="300" width="300" src={post.photo.url} />}
            <div>{post.likes.length} Likes</div>
            <div>{post.createdAt}</div>
            <AsyncButton
                mainAction={handleLike}
                text={liked ? "Unlike" : "Like"}
                loadingText={liked ? "Unliking..." : "Liking..."}
            />
            <button onClick={toggleComments} type="button">
                Comments
            </button>
            {showComments && <Comments isPostOwner={isPostOwner} postId={post._id} />}
        </div>
    );
}

Post.propTypes = {
    deletePost: PropTypes.func.isRequired,
    initialPost: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        photo: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }),
        likes: PropTypes.arrayOf(PropTypes.string).isRequired,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
            avatar: PropTypes.shape({
                url: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }).isRequired,
};

export default Post;
