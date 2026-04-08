import type { ChatElements } from "../../types/chat-elements.type.js";

export const changeToChatPage = (elements: ChatElements): void => {
    elements.loginPage.classList.remove("flex");
    elements.loginPage.classList.add("hidden");

    elements.chatPage.classList.remove("hidden");
    elements.chatPage.classList.add("flex");
};

export const focusTextInput = (elements: ChatElements): void => {
    elements.textInput.focus();
};

export const clearInput = (input: HTMLInputElement): void => {
    input.value = "";
};

export const scrollChatToBottom = (chatList: HTMLElement): void => {
    chatList.scrollTop = chatList.scrollHeight;
};
