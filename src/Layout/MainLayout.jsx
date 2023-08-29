import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import css from "./styles/MainLayout.module.css";

function MainLayout() {
    return (
        <>
            <Navbar />
            <div className={css.container}>
                <Outlet />
            </div>
        </>
    );
}

export default MainLayout;
