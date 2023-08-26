import PropTypes from "prop-types";
import UserBox from "../Users/UserBox";

function Post({ post }) {
    return (
        <div>
            <UserBox user={post.user} />
            <h3>{post.text}</h3>
            {post.photo && <img height="300" width="300" src={post.photo.url} />}
            <div>{post.likes.length} Likes</div>
            <div>{post.createdAt}</div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        photo: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }),
        likes: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
            })
        ).isRequired,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
            avatar: PropTypes.shape({
                url: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }).isRequired,
};

export default Post;
