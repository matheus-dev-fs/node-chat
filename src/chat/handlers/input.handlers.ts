import type { DefaultEventsMap } from "socket.io";
import type { Socket } from "socket.io-client";
import type { ChatElements } from "../../types/chat-elements.type.js";
import type { UserData } from "../../types/user-data.type.js";
import { emitJoinRequest } from "../actions/socket.actions.js";
import { clearInput } from "../actions/ui.actions.js";
import { setPageTitle, setUserData } from "../actions/user-data.actions.js";

export const registerInputHandlers = (
    elements: ChatElements,
    userData: UserData,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
): void => {
    elements.loginInput.addEventListener("keyup", (event: KeyboardEvent): void => {
        if (event.key !== "Enter") {
            return;
        }

        const name: string = elements.loginInput.value.trim();

        if (name.length === 0) {
            return;
        }

        setUserData(userData, name);
        setPageTitle(userData);
        emitJoinRequest(socket, userData.name);
    });

    elements.textInput.addEventListener("keyup", (event: KeyboardEvent): void => {
        if (event.key !== "Enter") {
            return;
        }

        const message: string = elements.textInput.value.trim();

        if (message.length === 0) {
            return;
        }

        socket.emit("send-message", message);
        clearInput(elements.textInput);
    });
};
