"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthActionsContext, AuthContext } from "./AuthContext";
import { User } from "@/model";
import Cookies from "js-cookie";
import fetchData from "@/lib/fetchData";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchData<User>("/api/user").then((user) => setUser(user));
    }
  }, []);
  const logOut = async () => {
    Cookies.remove("token");
    Cookies.remove("refresh");
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
