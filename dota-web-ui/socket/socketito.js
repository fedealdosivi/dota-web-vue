const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;


server.listen(port, function () {
    console.log('Server listening at port %d', port);
});


let views:'';

io.on('connection', (socket) => {
        socket.emit('views',views);

        socket.on('send-view',function(getViews){
            console.log(getViews);
            views=getViews;
            socket.emit('views',views);
        });
});