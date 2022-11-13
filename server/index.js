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

io.on('connection',(socket)=>{
    socket.emit('connection',null);
    console.log('new user connected',socket.id);
})