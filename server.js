const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').createServer(app);


http.listen(port, () => {
    console.log(`Port Listening to New ${port}`);
});


app.use(express.static(__dirname + '/public'))

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//Socket connection
const io = require("socket.io")(http);

io.on("connection",(socket)=>{
    console.log("Socket Connected");
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
});