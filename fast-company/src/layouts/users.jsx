import React, { useState, useEffect } from "react";
import { paginate } from "../app/utils/paginate";
import Pagination from "../components/pagination";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import _ from "lodash";
import UserPage from "../components/userPage";

const Users = (props) => {
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [inputSymbols, setInputSymbols] = useState("");

    const pageSize = 8;

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setInputSymbols("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const handleChange = (e) => {
            clearFilter();
            setInputSymbols(e.target.value);
        };
        const searchUser = [];
        if (inputSymbols) {
            const word = inputSymbols.toLowerCase();

            for (const user of users) {
                if (user.name.toLowerCase().includes(word) === true) {
                    searchUser.push(user);
                }
            }
        }
        const userCrop = paginate(
            inputSymbols ? searchUser : sortedUsers,
            currentPage,
            pageSize
        );

        const count = userCrop.length;
        const clearFilter = () => {
            setSelectedProf();
        };

        const { match } = props;
        const userId = match.params.userId;

        if (userId) {
            return <UserPage {...props} id={userId} />;
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <form>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            placeholder="Search..."
                            value={inputSymbols}
                            onChange={handleChange}
                        />
                    </form>
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return "loading...";
};

Users.propTypes = {
    match: PropTypes.object.isRequired
};

export default Users;
