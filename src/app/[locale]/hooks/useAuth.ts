import { User } from "@/model";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "@/lib/fetchData";

export default function useAuth() {
  const [auth, setAuth] = useState<User | null>(null);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchData<User>("/api/user").then((user) => setAuth(user));
    }
  }, []);
  const logout = async () => {
    Cookies.remove("token");
    Cookies.remove("refresh");
    setAuth(null);
  };
  return { auth, setAuth, logout };
}
