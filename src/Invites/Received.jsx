import { useEffect, useState } from "react";
import { apiDeleteInvite, apiFetchInvitesReceived, apiCreateFriendship } from "../../helpers/API";

function Received() {
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        const fetchInvites = async () => {
            const res = await apiFetchInvitesReceived();

            if (res.status === 200) {
                console.log(res.data);
                setInvites(res.data.invitesReceived);
            }
        };

        fetchInvites();
    }, []);

    return (
        <div>
            <h1>Received Invites</h1>
            <ul>
                {invites.map((invite) => (
                    <li key={invite._id}>
                        {invite.inviter.first_name} {invite.inviter.last_name}
                        <button onClick={async () => await apiDeleteInvite(invite._id)} type="button">
                            Decline Invite
                        </button>
                        <button onClick={async () => await apiCreateFriendship(invite._id)} type="button">
                            Accept Invite
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Received;
