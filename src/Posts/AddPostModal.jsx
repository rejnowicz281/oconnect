import PropTypes from "prop-types";
import { useState } from "react";
import { apiCreatePost } from "../../helpers/API";
import Modal from "../shared/Modal";
import PostForm from "./PostForm";
import cssModal from "./styles/AddPostModal.module.css";

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
                    <PostForm
                        handleSubmit={handleSubmit}
                        text={text}
                        setText={setText}
                        setPhoto={setPhoto}
                        errors={errors}
                        loading={loading}
                        submitText="Post"
                        submittingText="Posting..."
                    />
                </Modal>
            )}
        </>
    );
}

AddPostModal.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default AddPostModal;
