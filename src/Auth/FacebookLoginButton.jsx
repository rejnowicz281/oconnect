import FacebookLogin from "@greatsumini/react-facebook-login";
import PropTypes from "prop-types";
import { useState } from "react";
import css from "./styles/FacebookLoginButton.module.css";

function FacebookLoginButton({ onSuccess }) {
    const [loading, setLoading] = useState(false);

    return (
        <FacebookLogin
            appId="1698868573947034"
            autoLoad={false}
            initParams={{
                version: "v17.0",
            }}
            fields="name,picture"
            onFail={() => setLoading(false)}
            onSuccess={() => {
                onSuccess();
                setLoading(false);
            }}
            render={({ onClick }) => (
                <button
                    disabled={loading}
                    onClick={() => {
                        setLoading(true);
                        onClick();
                    }}
                    className={css["button"]}
                >
                    {loading ? "Logging in..." : "Login with Facebook"}
                </button>
            )}
        />
    );
}

FacebookLoginButton.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};

export default FacebookLoginButton;
