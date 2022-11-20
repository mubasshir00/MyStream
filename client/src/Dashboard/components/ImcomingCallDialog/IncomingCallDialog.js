import React from 'react'

const IncomingCallDialog = ({callerUsername}) => {

  const handleAcceptButtonPressed = () =>{

  }

  const handleRejectButtonPressed = () =>{

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