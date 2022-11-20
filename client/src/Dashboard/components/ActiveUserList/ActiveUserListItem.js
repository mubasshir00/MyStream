import React from 'react'
import { callToOtherUser } from '../../../utils/websocket/webRTC/webRTCHandler';
const ActiveUserListItem = (props) => {

  const {activeUser} = props;

  const handleListItemPressed = () =>{
    callToOtherUser(activeUser);
  }
  return (
    <div className="active_user_list" onClick={handleListItemPressed}>
      <div>
        <img src="/src/resources/user.png" alt="" />
      </div>
      
      <p>{activeUser.username}</p>
    </div>
  );
}

export default ActiveUserListItem