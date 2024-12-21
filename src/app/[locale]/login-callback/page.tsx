"use client";
import ClientProcessingUserLogin from "./component/ClientProcessingUserLogin";
import MoonLoader from "react-spinners/MoonLoader";

export default function Page() {
  // TODO: process token from url then POST /user/login/api
  return (
    <>
      <div className="flex items-center h-[90%]">
        <div className="item-center mx-auto">
          <MoonLoader />
        </div>
      </div>

      <ClientProcessingUserLogin />
    </>
  );
}
