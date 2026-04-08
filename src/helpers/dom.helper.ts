import type { ChatElements } from "../types/chat-elements.type.js";

export const getChatElements = (): ChatElements => {
    return {
        loginPage: document.getElementById("login-page") as HTMLElement,
        chatPage: document.getElementById("chat-page") as HTMLElement,
        loginInput: document.getElementById("login-name-input") as HTMLInputElement,
        textInput: document.getElementById("chat-text-input") as HTMLInputElement,
        chatList: document.getElementById("chat-list") as HTMLElement,
        usersList: document.getElementById("users-list") as HTMLElement
    }
}

export const renderUserList = (userList: string[], userListContainer: HTMLElement): void => {
    userListContainer.innerHTML = "";

    userList.forEach((user: string): void => {
        const userElement: HTMLElement = createUserElement(user);
        userListContainer.appendChild(userElement);
    });
}

export const addMessageToChat = (chatListContainer: HTMLElement, type: 'status' | 'msg', msg: string, user?: string): void => {
    switch (type) {
        case 'status':
            chatListContainer.appendChild(createMessageElement('status', msg));
            break;
        case user && 'msg':
            chatListContainer.appendChild(createMessageElement('msg', msg, user));
            break;
    }
}

const createMessageElement = (type: 'status' | 'msg', msg: string, user?: string): HTMLElement => {
    const messageElement: HTMLElement = document.createElement("li");

    if (type === 'status') {
        messageElement.classList.add("m-status");
        messageElement.textContent = msg;
    } else if (type === 'msg' && user) {
        messageElement.classList.add("m-txt");
        messageElement.innerHTML = `<span>${user}</span>: ${msg}`;
    }
    
    return messageElement;
}

const createUserElement = (user: string): HTMLElement => {
    const userElement: HTMLElement = document.createElement("li");
    userElement.classList.add("user");
    userElement.textContent = user;
    return userElement;
}