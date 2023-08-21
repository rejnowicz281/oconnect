import { useEffect, useState } from "react";
import { apiCreateInvite, apiFetchUsers } from "../../helpers/API";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await apiFetchUsers();

            if (res.status === 200) {
                console.log(res.data);
                setUsers(res.data.users);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.first_name} {user.last_name}
                        <button onClick={async () => await apiCreateInvite(user._id)}>Send Invite</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
