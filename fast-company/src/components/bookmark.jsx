import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, id, onClick }) => {
    return (
        <button onClick={() => onClick(id)}>
            <i className={!status ? "bi bi-circle" : "bi bi-check-circle"}></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default BookMark;
