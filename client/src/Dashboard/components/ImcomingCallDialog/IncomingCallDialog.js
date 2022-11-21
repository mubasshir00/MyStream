import React from 'react'
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/websocket/webRTC/webRTCHandler'

const IncomingCallDialog = ({callerUsername}) => {

  const handleAcceptButtonPressed = () =>{
    acceptIncomingCallRequest();
  }

  const handleRejectButtonPressed = () =>{
    rejectIncomingCallRequest();
  }

  return (
    <div>
      <p>{callerUsername}</p>
      <button onClick={handleAcceptButtonPressed}>Accept</button>
      <button onClick={handleRejectButtonPressed}>Reject</button>
    </div>
  );
}

export default IncomingCallDialog