import PropTypes from "prop-types";
import { useState } from "react";
import { apiCreatePostComment } from "../../helpers/API";

function CommentForm({ postId, addComment }) {
    const [text, setText] = useState("");
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const res = await apiCreatePostComment(postId, text);
        setLoading(false);

        if (res.status === 200) {
            addComment(res.data.comment);
            setText("");
        } else {
            setErrors(res.data.errors);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="text">Comment</label>
                <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            {errors.map((error) => (
                <div key={error.msg}>{error.msg}</div>
            ))}
            <button disabled={loading} type="submit">
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
};

export default CommentForm;
