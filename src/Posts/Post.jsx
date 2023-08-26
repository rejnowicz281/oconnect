import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { apiLikePost } from "../../helpers/API";
import UserBox from "../Users/UserBox";
import { useAuthStore } from "../store";

function Post({ initialPost }) {
    const currentUser = useAuthStore((state) => state.currentUser);

    const [post, setPost] = useState(initialPost);
    const [liked, setLiked] = useState(false);

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
            {post.photo && <img height="300" width="300" src={post.photo.url} />}
            <div>{post.likes.length} Likes</div>
            <div>{post.createdAt}</div>
            <button onClick={handleLike} type="button">
                {liked ? "Unlike" : "Like"}
            </button>
        </div>
    );
}

Post.propTypes = {
    initialPost: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        photo: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }),
        likes: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
            })
        ).isRequired,
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
