import { useEffect, useState } from "react";
import { apiFetchPosts } from "../../API/posts";
import AddPostModal from "../Posts/AddPostModal";
import Post from "../Posts/Post";
import PageLoading from "../shared/PageLoading";
import css from "./Home.module.css";

function Home() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetchPosts();

        return () => {
            setPosts(null);
        };
    }, []);

    async function fetchPosts(retry = 0) {
        if (retry > 10) return setPosts(null);

        const res = await apiFetchPosts();

        if (res.status === 200) setPosts(res.data.posts);
        else fetchPosts(retry + 1);
    }

    function addPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function deletePost(postId) {
        setPosts((posts) => posts.filter((post) => post._id !== postId));
    }

    if (!posts) return <PageLoading />;

    return (
        <div className={css.container}>
            <AddPostModal addPost={addPost} />
            {posts && posts.map((post) => <Post deletePost={deletePost} key={post._id} initialPost={post} />)}
        </div>
    );
}

export default Home;
