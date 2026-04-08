import type { ChatElements } from "../types/chat-elements.type.js";

export const getChatElements = (): ChatElements => {
    return {
        loginPage: document.getElementById("login-page") as HTMLElement,
        chatPage: document.getElementById("chat-page") as HTMLElement,
        loginInput: document.getElementById("login-name-input") as HTMLInputElement,
        textInput: document.getElementById("chat-text-input") as HTMLInputElement,
        usersList: document.getElementById("users-list") as HTMLElement,
    }
}

export const renderUserList = (userList: string[], userListContainer: HTMLElement): void => {
    userListContainer.innerHTML = "";

    userList.forEach((user: string): void => {
        const userElement: HTMLElement = createUserElement(user);
        userListContainer.appendChild(userElement);
    });
}

const createUserElement = (user: string): HTMLElement => {
    const userElement: HTMLElement = document.createElement("li");
    userElement.classList.add("user");
    userElement.textContent = user;
    return userElement;
}