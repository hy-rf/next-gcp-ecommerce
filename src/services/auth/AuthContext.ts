import { User } from "@/model";
import { createContext } from "react";

export const AuthContext = createContext<{
  user: User | null;
  isLoaded: boolean;
}>({
  user: null,
  isLoaded: true,
});

export const AuthActionsContext = createContext<{
  setUser: (user: User) => void;
  logOut: () => Promise<void>;
}>({
  setUser: () => {},
  logOut: async () => {},
});
