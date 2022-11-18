import { callstates, setCallState, setLocalStream } from "../../../store/actions/callActions"
import store from "../../../store/store"

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