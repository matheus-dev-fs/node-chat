import type { ListUpdate } from "./list-update.type.js";

export type ServerToClientEvents = {
    "join-request-error": (message: string) => void;
    "join-request-success": (connectedUsers: string[]) => void;
    "list-update": (update: ListUpdate) => void;
};
