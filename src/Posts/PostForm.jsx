import PropTypes from "prop-types";
import { useState } from "react";
import { apiCreatePost } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";

function PostForm({ addPost }) {
    const [text, setText] = useState("");
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await apiCreatePost(text, photo);

        if (res.status === 201) {
            addPost(res.data.post);
            setText("");
            setPhoto(null);
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
                <input
                    type="text"
                    value={text}
                    placeholder="What's on your mind?"
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="photo">Attach a photo</label>
                <ImagePicker id="photo" setImage={setPhoto} />
            </div>
            <button type="submit">Post</button>
        </form>
    );
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default PostForm;
