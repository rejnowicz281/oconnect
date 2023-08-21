import { useEffect, useState } from "react";
import { apiDeleteInvite, apiFetchInvitesSent } from "../../helpers/API";

function Sent() {
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        const fetchInvites = async () => {
            const res = await apiFetchInvitesSent();

            if (res.status === 200) {
                console.log(res.data);
                setInvites(res.data.invitesSent);
            }
        };

        fetchInvites();
    }, []);

    return (
        <div>
            <h1>Sent Invites</h1>
            <ul>
                {invites.map((invite) => (
                    <li key={invite._id}>
                        {invite.invitee.first_name} {invite.invitee.last_name}
                        <button onClick={async () => await apiDeleteInvite(invite._id)} type="button">
                            Cancel Invite
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sent;
