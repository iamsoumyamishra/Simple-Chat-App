import { io } from "socket.io-client";

const socket_url = "https://73763183e4ff.ngrok-free.app";

export const socket = io(socket_url, {
    autoConnect: false
})