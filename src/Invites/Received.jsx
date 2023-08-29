import { useEffect, useState } from "react";
import { apiCreateFriendship, apiDeleteInvite, apiFetchInvitesReceived } from "../../helpers/API";
import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import css from "./Received.module.css";

function Received() {
    const [invites, setInvites] = useState(null);

    useEffect(() => {
        const fetchInvites = async () => {
            const res = await apiFetchInvitesReceived();

            if (res.status === 200) {
                console.log(res.data);
                setInvites(res.data.invitesReceived);
            }
        };

        fetchInvites();

        return () => {
            setInvites(null);
        };
    }, []);

    async function deleteInvite(inviteId) {
        setInvites((invites) => {
            const newInvites = [...invites];
            const inviteIndex = newInvites.findIndex((invite) => invite._id === inviteId);
            newInvites.splice(inviteIndex, 1);
            return newInvites;
        });
    }

    async function handleDeclineInvite(inviteId) {
        const res = await apiDeleteInvite(inviteId);

        if (res.status === 200) deleteInvite(inviteId);
    }

    async function handleAcceptInvite(inviteId) {
        const res = await apiCreateFriendship(inviteId);

        if (res.status === 201) deleteInvite(inviteId);
    }

    if (!invites) return <PageLoading />;

    if (invites.length === 0) return <div className={css["no-invites"]}>No one has invited you.</div>;

    return (
        <div>
            {invites.map((invite) => (
                <div className={css["user-box"]} key={invite._id}>
                    <UserBox user={invite.inviter} />
                    <AsyncButton
                        mainAction={() => handleDeclineInvite(invite._id)}
                        text="Decline Invite"
                        loadingText="Declining Invite..."
                    />

                    <AsyncButton
                        mainAction={() => handleAcceptInvite(invite._id)}
                        text="Accept Invite"
                        loadingText="Accepting Invite..."
                    />
                </div>
            ))}
        </div>
    );
}

export default Received;
