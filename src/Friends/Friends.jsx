import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDeleteFriendship, apiFetchFriends } from "../../helpers/API";
import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";

function Friends() {
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

    async function handleUnfriend(friend) {
        const res = await apiDeleteFriendship(friend.friendship_id);

        if (res.status === 200) removeFriend(friend.info._id);
    }

    function removeFriend(friendId) {
        setFriends((friends) => friends.filter((friend) => friend.info._id !== friendId));
    }

    if (!friends) return <div>Loading...</div>;

    return (
        <div>
            <h1>Friends</h1>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.info._id}>
                        <UserBox user={friend.info} />
                        <Link to={"/chats/" + friend.chat_id}>Chat</Link>
                        <AsyncButton
                            mainAction={() => handleUnfriend(friend)}
                            text="Unfriend"
                            loadingText="Unfriending..."
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;
