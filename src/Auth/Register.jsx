import { useState } from "react";
import { Link } from "react-router-dom";
import { apiRegister } from "../../helpers/API";
import ImagePicker from "../shared/ImagePicker";
import { useAuthStore } from "../store";
import cssAuth from "./styles/Auth.module.css";
import cssRegister from "./styles/Register.module.css";

function Register() {
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await apiRegister(email, firstName, lastName, password, passwordConfirm, avatar);
        setLoading(false);

        if (res.status == 200) {
            login(res.data.access_token);
        } else {
            setErrors(res.data.errors);
        }
    };

    return (
        <div className={cssAuth.wrapper}>
            <div className={cssAuth.container}>
                <h1 className={cssAuth.heading}>Register</h1>
                {errors.length !== 0 && (
                    <div className={cssRegister.errors}>
                        {errors.map((error) => (
                            <li key={error.msg} className={cssRegister.error}>
                                {error.msg}
                            </li>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={cssAuth["form-field"]}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={cssRegister["double-form-field"]}>
                        <div className={cssAuth["form-field"]}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className={cssAuth["form-field"]}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cssRegister["double-form-field"]}>
                        <div className={cssAuth["form-field"]}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cssAuth["form-field"]}>
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                placeholder="Confirm your password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cssAuth["form-field"]}>
                        <label htmlFor="avatar">Avatar (optional)</label>
                        <ImagePicker id="avatar" setImage={setAvatar} />
                    </div>
                    <button className={cssAuth.continue} type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Continue"}
                    </button>
                </form>
                <div className={cssAuth["auth-link-container"]}>
                    Already have an account?{" "}
                    <Link className="auth-link" to="/login">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
