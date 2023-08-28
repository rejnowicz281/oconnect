import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./styles/ImagePicker.module.css";

function ImagePicker({ setImage, id }) {
    const [imageIsSet, setImageIsSet] = useState(false);

    function handleImageChange(e) {
        setImage(e.target.files[0]);
        setImageIsSet(true);
    }

    function handleCancelImage() {
        setImage(null);
        setImageIsSet(false);
        document.getElementById(id).value = "";
    }

    return (
        <div className={styles.container}>
            <input className={styles.input} type="file" id={id} onChange={handleImageChange} />
            {imageIsSet && (
                <button className={styles.cancel} type="button" onClick={handleCancelImage}>
                    ☓
                </button>
            )}
        </div>
    );
}

ImagePicker.propTypes = {
    id: PropTypes.string.isRequired,
    setImage: PropTypes.func.isRequired,
};

export default ImagePicker;
