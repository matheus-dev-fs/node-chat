import type { UserData } from "../../types/user-data.type.js";

export const setUserData = (userData: UserData, name: string): void => {
    userData.name = name;
    userData.userList.push(name);
};

export const setPageTitle = (userData: UserData): void => {
    document.title = `Chat - ${userData.name}`;
};
