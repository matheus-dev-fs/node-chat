import type { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";
import type { ChatElements } from "./types/chat-elements.type.js";
import * as DOMHelper from "./helpers/dom.helper.js";
import { registerInputHandlers } from "./chat/handlers/input.handlers.js";
import { registerSocketHandlers } from "./chat/handlers/socket.handlers.js";
import { userData } from "./data/user.data.js";

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();
const elements: ChatElements = DOMHelper.getChatElements();

registerInputHandlers(elements, userData, socket);
registerSocketHandlers(elements, userData, socket);