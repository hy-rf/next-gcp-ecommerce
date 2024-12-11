"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
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
    Cookies.remove("token");
    Cookies.remove("refresh");
    Cookies.remove("loggedIn");
    setUser(null);
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
