import { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store";
import css from "./styles/Navbar.module.css";

function Navbar() {
    const logout = useAuthStore((state) => state.logout);
    const currentUser = useAuthStore((state) => state.currentUser);
    const [navbarOpen, setNavbarOpen] = useState(false);

    function toggleNavbar() {
        setNavbarOpen(!navbarOpen);
    }

    return (
        <>
            <button title="Navbar" className={css.toggle} onClick={toggleNavbar}>
                <HiMiniBars3BottomLeft />
            </button>
            <nav className={`${css.nav} ${navbarOpen ? css.open : ""}`}>
                <button title="Log Out" className={css.logout} onClick={logout}>
                    <RiLogoutBoxRLine />
                </button>
                <ul className={css.list}>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? css.active : "")}
                            onClick={toggleNavbar}
                            to="/home"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? css.active : "")}
                            onClick={toggleNavbar}
                            to={"/users/" + currentUser._id}
                            end
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? css.active : "")}
                            onClick={toggleNavbar}
                            to="/invites/received"
                        >
                            Received Invites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? css.active : "")}
                            onClick={toggleNavbar}
                            to="/friends"
                        >
                            Friends
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? css.active : "")}
                            onClick={toggleNavbar}
                            to="/users"
                            end
                        >
                            Users
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
