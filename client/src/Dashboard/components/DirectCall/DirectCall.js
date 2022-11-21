import React from 'react'
import { connect } from 'react-redux'
import { callstates, setCallRejected } from '../../../store/actions/callActions';
import CallingDialog from '../CallingDialog/CallingDialog';
import CallRejectedDialog from '../CallRejectDialog/CallRejectedDialog';
import IncomingCallDialog from '../ImcomingCallDialog/IncomingCallDialog';
import LocalVideoView from '../LocalViewoPreview/LocalVideoView'
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';

const DirectCall = (props) => {
  const {localStream,remoteStream,callState,callerUsername,callingDialogVisible,callRejected,hideCallRejectedDialog} = props;
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog reason={callRejected.reason} hideCallRejectedDialog={hideCallRejectedDialog}/>}
      {callState === callstates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
    </>
  );
}

function mapStoreStateToProps ({call}){
    return {
        ...call
    }
}

function mapDispatch(dispatch){
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideCallRejectedDialog:(callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails))
  }
}

export default connect(mapStoreStateToProps,mapDispatchToProps)(DirectCall);