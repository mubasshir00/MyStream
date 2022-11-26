import { callstates, setCallerUsername, setCallingDialogVisible, setCallRejected, setCallState, setLocalStream } from "../../../store/actions/callActions"
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

const configuration = {
    iceServers:[{
        urls:'stun:stun.l.google.com:13902',

    }]
}

let connectedUserSocketId;
let peerConnection; 



export const getLocalStream = () =>{
    navigator.mediaDevices.getUserMedia(defaultConstrains)
    .then(stream =>{
        store.dispatch(setLocalStream(stream))
        store.dispatch(setCallState(callstates.CALL_AVAILABLE)) //if stream start pass call available 
        createPeerConnection();
    })
    .catch(err=>{
        console.log('error',err);
    })
}

const createPeerConnection = () =>{
    peerConnection = new RTCPeerConnection(configuration);
    const localStream = store.getState().call.localStream;
    for(const track of localStream.getTrack()){
        peerConnection.addTrack(track,localStream);
    };

    peerConnection.ontrack = ({streams:[stream]}) => {
        //dispatch remote stream in our store 

    }
    peerConnection.onicecandidate = (event) =>{
        //sent to connected user our to ice candidate
    }
}

const sendOffer = async() =>{
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer);
    wss.sendWebRTCOffer({
        calleeSocketId : connectedUserSocketId,
        offer:offer
    })
}

export const handleOffer = async (data) =>{
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    wss.sendWebRTCAnswer({
        callerSocketId : connectedUserSocketId,
        answer:answer
    })
}

export const handleAnswer = async(data) =>{
    await peerConnection.setRemoteDescription(data.answer);
}

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

export const rejectIncomingCallRequest = () =>{
   
    wss.sendPreCallAnswer({
        callerSocketId:connectedUserSocketId,
        answer:preOfferAnswers.CALL_REJECTED
    })
    resetCallData();
}

export const acceptIncomingCallRequest = () =>{
    wss.sendPreCallAnswer({
        callerSocketId:connectedUserSocketId,
        answer:preOfferAnswers.CALL_ACCEPTED
    })
}

export const preCallHandle = data => {

  if(callIsPossible()){
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callstates.CALL_REQUESTED));
  } else {
    wss.sendPreCallAnswer({
        callerSocketId:data.callerSocketId,
        answer:preOfferAnswers.CALL_NOT_AVAILABLE
    })
  }
};

export const callIsPossible = () =>{
    if(store.getState().call.localStream === null || store.getState().call.callState !== callstates.CALL_AVAILABLE){
        return false
    } else {
        return true 
    }
}

export const preCallAnswerHandle = (data) =>{
    store.dispatch(setCallingDialogVisible(false));
   if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
   } else {
    let rejectionReason ;
    if(data.answer === preOfferAnswers.CALL_NOT_AVAILABLE){
        rejectionReason = 'Not available'
    } else {
        rejectionReason = 'Call rejected'
    }
    store.dispatch(setCallRejected({
        rejected:true,
        reason:rejectionReason
    }))
    resetCallData();
   }
}

export const resetCallData = () =>{
    connectedUserSocketId = null;
    store.dispatch(setCallState(callstates.CALL_AVAILABLE));
}