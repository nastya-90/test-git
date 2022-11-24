import React from 'react';

const BookMark = ({status, id, onClick}) => {
  
    return (
        <button onClick = {() => onClick(id)}>
            <i className = {!status ? "bi bi-circle" : "bi bi-check-circle"} ></i>           
        </button>
    )
}

export default BookMark;