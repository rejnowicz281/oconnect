import { useEffect, useState } from "react";
import { apiFetchPosts } from "../../helpers/API";

function Posts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            const res = await apiFetchPosts();
            setPosts(res.data.posts);
        }
        fetchPosts();
    }, []);

    if (!posts) return <div>Loading...</div>;

    return (
        <div>
            {posts &&
                posts.map((post) => (
                    <div key={post._id}>
                        <h3>{post.text}</h3>
                        <p>
                            {post.user.first_name} {post.user.last_name}
                        </p>
                        <div>{post.likes.length} Likes</div>
                        <div>{post.createdAt}</div>
                    </div>
                ))}
        </div>
    );
}

export default Posts;
