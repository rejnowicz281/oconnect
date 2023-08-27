import PropTypes from "prop-types";
import { useState } from "react";
import { apiUpdateAvatar } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";

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
            <label htmlFor="avatar">Update Avatar</label>
            <ImagePicker id="avatar" setImage={setAvatar} />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
            </button>
        </form>
    );
}

UpdateAvatar.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};

export default UpdateAvatar;
