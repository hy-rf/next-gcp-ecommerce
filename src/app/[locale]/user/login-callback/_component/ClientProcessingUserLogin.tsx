"use client";

import { useEffect } from "react";

interface R {
  code: number;
  message: string;
}

export default function ClientProcessingUserLogin() {
  useEffect(() => {
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
          location.replace("/");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);
  return <></>;
}
