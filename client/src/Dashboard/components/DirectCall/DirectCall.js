import React from 'react'
import { connect } from 'react-redux'
import { callstates } from '../../../store/actions/callActions';
import CallingDialog from '../CallingDialog/CallingDialog';
import CallRejectedDialog from '../CallRejectDialog/CallRejectedDialog';
import IncomingCallDialog from '../ImcomingCallDialog/IncomingCallDialog';
import LocalVideoView from '../LocalViewoPreview/LocalVideoView'
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';

const DirectCall = (props) => {
  const {localStream,remoteStream,callState,callerUsername,callingDialogVisible} = props;
  return (
    <>
      <LocalVideoView localStream={localStream} /> 
      {remoteStream && <RemoteVideoView remoteStream={remoteStream}/>}
      {/* <CallRejectedDialog/> */}
      {callState === callstates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername}/>}
      {callingDialogVisible && <CallingDialog/> }
    </>
  );
}

function mapStoreStateToProps ({call}){
    return {
        ...call
    }
}

export default connect(mapStoreStateToProps,null)(DirectCall);