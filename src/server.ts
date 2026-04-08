import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import type { ClientToServerEvents } from "./types/cliente-to-server-events.type.js";
import type { ServerToClientEvents } from "./types/server-to-client-events.type.js";
import type { SocketData } from "./types/socket-data.type.js";

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>(httpServer);

const connectedUsers: string[] = [];

io.on("connection", (socket) => {
    socket.on("join-request", (name: string): void => {
        if (connectedUsers.includes(name)) {
            socket.emit("join-request-error", "Username is already taken.");
            return;
        }

        socket.data.username = name;
        connectedUsers.push(name);
        console.log(connectedUsers)

        socket.emit("join-request-success", connectedUsers);
        socket.broadcast.emit("list-update", { 
            joined: name, 
            list: connectedUsers 
        });
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});