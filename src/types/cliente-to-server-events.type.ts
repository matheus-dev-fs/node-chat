export type ClientToServerEvents = {
    "join-request": (name: string) => void;
    "send-message": (message: string) => void;
};
