import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetchUser } from "../../helpers/API";

function User() {
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
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>
                {user.first_name} {user.last_name}
            </h1>
            <h2>Friends</h2>
            <ul>
                {user.friends.map((friend) => (
                    <li key={friend.id}>
                        <Link to={"/users/" + friend._id}>
                            {friend.first_name} {friend.last_name}
                        </Link>
                    </li>
                ))}
            </ul>

            <h2>Posts</h2>
            {user.posts.map((post) => (
                <div key={post.id}>
                    <p>{post.text}</p>
                    <p>{post.likes.length}</p>
                </div>
            ))}
        </div>
    );
}

export default User;
