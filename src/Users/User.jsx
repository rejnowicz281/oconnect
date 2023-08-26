import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetchUser } from "../../helpers/API";
import Post from "../Posts/Post";
import PostForm from "../Posts/PostForm";
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

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>
                {user.first_name} {user.last_name}
            </h1>
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
