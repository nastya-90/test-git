import React from "react";
import PropTypes from "prop-types";

const Mark = ({ show, order }) => {
    if (show && order === "asc") {
        return <span className="bi bi-caret-up-fill"></span>;
    } else if (show && order === "desc") {
        return <span className="bi bi-caret-down-fill"></span>;
    } else return null;
};
Mark.propTypes = {
    show: PropTypes.bool,
    order: PropTypes.string
};
export default Mark;
