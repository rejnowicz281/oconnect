import PropTypes from "prop-types";
import css from "./styles/PageLoading.module.css";

function PageLoading({ text }) {
    return <div className={css.loading}>{text ? text : "Loading..."}</div>;
}

PageLoading.propTypes = {
    text: PropTypes.string,
};

export default PageLoading;
