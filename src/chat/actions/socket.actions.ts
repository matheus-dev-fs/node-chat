import type { DefaultEventsMap } from "socket.io";
import type { Socket } from "socket.io-client";

export const emitJoinRequest = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    name: string
): void => {
    socket.emit("join-request", name);
};
