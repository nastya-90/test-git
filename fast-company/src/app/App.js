import React, { useState, useEffect } from "react";
import Users from "../components/users";
import api from "../api";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        console.log(id);
        const newInfoUsers = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newInfoUsers);
    };

    if (!users) return <div>Идет загрузка данных...</div>;
    else {
        return (
            <div>
                <Users
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            </div>
        );
    }
}

export default App;
