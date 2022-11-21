import React, { useEffect } from 'react'

const CallRejectedDialog = ({ reason, hideCallRejectedDialog }) => {
  useEffect(()=>{
    setTimeout(()=>{
      hideCallRejectedDialog({
        rejected: false,
        reason: '',
      });
    },[4000])
  },[]);
  return (
    <div>
      <span>{reason}</span>
    </div>
  );
};

export default CallRejectedDialog