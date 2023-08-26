import { useEffect, useState } from "react";
import { apiFetchPosts } from "../../helpers/API";
import Post from "./Post";
import PostForm from "./PostForm";

function Posts() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            const res = await apiFetchPosts();
            setPosts(res.data.posts);
        }
        fetchPosts();

        return () => {
            setPosts(null);
        };
    }, []);

    function addPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    if (!posts) return <div>Loading...</div>;

    return (
        <div>
            <PostForm addPost={addPost} />
            {posts && posts.map((post) => <Post key={post._id} initialPost={post} />)}
        </div>
    );
}

export default Posts;
