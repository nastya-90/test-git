import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const userPageLink = ({ user }) => {
    return <Link to={`/users/${user._id}`}>{user.name}</Link>;
};

userPageLink.propTypes = {
    user: PropTypes.object.isRequired
};
export default userPageLink;
