import PropTypes from "prop-types";
import { useState } from "react";
import { apiCreatePostComment } from "../../helpers/API";

function CommentForm({ postId, addComment }) {
    const [text, setText] = useState("");
    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await apiCreatePostComment(postId, text);

        if (res.status === 200) {
            addComment(res.data.comment);
            setText("");
        } else {
            setErrors(res.data.errors);
        }
    }

    return (
        <form>
            <div>
                <label htmlFor="text">Comment</label>
                <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            {errors.map((error) => (
                <div key={error.msg}>{error.msg}</div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
};

export default CommentForm;
