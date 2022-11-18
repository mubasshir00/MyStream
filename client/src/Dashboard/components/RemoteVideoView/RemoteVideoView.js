import React, { useEffect, useRef } from 'react'

const RemoteVideoView = (props) => {
  const {remoteStream} = props;
  const remoteVideoRef = useRef();

  useEffect(()=>{
    if(remoteStream){
        const localVideo = remoteVideoRef.current;
        localVideo.srcObject = remoteStream;

        localVideo.onLoadedmetadata = () =>{
            localVideo.play();
        }
    }
  },[remoteStream])

  return (
    <div>
        <video ref={remoteVideoRef} autoPlay muted/>
    </div>
  )
}

export default RemoteVideoView