import { io } from "socket.io-client";

const socket_url = process.env.SOCKETURI || "http://localhost:3000";

export const socket = io(socket_url, {
    autoConnect: false
})