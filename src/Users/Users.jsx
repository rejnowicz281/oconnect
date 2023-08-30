import { useEffect, useState } from "react";
import { apiCreateInvite, apiDeleteInvite, apiFetchUsers } from "../../helpers/API";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import UserBox from "./UserBox";
import css from "./styles/Users.module.css";

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

    if (users.length === 0) return <div className={css["no-users"]}>There are no users you can invite.</div>;

    return (
        <div className={css.container}>
            {users.map((user) => (
                <div className={css["user-box"]} key={user._id}>
                    <UserBox user={user} />
                    {user.invite_id ? (
                        <AsyncButton
                            content="Cancel Invite"
                            loadingContent="Cancelling Invite..."
                            mainAction={() => handleCancelInvite(user._id, user.invite_id)}
                        />
                    ) : (
                        <AsyncButton
                            content="Send Invite"
                            loadingContent="Sending Invite..."
                            mainAction={() => handleSendInvite(user._id)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Users;
