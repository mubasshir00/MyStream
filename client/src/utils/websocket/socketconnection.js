import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions'

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
};

export const newOnlineUser = (username) =>{
    socket.emit('new-active-user',{
        username:username,
        socketId:socket.id
    });
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