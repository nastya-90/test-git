import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    if (userId && edit) {
        return <EditUserPage userId={userId} />;
    }
    if (userId && !edit) {
        return <UserPage userId={userId} />;
    }
    return <UsersListPage />;
};

export default Users;
