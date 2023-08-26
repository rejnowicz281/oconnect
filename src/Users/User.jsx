import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    apiCreateFriendship,
    apiCreateInvite,
    apiDeleteFriendship,
    apiDeleteInvite,
    apiFetchUser,
} from "../../helpers/API";
import Post from "../Posts/Post";
import PostForm from "../Posts/PostForm";
import AsyncButton from "../shared/AsyncButton";
import { useAuthStore } from "../store";
import UserBox from "./UserBox";

function User() {
    const currentUser = useAuthStore((state) => state.currentUser);

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await apiFetchUser(id);

            if (response.status === 200) {
                setUser(response.data.user);
            }
        };

        fetchUser();

        return () => {
            setUser(null);
        };
    }, [id]);

    function addPost(post) {
        setUser((user) => ({ ...user, posts: [post, ...user.posts] }));
    }

    function deletePost(postId) {
        setUser((user) => ({ ...user, posts: user.posts.filter((post) => post._id !== postId) }));
    }

    async function handleAcceptInvite() {
        const res = await apiCreateFriendship(user.invite_id);

        if (res.status === 201) {
            setInvitedMe(false);
            setInviteId(null);
            addFriend(currentUser);
            setFriendshipId(res.data.friendship._id);
            setChatId(res.data.friendship.chat);
        }
    }

    async function handleCancelInvite() {
        const res = await apiDeleteInvite(user.invite_id);

        if (res.status === 200) {
            setIsInvited(false);
            setInviteId(null);
        }
    }

    async function handleInvite() {
        const res = await apiCreateInvite(user._id);

        if (res.status === 201) {
            setIsInvited(true);
            setInviteId(res.data.invite._id);
        }
    }

    async function handleUnfriend() {
        const res = await apiDeleteFriendship(user.friendship_id);

        if (res.status === 200) {
            setFriendshipId(null);
            setChatId(null);
            removeFriend(currentUser._id);
        }
    }

    function addFriend(friend) {
        setUser((user) => ({ ...user, friends: [friend, ...user.friends] }));
    }

    function removeFriend(friendId) {
        setUser((user) => ({ ...user, friends: user.friends.filter((friend) => friend._id !== friendId) }));
    }

    function setInvitedMe(invitedMe) {
        setUser((user) => ({ ...user, invited_me: !!invitedMe }));
    }

    function setIsInvited(isInvited) {
        setUser((user) => ({ ...user, is_invited: !!isInvited }));
    }

    function setFriendshipId(friendshipId) {
        setUser((user) => ({ ...user, friendship_id: friendshipId }));
    }

    function setChatId(chatId) {
        setUser((user) => ({ ...user, chat_id: chatId }));
    }

    function setInviteId(inviteId) {
        setUser((user) => ({ ...user, invite_id: inviteId }));
    }

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>
                {user.first_name} {user.last_name}
            </h1>
            {user.invited_me ? (
                <div>
                    <h2>Invited me</h2>
                    <AsyncButton
                        text="Accept invite"
                        loadingText="Accepting invite..."
                        mainAction={handleAcceptInvite}
                    />
                </div>
            ) : user.is_invited ? (
                <div>
                    <h2>Is invited by me</h2>
                    <AsyncButton
                        text="Cancel invite"
                        loadingText="Canceling invite..."
                        mainAction={handleCancelInvite}
                    />
                </div>
            ) : user.friendship_id ? (
                <div>
                    <h2>I am friends with him</h2>
                    <AsyncButton text="Unfriend" loadingText="Unfriending..." mainAction={handleUnfriend} />
                </div>
            ) : user.chat_id ? (
                <div>
                    <h2>I can chat with him</h2>
                    <Link to={`/chats/${user.chat_id}`}>Chat</Link>
                </div>
            ) : (
                <div>
                    <h2>Not friends</h2>
                    <AsyncButton text="Invite" loadingText="Inviting..." mainAction={handleInvite} />
                </div>
            )}
            <h2>Friends</h2>
            <ul>
                {user.friends.map((friend) => (
                    <li key={friend._id}>
                        <UserBox user={friend} />
                    </li>
                ))}
            </ul>
            <h2>Posts</h2>
            {user._id === currentUser._id && <PostForm addPost={addPost} />}
            {user.posts.map((post) => (
                <Post deletePost={deletePost} key={post._id} initialPost={post} />
            ))}
        </div>
    );
}

export default User;
