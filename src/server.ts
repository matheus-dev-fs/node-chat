import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket): void => {
    console.log("Conexão detectada...");
});

const PORT: string = process.env.PORT as string;

httpServer.listen(PORT, (): void => {
    console.log(`Server is running on port ${PORT}`);
});