import { useEffect, useState } from "react";
import { apiCreateInvite, apiDeleteInvite, apiFetchUsers } from "../../helpers/API";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await apiFetchUsers();

            if (res.status === 200) {
                console.log(res.data.users);
                setUsers(res.data.users);
            }
        };

        fetchUsers();
    }, []);

    async function setInviteId(userId, inviteId) {
        setUsers((users) => {
            const newUsers = [...users];
            const userIndex = newUsers.findIndex((user) => user._id === userId);
            newUsers[userIndex].invite_id = inviteId;
            return newUsers;
        });
    }

    async function handleSendInvite(userId) {
        const res = await apiCreateInvite(userId);

        if (res.status === 201) setInviteId(userId, res.data.invite._id);
    }

    async function handleCancelInvite(userId, inviteId) {
        const res = await apiDeleteInvite(inviteId);

        if (res.status === 200) setInviteId(userId, null);
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.first_name} {user.last_name}
                        {user.invite_id ? (
                            <button onClick={() => handleCancelInvite(user._id, user.invite_id)}>Cancel Invite</button>
                        ) : (
                            <button onClick={() => handleSendInvite(user._id)}>Send Invite</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
