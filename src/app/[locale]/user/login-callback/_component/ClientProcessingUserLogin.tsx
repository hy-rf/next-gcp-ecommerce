"use client";

import LocaleContext from "@/app/[locale]/_component/LocaleContext";
import fetchData from "@/lib/fetchData";
import { User } from "@/model";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { AuthActionsContext } from "@/services/auth/AuthContext";

interface R {
  code: number;
  message: string;
}

export default function ClientProcessingUserLogin() {
  const router = useRouter();
  const { dict } = useContext(LocaleContext);
  const { setUser } = useContext(AuthActionsContext);
  const fetchUserInfo = async () => {
    const token = document.URL.split("#")[1].split("&")[1].split("=")[1];
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
      );
      const userInfo = await response.json();
      const googleUserId = userInfo.id;
      const loginResult: Promise<R> = await fetch("/api/user/login", {
        method: "post",
        body: JSON.stringify({
          id: googleUserId,
          info: userInfo,
        }),
      }).then((res) => res.json());
      if ((await loginResult).code == 200) {
        toast.success(dict.auth_message_login_success);
        await fetchData<User>("/api/user").then((user) => setUser(user!));
        router.replace("/");
        return;
      }
    } catch {
      toast.error(dict.auth_message_login_error_wrong_password);
      router.replace("/login");
      return;
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
      <p></p>
    </>
  );
}
