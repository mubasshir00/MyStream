import React, { useEffect } from 'react'
import ActiveUserListItem from './components/ActiveUserList/ActiveUserListItem';
import ActiveUsersList from './components/ActiveUserList/ActiveUsersList';
import * as webRTC from '../utils/websocket/webRTC/webRTCHandler'
const Dashboard = () => {

  useEffect(() => {
    webRTC.getLocalStream()
  }, [])
  

  return (
    <div>
      <div>COntent</div>
      <div>rooms</div>
      <div>
        <div>
          <ActiveUsersList/>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard