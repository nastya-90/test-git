import React, { useState } from "react";
import PropTypes from "prop-types";
import Mark from "./mark";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [addMark, setAddMark] = useState({ iter: "name", show: false });

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
            setAddMark({ iter: item, show: true });
        } else {
            onSort({ path: item, order: "asc" });
            setAddMark({ iter: item, show: true });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path === addMark.iter && (
                            <Mark
                                show={addMark.show}
                                order={selectedSort.order}
                            />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
