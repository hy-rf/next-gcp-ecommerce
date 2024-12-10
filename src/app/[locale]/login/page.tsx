"use client";

import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LocaleContext from "../_component/LocaleContext";
import fetchData from "@/lib/fetchData";
import { User } from "@/model";
import { AuthActionsContext } from "@/services/auth/AuthContext";

export default function Page() {
  const { setUser } = useContext(AuthActionsContext);
  const router = useRouter();
  const dict = useContext(LocaleContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = {
    client_id:
      "981674263788-sfp6ddbl5pn1in3vmvgpbvre83bjigjm.apps.googleusercontent.com",
    redirect_uri: `${process.env.URL}/user/login-callback`,
    response_type: "token",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    include_granted_scopes: "true",
    state: "pass-through value",
  };
  async function handleLoginOrRegister() {
    const response = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    if (response.statusText === "Register succeed") {
      setIsRegistering(true);
      setPassword("");
      return;
    }
    if (response.statusText === "Login Succeed") {
      toast.success(dict.auth_message_login_success);
      await fetchData<User>("/api/user").then((user) => setUser(user));
      router.replace("/");
      return;
    }
    if (response.statusText === "Wrong password") {
      toast.error(dict.auth_message_login_error_wrong_password);
      setName("");
      setPassword("");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center text-gray-600 pt-4">
      {isRegistering && (
        <>
          <h1 className="text-2xl font-bold">Register</h1>
          <div
            id="login-register-form"
            className="w-60 mt-4 mb-4 flex flex-col items-end gap-6"
          >
            <TextField
              type="password"
              label="confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 border border-gray-500 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-white duration-300"
              onClick={handleLoginOrRegister}
            >
              Register
            </button>
          </div>
        </>
      )}
      {!isRegistering && (
        <>
          <h1 className="text-2xl font-bold">Login/Register</h1>
          <div
            id="login-register-form"
            className="w-60 mt-4 mb-4 flex flex-col items-end gap-6"
          >
            <TextField
              variant="outlined"
              type="text"
              label="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="password"
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="px-4 py-2 border border-gray-500 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-white duration-300"
              onClick={handleLoginOrRegister}
            >
              Login/Register
            </Button>
          </div>
          <div id="third-party-login-links" className="flex gap-4">
            <div className="px-4 py-2 border border-gray-500 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-white duration-300">
              <a
                href={`${oauth2Endpoint}?${new URLSearchParams(params).toString()}`}
              >
                Google
              </a>
            </div>
            <div className="px-4 py-2 border border-gray-500 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-white duration-300">
              <a href="">Facebook</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
