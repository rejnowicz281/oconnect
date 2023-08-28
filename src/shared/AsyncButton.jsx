import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function AsyncButton({ className, mainAction, text, loadingText, type = "button" }) {
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
        <button className={className} type={type} onClick={handleMainAction} disabled={loading}>
            {loading ? loadingText : text}
        </button>
    );
}

AsyncButton.propTypes = {
    className: PropTypes.string,
    mainAction: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    loadingText: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default AsyncButton;
