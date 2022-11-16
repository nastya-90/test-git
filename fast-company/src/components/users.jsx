import React, { useState } from 'react'
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
       
    const handleDelete = (userId) =>{
      setUsers(users.filter(el => el._id !== userId));
    };
        
    const renderPhrase = (number) => {
      if (number === 1 || number >=5) {
          return `${number} человек тусанет с тобой сегодня`;
      } else if (number >= 2 && number < 5) {
          return `${number} человека тусанет с тобой сегодня`;
      } else if (number === 0) {
         return "Никто не тусанет с тобой сегодня";
      }      
    };
  
    const tableFormat = () => {
      return (
      users.length !== 0 &&
      (<table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Профессия</th>
            <th>Качества</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => 
            <tr className='marker'>
              <td>{user.name}</td>
              <td>{user.profession.name}</td>      
              <td>{user.qualities.map(quality => 
                (<span className = {`badge bg-${quality.color}`} key={quality._id}
                >
                  {quality.name}
                </span>))}
              </td>    
              <td>{user.completedMeetings}</td>
              <td>{`${user.rate}/5`}</td>
              <td>
                <button 
                  key = {user.id} 
                  className = "btn btn-danger m-2" 
                  onClick ={() => { handleDelete(user._id) }}
                  >
                  Delete
                </button>
              </td>
            </tr>)}
        </tbody>
      </table>)
      )
    }
     
  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      <div>{tableFormat()}</div>    
    </>
  )
}


export default Users;