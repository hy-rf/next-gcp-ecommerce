"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [loginMethods, setLoginMethods] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/user/login-method/api`)
      .then((res) => res.json())
      .then((ret) => setLoginMethods(ret.loginMethods));
  }, []);
  function addLoginMethod() {
    const token = localStorage.getItem("token")!;
    fetch("/user/login-method/api", {
      method: "post",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((ret) => console.log(ret));
  }
  return (
    <>
      <p>User HomePage Login method</p>
      <button onClick={addLoginMethod}>Add login method</button>
      {loginMethods.map((ele, index) => {
        return <p key={index}>{ele}</p>;
      })}
    </>
  );
}
