import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import css from "./styles/UserBox.module.css";

function UserBox({ user }) {
    return (
        <div className={css.container}>
            <img className={css.img} height={50} width={50} src={user.avatar.url} alt="?" />
            <Link className={css.link} to={"/users/" + user._id}>
                {user.first_name} {user.last_name}
            </Link>
        </div>
    );
}

UserBox.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default UserBox;
