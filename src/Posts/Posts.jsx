import { useEffect, useState } from "react";
import { apiFetchPosts } from "../../helpers/API";
import AddPostForm from "./AddPostForm";
import Post from "./Post";

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

    function deletePost(postId) {
        setPosts((posts) => posts.filter((post) => post._id !== postId));
    }

    if (!posts) return <div>Loading...</div>;

    return (
        <div>
            <AddPostForm addPost={addPost} />
            {console.log(posts)}
            {posts && posts.map((post) => <Post deletePost={deletePost} key={post._id} initialPost={post} />)}
        </div>
    );
}

export default Posts;
