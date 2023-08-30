import { useEffect, useState } from "react";
import { apiFetchPosts } from "../../helpers/API";
import AddPostModal from "../Posts/AddPostModal";
import Post from "../Posts/Post";
import PageLoading from "../shared/PageLoading";
import css from "./Home.module.css";

function Home() {
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

    if (!posts) return <PageLoading />;

    return (
        <div className={css.container}>
            <AddPostModal addPost={addPost} />
            {posts && posts.map((post) => <Post deletePost={deletePost} key={post._id} initialPost={post} />)}
        </div>
    );
}

export default Home;
