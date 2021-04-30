const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 8000;

http.listen(port, () => {
    console.log(`Listining on port ${port}`);
})

//routing
app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


//socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log("Connected!!");

    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', msg);
    })
})