import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDeleteFriendship, apiFetchFriends } from "../../helpers/API";
import { useAuthStore } from "../store";

function Friends() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const res = await apiFetchFriends();

            if (res.status === 200) {
                console.log(res.data);
                setFriends(res.data.friends);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div>
            <h1>Friends</h1>
            <h2>
                {currentUser.first_name} {currentUser.last_name}
            </h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.info._id}>
                        <Link to={"/chat/" + friend.chat_id}>Chat</Link> | {friend.info.first_name}{" "}
                        {friend.info.last_name}
                        <button onClick={async () => await apiDeleteFriendship(friend.friendship_id)} type="button">
                            Unfriend
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;
