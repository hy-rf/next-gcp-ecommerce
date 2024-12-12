"use client";
import { ReactNode, useMemo, useState } from "react";
import { AuthActionsContext, AuthContext } from "./AuthContext";
import { User } from "@/model";
import { User as FirebaseUser, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { auth, googleProvider } from "@/config/firebase";

export default function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | FirebaseUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | FirebaseUser | null>(initialUser);

  const logOut = async () => {
    Cookies.remove("token");
    Cookies.remove("refresh");
    Cookies.remove("loggedIn");
    setUser(null);
  };
  const firebaseGoogleLogin = async () => {
    googleProvider.addScope("profile");
    googleProvider.addScope("email");
    googleProvider.setCustomParameters({
      redirect_uri: `${process.env.URL}/user/login-callback`,
    });
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log(user);
  };

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
      firebaseGoogleLogin,
    }),
    [logOut]
  );
  return (
    <AuthContext.Provider
      value={{
        user: user,
        isLoaded: user !== null,
      }}
    >
      <AuthActionsContext.Provider value={contextActionsValue}>
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}
