import PropTypes from "prop-types";
import { useState } from "react";
import { apiUpdatePost } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";
import Modal from "../shared/Modal";
import cssForm from "./styles/PostForm.module.css";

function EditPostModal({ editButtonClassName, post, setPost }) {
    const [text, setText] = useState(post.text);
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const res = await apiUpdatePost(post._id, text, photo);
        setLoading(false);

        if (res.status === 200) {
            setText("");
            setPhoto(null);
            setShowModal(false);
            setPost(res.data.post);
        } else {
            setErrors(res.data.errors);
        }
    }

    return (
        <>
            <button className={editButtonClassName} type="button" onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal
                    closeModal={() => {
                        setErrors([]);
                        setText(post.text);
                        setPhoto(null);
                        setShowModal(false);
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        {errors.map((error) => (
                            <div key={error.msg}>{error.msg}</div>
                        ))}
                        <textarea
                            type="text"
                            className={cssForm.textarea}
                            placeholder="What's on your mind?"
                            onChange={(e) => setText(e.target.value)}
                        >
                            {text}
                        </textarea>

                        <label className={cssForm["photo-label"]} htmlFor="photo">
                            Attach a photo
                        </label>
                        <ImagePicker id="photo" setImage={setPhoto} />

                        {errors.map((error) => (
                            <div className={cssForm.error} key={error.msg}>
                                {error.msg}
                            </div>
                        ))}
                        <button className={cssForm.submit} disabled={loading} type="submit">
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
}

EditPostModal.propTypes = {
    editButtonClassName: PropTypes.string.isRequired,
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
};

export default EditPostModal;
