import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTC from './webRTC/webRTCHandler';

const server = 'http://localhost:3017';

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

let socket ;

export const connectedWithWebSocket = () =>{
    socket = socketClient(server);

    socket.on('connection',()=>{
        console.log('Connected with socket',socket.id);
    });

    socket.on('broadcast', data => {
      handleBroadcastEvents(data);
    });

    //listenrs related with direct call
    socket.on('pre-call-option',(data)=>{
        webRTC.preCallHandle(data);
    });

    socket.on('pre-call-answer',data=>{
        webRTC.preCallAnswerHandle(data);
    });

    socket.on('webRTC-call',(data)=>{
        webRTC.handleOffer(data);
    });

    socket.on('webRTC-answer', data => {
      webRTC.handleAnswer(data);
    });
};

export const newOnlineUser = (username) =>{
    socket.emit('new-active-user',{
        username:username,
        socketId:socket.id
    });
}

export const sendPreOffer = data => {
  socket.emit('pre-call-option', data);
};

export const sendPreCallAnswer = (data) =>{
    socket.emit('pre-call-answer',data)
}

export const sendWebRTCOffer = (data) =>{
    socket.emit('webRTC-call',data);
}

export const sendWebRTCAnswer = (data) =>{
    socket.emit('webRTC-answer',(data));
}

const handleBroadcastEvents = (data) =>{
    switch(data.event){
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUsers => activeUsers.socketId !== socket.id)
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;
        default:
            break;
    }
}
