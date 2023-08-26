import { useEffect, useState } from "react";
import { apiCreateFriendship, apiDeleteInvite, apiFetchInvitesReceived } from "../../helpers/API";
import UserBox from "../Users/UserBox";

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

    if (!invites) return <div>Loading...</div>;

    return (
        <div>
            <h1>Received Invites</h1>
            <ul>
                {invites.map((invite) => (
                    <li key={invite._id}>
                        <UserBox user={invite.inviter} />
                        <button onClick={() => handleDeclineInvite(invite._id)} type="button">
                            Decline Invite
                        </button>
                        <button onClick={async () => handleAcceptInvite(invite._id)} type="button">
                            Accept Invite
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Received;
