import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { apiDeletePostComment, apiFetchPostComments } from "../../helpers/API";
import formatDate from "../../helpers/formatDate";
import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import { useAuthStore } from "../store";
import CommentForm from "./CommentForm";
import css from "./styles/Comments.module.css";

function Comments({ postId, isPostOwner }) {
    const currentUser = useAuthStore((state) => state.currentUser);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        async function fetchComments() {
            const res = await apiFetchPostComments(postId);

            if (res.status === 200) setComments(res.data.comments);
        }
        fetchComments();

        return () => {
            setComments(null);
        };
    }, []);

    async function handleDelete(commentId) {
        const res = await apiDeletePostComment(postId, commentId);

        if (res.status === 200) removeComment(commentId);
    }

    function addComment(comment) {
        setComments((comments) => [comment, ...comments]);
    }

    function removeComment(commentId) {
        setComments((comments) => comments.filter((comment) => comment._id !== commentId));
    }

    if (!comments) return <div className={css.loading}>Loading...</div>;

    return (
        <div className={css.container}>
            <CommentForm postId={postId} addComment={addComment} />
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div className={css.comment} key={comment._id}>
                        <div className={css.top}>
                            <UserBox user={comment.user} />
                            {(comment.user._id === currentUser._id || isPostOwner) && (
                                <AsyncButton
                                    className={css.delete}
                                    mainAction={() => handleDelete(comment._id)}
                                    text="Delete"
                                    loadingText="Deleting..."
                                />
                            )}
                        </div>
                        <div className={css.date}>{formatDate(comment.createdAt)}</div>
                        <p>{comment.text}</p>
                    </div>
                ))
            ) : (
                <div className={css["no-comments"]}>No comments</div>
            )}
        </div>
    );
}

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    isPostOwner: PropTypes.bool.isRequired,
};

export default Comments;
