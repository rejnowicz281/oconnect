import PropTypes from "prop-types";
import css from "./styles/Modal.module.css";

function Modal({ closeModal, children }) {
    return (
        <>
            <div onClick={closeModal} className={css.overlay}></div>
            <div className={css.body}>{children}</div>
        </>
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
