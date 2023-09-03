import PropTypes from "prop-types";
import { useState } from "react";
import { apiUpdatePost } from "../../API/posts";
import { postType } from "../propTypes";
import Modal from "../shared/Modal";
import PostForm from "./PostForm";

function EditPostModal({ buttonClassName, post, setPost }) {
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
            setShowModal(false);
            setPost(res.data.post);
        } else {
            setErrors(res.data.errors);
        }
    }

    return (
        <>
            <button className={buttonClassName} type="button" onClick={() => setShowModal(true)}>
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
                    <PostForm
                        handleSubmit={handleSubmit}
                        text={text}
                        setText={setText}
                        setPhoto={setPhoto}
                        errors={errors}
                        loading={loading}
                        submitText="Update"
                        submittingText="Updating..."
                    />
                </Modal>
            )}
        </>
    );
}

EditPostModal.propTypes = {
    buttonClassName: PropTypes.string.isRequired,
    post: postType.isRequired,
    setPost: PropTypes.func.isRequired,
};

export default EditPostModal;
