import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDeleteFriendship, apiFetchFriends } from "../../helpers/API";
import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import css from "./Friends.module.css";

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

    if (!friends) return <PageLoading />;

    if (friends.length === 0) return <div className={css["no-friends"]}>No friends.</div>;

    return (
        <div>
            {friends.map((friend) => (
                <div className={css["user-box"]} key={friend.info._id}>
                    <UserBox user={friend.info} />
                    <AsyncButton
                        mainAction={() => handleUnfriend(friend)}
                        text="Unfriend"
                        loadingText="Unfriending..."
                    />
                    <div>
                        <Link className={css.chat} to={"/chats/" + friend.chat_id}>
                            Chat
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Friends;
