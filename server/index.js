const express = require('express');
const socket = require('socket.io');

const PORT = 3017;

const app = express();

const server = app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})

const io = socket(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});

let peers = [];

const broadcastEventTypes = {
    ACTIVE_USERS : 'ACTIVE_USERS',
    GROUP_CALL_ROOMS:'GROUP_CALL_ROOMS'
}

io.on('connection',(socket)=>{
    socket.emit('connection',null);
    console.log('new user connected',socket.id);

    socket.on('new-active-user',(data)=>{
        peers.push({
            username:data.username,
            socketId:data.socketId
        })
    })
    console.log('new user');
    console.log(peers);

    io.sockets.emit('broadcast',{
        event:broadcastEventTypes.ACTIVE_USERS,
        activeUsers:peers
    })

    socket.on('disconnect',()=>{
        console.log('user disconnected');
        console.log(peers);
        peers = peers.filter(i => i.socketId !== socket.id);
        io.sockets.emit('broadcast',{
            event:broadcastEventTypes.ACTIVE_USERS,
            activeUsers:peers
        })
    })

    socket.on('pre-call-option',(data)=>{
        console.log({data});
        io.to(data.callee.socketId).emit('pre-call-option',{
            callerUsername:data.caller.username,
            callerSocketId: socket.id
        });
    });

    socket.on('pre-call-answer',data=>{
        console.log('pre-call-answer',data);
        io.to(data.callerSocketId).emit('pre-call-answer',{
            answer:data.answer
        });
    });

})