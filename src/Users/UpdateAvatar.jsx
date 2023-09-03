import PropTypes from "prop-types";
import { useState } from "react";
import { apiUpdateAvatar } from "../../API/profile";
import ImagePicker from "../shared/ImagePicker";
import css from "./styles/UpdateAvatar.module.css";

function UpdateAvatar({ onSuccess }) {
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const res = await apiUpdateAvatar(avatar);
        setLoading(false);

        if (res.status === 200) {
            setAvatar(null);
            onSuccess();
        } else {
            setError(res.data.error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={css["image-picker-wrapper"]}>
                <ImagePicker setImage={setAvatar} />
            </div>
            {error && <div className={css.error}>{error}</div>}
            <button className={css.submit} type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Avatar"}
            </button>
        </form>
    );
}

UpdateAvatar.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};

export default UpdateAvatar;
