import { useState } from "react";
import { Link } from "react-router-dom";
import { apiRegister } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";
import { useAuthStore } from "../store";

function Register() {
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await apiRegister(email, firstName, lastName, password, passwordConfirm, avatar);

        if (res.status == 200) {
            await login(res.data.access_token);
        } else {
            setErrors(res.data.errors);
        }
    };

    return (
        <div className="auth-box">
            {errors.map((error) => (
                <div key={error.msg}>{error.msg}</div>
            ))}
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
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        placeholder="Confirm your password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="avatar">Avatar</label>
                    <ImagePicker id="avatar" setImage={setAvatar} />
                </div>
                <button className="register-button" type="submit">
                    Register
                </button>
            </form>
            <div className="auth-link-box">
                <Link className="auth-link" to="/login">
                    Login <div className="auth-link-arrow">→</div>
                </Link>
            </div>
        </div>
    );
}

export default Register;
