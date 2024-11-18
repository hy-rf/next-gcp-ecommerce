"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [loginMethods, setLoginMethods] = useState<string[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/user/login-method/api?token=${token}`)
      .then((res) => res.json())
      .then((ret) => setLoginMethods(ret.loginMethods));
  }, []);
  return (
    <>
      <p>User HomePage Login method</p>
      {loginMethods.map((ele, index) => {
        return <p key={index}>{ele}</p>;
      })}
    </>
  );
}
