import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDeleteFriendship, apiFetchFriends } from "../../helpers/API";
import UserBox from "../Users/UserBox";
import { useAuthStore } from "../store";

function Friends() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            const res = await apiFetchFriends();

            if (res.status === 200) {
                console.log(res.data);
                setFriends(res.data.friends);
            }
        };

        fetchFriends();

        return () => {
            setFriends(null);
        };
    }, []);

    if (!friends) return <div>Loading...</div>;

    return (
        <div>
            <h1>Friends</h1>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.info._id}>
                        <UserBox user={friend.info} />
                        <Link to={"/chats/" + friend.chat_id}>Chat</Link>
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
