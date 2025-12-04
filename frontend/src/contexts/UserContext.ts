import { createContext } from "react";

type UserContextType = {
	userId: string;
	login: (uuid: string) => void;
	logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
