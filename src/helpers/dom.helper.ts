import type { ChatElements } from "../types/chat-elements.type.js";

export const getChatElements = (): ChatElements => {
    return {
        loginPage: document.getElementById("login-page") as HTMLElement,
        chatPage: document.getElementById("chat-page") as HTMLElement,
        loginInput: document.getElementById("login-name-input") as HTMLInputElement,
        textInput: document.getElementById("chat-text-input") as HTMLInputElement,
    }
}