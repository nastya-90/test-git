import React from "react";
import BookMark from "./bookmark";
import Quality from "./quality";


const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onToggleBookMark,
    onDelete
}) => {
    return (
        <tr key = {_id}>
            <td>{name}</td>
            <td>
                {qualities.map((quality) => (
                    <Quality key = {quality._id} {...quality}/>
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
                <BookMark 
                    id = {_id}                   
                    onClick = {onToggleBookMark}
                    status = {bookmark}
                />
            </td>
            <td>
                <button
                    onClick = {() => onDelete(_id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    )
}


export default User;