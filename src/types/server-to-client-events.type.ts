export type ServerToClientEvents = {
    "join-request-error": (message: string) => void;
    "join-request-success": (connectedUsers: string[]) => void;
};
