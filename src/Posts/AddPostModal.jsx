import PropTypes from "prop-types";
import { useState } from "react";
import { apiCreatePost } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";
import Modal from "../shared/Modal";
import cssModal from "./styles/AddPostModal.module.css";
import cssForm from "./styles/PostForm.module.css";

function AddPostModal({ addPost }) {
    const [text, setText] = useState("");
    const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const res = await apiCreatePost(text, photo);
        setLoading(false);

        if (res.status === 201) {
            addPost(res.data.post);
            setShowModal(false);
            setText("");
            setPhoto(null);
        } else {
            setErrors(res.data.errors);
        }
    }

    return (
        <>
            <button className={cssModal["show-modal"]} type="button" onClick={() => setShowModal(true)}>
                What's on your mind?
            </button>
            {showModal && (
                <Modal
                    closeModal={() => {
                        setErrors([]);
                        setText("");
                        setPhoto(null);
                        setShowModal(false);
                    }}
                >
                    <form onSubmit={handleSubmit}>
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
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
}

AddPostModal.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default AddPostModal;
