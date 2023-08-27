import PropTypes from "prop-types";
import { useState } from "react";
import { apiUpdatePost } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";

function EditPostForm({ post, setPost, setEditMode }) {
    const [text, setText] = useState(post.text);
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const res = await apiUpdatePost(post._id, text, photo);
        setLoading(false);

        if (res.status === 200) {
            setText("");
            setPhoto(null);
            setEditMode(false);
            setPost(res.data.post);
        } else {
            setErrors(res.data.errors);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((error) => (
                <div key={error.msg}>{error.msg}</div>
            ))}
            <div>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
                <label htmlFor="photo">Attach a photo</label>
                <ImagePicker id="photo" setImage={setPhoto} />
            </div>
            <button disabled={loading} type="submit">
                {loading ? "Updating..." : "Update"}
            </button>
        </form>
    );
}

EditPostForm.propTypes = {
    post: PropTypes.shape({
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
    setPost: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
};

export default EditPostForm;
