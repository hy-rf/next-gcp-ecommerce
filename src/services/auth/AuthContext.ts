import { User } from "@/model";
import { User as FirebaseUser } from "firebase/auth";
import { createContext } from "react";

export const AuthContext = createContext<{
  user: User | FirebaseUser | null;
  isLoaded: boolean;
}>({
  user: null,
  isLoaded: true,
});

export const AuthActionsContext = createContext<{
  setUser: (user: User | FirebaseUser) => void;
  logOut: () => Promise<void>;
  firebaseGoogleLogin: () => Promise<void>;
}>({
  setUser: () => {},
  logOut: async () => {},
  firebaseGoogleLogin: async () => {},
});
