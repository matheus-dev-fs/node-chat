import type { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";
import type { UserData } from "./types/user-data.type.js";
import type { ChatElements } from "./types/chat-elements.type.js";
import * as DOMHelper from "./helpers/dom.helper.js";
import type { ListUpdate } from "./types/list-update.type.js";

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();

const userData: UserData = {
    name: "",
    userList: []
}

const elements: ChatElements = DOMHelper.getChatElements();

elements.loginInput.addEventListener('keyup', (event: KeyboardEvent) => {
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
        DOMHelper.addMessageToChat(elements.chatList, 'status',  `${update.joined} entrou na sala.`);
    } else if (update.left) {
        DOMHelper.addMessageToChat(elements.chatList, 'status', `${update.left} saiu da sala.`);
    }
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

export const focusTextInput = (): void => {
    elements.textInput.focus();
}