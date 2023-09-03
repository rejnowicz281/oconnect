import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import { apiCreatePostComment } from "../../API/posts";
import css from "./styles/CommentForm.module.css";

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
            {errors.map((error) => (
                <div className={css.error} key={error.msg}>
                    {error.msg}
                </div>
            ))}
            <div className={css["input-box"]}>
                <input
                    placeholder="Comment about stuff!"
                    className={css.input}
                    type="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className={css.submit} disabled={loading} type="submit">
                    {loading ? <AiOutlineLoading className="spin" /> : <AiOutlineSend />}
                </button>
            </div>
        </form>
    );
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
};

export default CommentForm;
