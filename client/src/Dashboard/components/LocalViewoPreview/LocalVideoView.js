import React, { useEffect, useRef } from 'react'

const LocalVideoView = props => {
  const {localStream} = props;
  const localVideoRef = useRef();

  useEffect(()=>{
    if(localStream){
        const localVideo = localVideoRef.current;
        localVideo.srcObject = localStream;

        localVideo.onloadedmetadata = () =>{
            localVideo.play();
        };
    }
  },[localStream]);
  return (
    <div>
        <video ref={localVideoRef} autoPlay muted></video>
    </div>
  )
}

export default LocalVideoView