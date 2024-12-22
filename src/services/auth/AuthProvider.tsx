"use client";
import { ReactNode, useMemo, useState } from "react";
import { AuthActionsContext, AuthContext } from "./AuthContext";
import { User } from "@/model";
import Cookies from "js-cookie";

export default function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  const logOut = async () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("refresh");
    Cookies.remove("loggedIn");
  };

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
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
