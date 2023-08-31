import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFillHeartFill, BsHeartbreakFill } from "react-icons/bs";
import { apiDeletePost, apiLikePost } from "../../helpers/API";
import formatDate from "../../helpers/formatDate";
import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import { useAuthStore } from "../store";
import Comments from "./Comments";
import EditPostModal from "./EditPostModal";
import css from "./styles/Post.module.css";

function Post({ initialPost, deletePost }) {
    const currentUser = useAuthStore((state) => state.currentUser);

    const [post, setPost] = useState(initialPost);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isPostOwner, setIsPostOwner] = useState(false);

    useEffect(() => {
        if (post.user._id === currentUser._id) setIsPostOwner(true);
    }, []);

    useEffect(() => {
        if (post.likes.includes(currentUser._id)) setLiked(true);
        else setLiked(false);
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
        <div className={css.container}>
            <div className={css.top}>
                <div className={css["top-left"]}>
                    <UserBox user={post.user} />
                </div>
                {isPostOwner && (
                    <div className={css["top-right"]}>
                        <AsyncButton
                            className={css.delete}
                            mainAction={handleDelete}
                            content="Delete"
                            loadingContent="Deleting..."
                        />
                        <EditPostModal buttonClassName={css.edit} post={post} setPost={setPost} />
                    </div>
                )}
            </div>
            <div className={css.date}>{formatDate(post.createdAt)}</div>
            <div className={css.content}>
                <p className={css.text}>{post.text}</p>
                {post.photo && <img className={css.photo} src={post.photo.url} />}
            </div>
            <div className={css["like-container"]}>
                <AsyncButton
                    className={css.like}
                    mainAction={handleLike}
                    content={liked ? <BsHeartbreakFill /> : <BsFillHeartFill />}
                    loadingContent={<AiOutlineLoading className="spin" />}
                />
                {post.likes.length == 0
                    ? "This post has no likes."
                    : post.likes.length == 1 && liked
                    ? "1 person likes this post. (You)"
                    : post.likes.length == 1
                    ? "1 person likes this post."
                    : liked
                    ? `${post.likes.length} people like this post, you included.`
                    : `${post.likes.length} people like this post.`}
            </div>
            <button className={css["comments-button"]} onClick={toggleComments} type="button">
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
