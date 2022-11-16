import React from 'react'
const ActiveUserListItem = (props) => {

  const {activeUser} = props;

  const handleListItemPressed = () =>{

  }
  return (
    <div className="active_user_list" onClick={handleListItemPressed()}>
      <div>
        <img src="/src/resources/user.png" alt="" />
      </div>
      
      <p>{activeUser.username}</p>
    </div>
  );
}

export default ActiveUserListItem