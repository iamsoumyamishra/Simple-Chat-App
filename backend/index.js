import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: ["http://localhost:5173", "http://192.168.1.68:5173", "*"],
        methods: ["GET","POST"]
    }
});

io.on("connection", (socket)=>{
    console.log(`Connected: ${socket.id}`);

    socket.join("room1")
    socket.on("message", (data) => {
        io.to("room1").emit("response", {data: {role: data.role, msg: data.msg}})

        if (data.msg === "disconnect") io.disconnectSockets()
    })

    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`)
    })

})

io.listen(3000);