import PropTypes from "prop-types";
import ImagePicker from "../shared/ImagePicker";
import css from "./styles/PostForm.module.css";

function PostForm({ handleSubmit, text, setText, setPhoto, errors, loading, submitText, submittingText }) {
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                type="text"
                className={css.textarea}
                value={text}
                placeholder="What's on your mind?"
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <label className={css["photo-label"]} htmlFor="photo">
                Attach a photo
            </label>
            <ImagePicker id="photo" setImage={setPhoto} />

            {errors.map((error) => (
                <div className={css.error} key={error.msg}>
                    {error.msg}
                </div>
            ))}
            <button className={css.submit} disabled={loading} type="submit">
                {loading ? submittingText : submitText}
            </button>
        </form>
    );
}

PostForm.propTypes = {
    submitText: PropTypes.string.isRequired,
    submittingText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
    setPhoto: PropTypes.func.isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default PostForm;
