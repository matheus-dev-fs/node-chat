import type { DefaultEventsMap } from "socket.io";
import type { Socket } from "socket.io-client";
import * as DOMHelper from "../../helpers/dom.helper.js";
import type { ChatElements } from "../../types/chat-elements.type.js";
import type { ListUpdate } from "../../types/list-update.type.js";
import type { Message } from "../../types/message.type.js";
import type { UserData } from "../../types/user-data.type.js";
import { emitJoinRequest } from "../actions/socket.actions.js";
import {
    changeToChatPage,
    focusTextInput,
    scrollChatToBottom,
} from "../actions/ui.actions.js";

export const registerSocketHandlers = (
    elements: ChatElements,
    userData: UserData,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
): void => {
    socket.on("join-request-success", (connectedUsers: string[]): void => {
        userData.userList = connectedUsers;
        changeToChatPage(elements);
        focusTextInput(elements);
        DOMHelper.renderUserList(userData.userList, elements.usersList);
        DOMHelper.addMessageToChat(elements.chatList, "status", "entrou na sala.");
    });

    socket.on("list-update", (update: ListUpdate): void => {
        userData.userList = update.list;
        DOMHelper.renderUserList(userData.userList, elements.usersList);

        if (update.joined) {
            DOMHelper.addMessageToChat(elements.chatList, "status", `${update.joined} entrou na sala.`);
        } else if (update.left) {
            DOMHelper.addMessageToChat(elements.chatList, "status", `${update.left} saiu da sala.`);
        }
    });

    socket.on("new-message", (message: Message): void => {
        DOMHelper.addMessageToChat(
            elements.chatList,
            "msg",
            message.message,
            message.username,
            message.username === userData.name
        );

        scrollChatToBottom(elements.chatList);
    });

    socket.on("disconnect", (): void => {
        DOMHelper.addMessageToChat(elements.chatList, "status", "Você foi desconectado.");
        userData.userList = [];
        DOMHelper.renderUserList(userData.userList, elements.usersList);
    });

    socket.io.on("reconnect_attempt", (): void => {
        DOMHelper.addMessageToChat(elements.chatList, "status", "Tentando reconectar...");
    });

    socket.io.on("reconnect", (): void => {
        DOMHelper.addMessageToChat(elements.chatList, "status", "reconectado.");

        if (userData.name) {
            emitJoinRequest(socket, userData.name);
        }
    });

    socket.io.on("reconnect_error", (): void => {
        DOMHelper.addMessageToChat(elements.chatList, "status", "falha na reconexão.");
    });
};
