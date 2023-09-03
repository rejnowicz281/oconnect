import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiCreateFriendship, apiDeleteFriendship } from "../../API/friendships";
import { apiCreateInvite, apiDeleteInvite } from "../../API/invites";
import { apiResetAvatar } from "../../API/profile";
import { apiFetchUser } from "../../API/users";
import AddPostModal from "../Posts/AddPostModal";
import Post from "../Posts/Post";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import { useAuthStore } from "../store";
import UpdateAvatar from "./UpdateAvatar";
import UserBox from "./UserBox";
import css from "./styles/User.module.css";

function User() {
    const currentUser = useAuthStore((state) => state.currentUser);

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser();

        return () => {
            setUser(null);
        };
    }, [id]);

    async function fetchUser(retry = 0) {
        if (retry > 10) return setUser(null);

        const res = await apiFetchUser(id);

        if (res.status === 200) setUser(res.data.user);
        else fetchUser(retry + 1);
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

    async function handleResetAvatar() {
        const res = await apiResetAvatar();

        if (res.status === 200) {
            setUser(null); // To force a re-render
            await fetchUser();
        }
    }

    function addPost(post) {
        setUser((user) => ({ ...user, posts: [post, ...user.posts] }));
    }

    function deletePost(postId) {
        setUser((user) => ({ ...user, posts: user.posts.filter((post) => post._id !== postId) }));
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

    if (!user) return <PageLoading />;

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1 className={css["user-name"]}>
                    {user.first_name} {user.last_name}
                </h1>
                <img height="200" width="200" src={user.avatar.url} alt="404" />
            </div>
            {user._id === currentUser._id ? (
                <div className={css.association}>
                    <h2 className={css["assoc-text"]}>This is me.</h2>
                    <AsyncButton
                        className={css["assoc-button"]}
                        content="Reset Avatar"
                        loadingContent="Resetting avatar..."
                        mainAction={handleResetAvatar}
                    />
                    <UpdateAvatar
                        onSuccess={async () => {
                            setUser(null); // To force a re-render
                            await fetchUser();
                        }}
                    />
                </div>
            ) : user.invited_me ? (
                <div className={css.association}>
                    <h2 className={css["assoc-text"]}>Invited me.</h2>
                    <AsyncButton
                        className={css["assoc-button"]}
                        content="Accept invite"
                        loadingContent="Accepting invite..."
                        mainAction={handleAcceptInvite}
                    />
                </div>
            ) : user.is_invited ? (
                <div className={css.association}>
                    <h2 className={css["assoc-text"]}>Is invited by me.</h2>
                    <AsyncButton
                        className={css["assoc-button"]}
                        content="Cancel invite"
                        loadingContent="Canceling invite..."
                        mainAction={handleCancelInvite}
                    />
                </div>
            ) : user.friendship_id ? (
                <div className={css.association}>
                    <h2 className={css["assoc-text"]}>I am friends with him.</h2>
                    <div>
                        <AsyncButton
                            className={css["assoc-button"]}
                            content="Unfriend"
                            loadingContent="Unfriending..."
                            mainAction={handleUnfriend}
                        />
                    </div>
                    <div>
                        <Link className={css.chat} to={`/chats/${user.chat_id}`}>
                            Send a message
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={css.association}>
                    <h2 className={css["assoc-text"]}>Not friends.</h2>
                    <AsyncButton
                        className={css["assoc-button"]}
                        content="Invite"
                        loadingContent="Inviting..."
                        mainAction={handleInvite}
                    />
                </div>
            )}
            {user.friends.length > 0 && <h2>Friends</h2>}
            {user.friends.map((friend) => (
                <div className={css.friend} key={friend._id}>
                    <UserBox user={friend} />
                </div>
            ))}
            <div className={css.feed}>
                {user._id === currentUser._id && <AddPostModal addPost={addPost} />}
                {user.posts.map((post) => (
                    <Post deletePost={deletePost} key={post._id} initialPost={post} />
                ))}
            </div>
        </div>
    );
}

export default User;
