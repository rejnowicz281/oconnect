import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function AsyncButton({ mainAction, text, loadingText }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setLoading(false);
        };
    }, []);

    async function handleMainAction() {
        setLoading(true);
        await mainAction();
        setLoading(false);
    }

    return (
        <button onClick={handleMainAction} disabled={loading}>
            {loading ? loadingText : text}
        </button>
    );
}

AsyncButton.propTypes = {
    mainAction: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    loadingText: PropTypes.string.isRequired,
};

export default AsyncButton;
