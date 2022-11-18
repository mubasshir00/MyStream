import React from 'react'
import { connect } from 'react-redux'
import CallingDialog from '../CallingDialog/CallingDialog';
import CallRejectedDialog from '../CallRejectDialog/CallRejectedDialog';
import IncomingCallDialog from '../ImcomingCallDialog/IncomingCallDialog';
import LocalVideoView from '../LocalViewoPreview/LocalVideoView'
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';

const DirectCall = (props) => {
  const {localStream,remoteStream} = props;
  return (
    <>
      <LocalVideoView localStream={localStream} /> 
      {remoteStream && <RemoteVideoView remoteStream={remoteStream}/>}
      {/* <CallRejectedDialog/> */}
      {/* <IncomingCallDialog/> */}
      {/* <CallingDialog/> */}
    </>
  );
}

function mapStoreStateToProps ({call}){
    return {
        ...call
    }
}

export default connect(mapStoreStateToProps,null)(DirectCall);