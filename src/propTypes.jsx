import PropTypes from "prop-types";

export const postType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    photo: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }),
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }),
    }),
});
