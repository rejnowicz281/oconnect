import { useEffect, useState } from "react";
import { apiCreateInvite, apiDeleteInvite, apiFetchUsers } from "../../helpers/API";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import UserBox from "./UserBox";

function Users() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await apiFetchUsers();

            if (res.status === 200) {
                console.log(res.data.users);
                setUsers(res.data.users);
            }
        };

        fetchUsers();

        return () => {
            setUsers(null);
        };
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

    if (!users) return <PageLoading />;

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <UserBox user={user} />
                        {user.invite_id ? (
                            <AsyncButton
                                text="Cancel Invite"
                                loadingText="Cancelling Invite..."
                                mainAction={() => handleCancelInvite(user._id, user.invite_id)}
                            />
                        ) : (
                            <AsyncButton
                                text="Send Invite"
                                loadingText="Sending Invite..."
                                mainAction={() => handleSendInvite(user._id)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
