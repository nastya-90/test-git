import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ id, history }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data);
        });
    });

    const handleSave = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <>
                <h2>{user.name}</h2>
                <h3>Профессия: {user.profession.name}</h3>
                <QualitiesList qualities={user.qualities} />
                <h2>completedMeetings: {user.completedMeetings}</h2>
                <h3>rate: {user.rate}</h3>
                <button
                    onClick={() => {
                        handleSave();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return "loading...";
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

export default UserPage;
