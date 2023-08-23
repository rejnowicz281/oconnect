import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

function MainLayout() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                    <li>
                        <NavLink to="/friends">Friends</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/invites/received">Received Invites</NavLink>
                    </li>
                    <li>
                        <NavLink to="/invites/sent">Sent Invites</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts">Posts</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default MainLayout;
