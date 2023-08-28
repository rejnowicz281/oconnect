import FacebookLogin from "@greatsumini/react-facebook-login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiDemoLogin, apiFacebookLogin, apiLogin } from "../../helpers/API";
import AsyncButton from "../shared/AsyncButton";
import { useAuthStore } from "../store";

function Login() {
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [persist, setPersist] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await apiLogin(email, password);
        setLoading(false);

        handleLoginResponse(res);
    };

    const handleDemoLogin = async () => {
        const res = await apiDemoLogin();

        handleLoginResponse(res);
    };

    function handleLoginResponse(res) {
        if (res.status == 200) {
            localStorage.setItem("persist", persist);
            login(res.data.access_token);
        } else {
            setError(res.data.message);
        }
    }

    async function handleFacebookResponse(res) {
        const loginResponse = await apiFacebookLogin(res.accessToken);

        handleLoginResponse(loginResponse);
    }

    return (
        <div className="auth-box">
            {error && <div>{error}</div>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <input
                        onChange={(e) => setPersist(e.target.checked)}
                        checked={persist}
                        type="checkbox"
                        id="remember-me"
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="login-button" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <FacebookLogin
                    appId="1698868573947034"
                    autoLoad={false}
                    initParams={{
                        version: "v17.0",
                    }}
                    fields="name,picture"
                    onSuccess={handleFacebookResponse}
                />
            </form>
            <AsyncButton text="Demo Login" loadingText="Logging in..." mainAction={handleDemoLogin} />
            <div className="auth-link-box">
                <Link to="/register" className="auth-link">
                    Register <span className="auth-link-arrow">→</span>
                </Link>
            </div>
        </div>
    );
}

export default Login;
