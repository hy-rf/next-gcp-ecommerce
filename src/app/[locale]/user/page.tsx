"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    (async () => {
      const userInfo = await fetch(`/user/api`)
        .then((res) => res.json())
        .then((ret) => console.log(ret));
    })();
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      {/* {userInfo} */}
    </>
  );
}
