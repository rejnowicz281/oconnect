import { useState } from "react";
import { Link } from "react-router-dom";
import { apiDemoLogin, apiLogin } from "../../helpers/API";
import { useAuthStore } from "../store";

function Login() {
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [persist, setPersist] = useState(true);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await apiLogin(email, password);

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
                <button className="login-button" type="submit">
                    Log In
                </button>
            </form>
            <button onClick={handleDemoLogin} type="button">
                Demo Login
            </button>
            <div className="auth-link-box">
                <Link to="/register" className="auth-link">
                    Register <span className="auth-link-arrow">→</span>
                </Link>
            </div>
        </div>
    );
}

export default Login;
