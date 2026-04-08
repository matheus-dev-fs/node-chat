import type { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";
import type { UserData } from "./types/user-data.type.js";
import type { ChatElements } from "./types/chat-elements.type.js";
import * as DOMHelper from "./helpers/dom.helper.js";
import type { ListUpdate } from "./types/list-update.type.js";
import type { Message } from "./types/message.type.js";

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();

const userData: UserData = {
    name: "",
    userList: []
}

const elements: ChatElements = DOMHelper.getChatElements();

elements.loginInput.addEventListener('keyup', (event: KeyboardEvent): void => {
    if (event.key !== "Enter") {
        return;
    }

    const name: string = elements.loginInput.value.trim();

    if (name.length === 0) {
        return;
    }

    setUserData(userData, name);
    setPageTitle(userData);
    emitJoinRequest(userData.name);
});

elements.textInput.addEventListener('keyup', (event: KeyboardEvent): void => {
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

socket.on("join-request-success", (connectedUsers: string[]): void => {
    userData.userList = connectedUsers;
    changeToChatPage();
    focusTextInput();
    DOMHelper.renderUserList(userData.userList, elements.usersList);
    DOMHelper.addMessageToChat(elements.chatList, 'status', "entrou na sala.");
});

socket.on("list-update", (update: ListUpdate): void => {
    userData.userList = update.list;
    DOMHelper.renderUserList(userData.userList, elements.usersList);

    if (update.joined) {
        DOMHelper.addMessageToChat(elements.chatList, 'status', `${update.joined} entrou na sala.`);
    } else if (update.left) {
        DOMHelper.addMessageToChat(elements.chatList, 'status', `${update.left} saiu da sala.`);
    }
});

socket.on("new-message", (message: Message): void => {
    DOMHelper.addMessageToChat(
        elements.chatList, 'msg',
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

socket.io.on("reconnect_attempt", () => {
    DOMHelper.addMessageToChat(elements.chatList, "status", "Tentando reconectar...");
});

socket.io.on("reconnect", () => {
    DOMHelper.addMessageToChat(elements.chatList, "status", "reconectado.");

    if (userData.name) {
        emitJoinRequest(userData.name);
    }
});

socket.io.on("reconnect_error", () => {
    DOMHelper.addMessageToChat(elements.chatList, "status", "falha na reconexão.");
});

const setUserData = (userData: UserData, name: string): void => {
    userData.name = name;
    userData.userList.push(name);
}

const setPageTitle = (userData: UserData): void => {
    document.title = `Chat - ${userData.name}`;
}

const changeToChatPage = (): void => {
    elements.loginPage.classList.remove('flex');
    elements.loginPage.classList.add('hidden');

    elements.chatPage.classList.remove('hidden');
    elements.chatPage.classList.add('flex');
};

const emitJoinRequest = (name: string): void => {
    socket.emit("join-request", name);
}

const focusTextInput = (): void => {
    elements.textInput.focus();
}

const clearInput = (input: HTMLInputElement): void => {
    input.value = "";
}

const scrollChatToBottom = (chatList: HTMLElement): void => {
    chatList.scrollTop = chatList.scrollHeight;
}