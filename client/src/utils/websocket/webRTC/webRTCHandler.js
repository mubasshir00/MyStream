import { callstates, setCallerUsername, setCallingDialogVisible, setCallState, setLocalStream } from "../../../store/actions/callActions"
import store from "../../../store/store"

import * as wss from './../socketconnection'

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
};

const defaultConstrains ={
    video:true,
    audio:true
}
export const getLocalStream = () =>{
    navigator.mediaDevices.getUserMedia(defaultConstrains)
    .then(stream =>{
        store.dispatch(setLocalStream(stream))
        store.dispatch(setCallState(callstates.CALL_AVAILABLE)) //if stream start pass call available 
    })
    .catch(err=>{
        console.log('error',err);
    })
}

let connectedUserSocketId;

export const callToOtherUser = (calleeDetails) =>{
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(callstates.CALL_IN_PROGRESS));
    store.dispatch(setCallingDialogVisible(true));
    console.log(store.getState());
    wss.sendPreOffer({
        callee:calleeDetails,
        caller:{
            username:store.getState().dashboard.username
        }
    })
}

export const preCallHandle = data => {
  connectedUserSocketId = data.callerSocketId;
  store.dispatch(setCallerUsername(data.callerUsername));
  store.dispatch(setCallState(callstates.CALL_REQUESTED));
};