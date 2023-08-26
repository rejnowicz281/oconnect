import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { apiFetchPostComments } from "../../helpers/API";
import UserBox from "../Users/UserBox";

function Comments({ postId }) {
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

    if (!comments) return <div>Loading...</div>;

    return (
        <div>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id}>
                        <UserBox user={comment.user} />
                        <div>{comment.text}</div>
                        <div>{comment.createdAt}</div>
                    </div>
                ))
            ) : (
                <div>No comments</div>
            )}
        </div>
    );
}

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default Comments;
