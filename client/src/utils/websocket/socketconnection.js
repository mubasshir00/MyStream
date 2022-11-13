import socketClient from 'socket.io-client';

const server = 'http://localhost:3017';

let socket ;

export const connectedWithWebSocket = () =>{
    socket = socketClient(server);

    socket.on('connection',()=>{
        console.log('Connected with socket',socket.id);
    })
}