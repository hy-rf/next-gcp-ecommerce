"use client";

import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LocaleContext from "../_component/LocaleContext";
import fetchData from "@/lib/fetchData";
import { User } from "@/model";
import { AuthActionsContext } from "@/services/auth/AuthContext";

export default function Page() {
  const { setUser } = useContext(AuthActionsContext);
  const router = useRouter();
  const { dict } = useContext(LocaleContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [oauth2Endpoint, setOauth2Endpoint] = useState("");
  const [params, setParams] = useState({});
  useEffect(() => {
    setOauth2Endpoint("https://accounts.google.com/o/oauth2/v2/auth");
    setParams({
      client_id:
        "981674263788-sfp6ddbl5pn1in3vmvgpbvre83bjigjm.apps.googleusercontent.com",
      redirect_uri: document.location.href.replace(
        /\/login$/,
        "/login-callback"
      ),
      response_type: "token",
      scope: "https://www.googleapis.com/auth/userinfo.profile",
      include_granted_scopes: "true",
      state: "pass-through value",
    });
  }, []);
  async function handleLoginOrRegister() {
    const response = await fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    if (response.status === 206) {
      setIsRegistering(true);
      setPassword("");
      return;
    }
    if (response.status === 201) {
      toast.success(dict.auth_message_login_success);
      // this should be moved to context provider
      await fetchData<User>("/api/user").then((user) => setUser(user!));
      router.replace("/");
      return;
    }
    if (response.status === 401) {
      toast.error(dict.auth_message_login_error_wrong_password);
      setName("");
      setPassword("");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center text-gray-600 pt-4 dark:bg-gray-300">
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
          <h1 className="text-2xl font-bold">{dict.auth_login_title}</h1>
          <div
            id="login-register-form"
            className="w-60 mt-4 mb-4 flex flex-col items-end gap-6 items-stretch"
          >
            <TextField
              variant="outlined"
              type="text"
              label={dict.auth_login_input_username_label}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="password"
              label={dict.auth_login_input_password_label}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs w-[120%]">
              {dict.auth_register_accept_terms_of_services_text}
              <a className="underline" href="/terms-of-service">
                {dict.auth_register_accept_terms_of_services_link_text}
              </a>
              {dict.auth_register_accept_terms_of_services_text_end}
            </p>
            <button
              type="submit"
              className="px-4 py-2 border border-gray-500 rounded-md bg-gray-300 text-black dark:bg-gray-600 dark:text-white"
              onClick={handleLoginOrRegister}
            >
              {dict.auth_login_title}
            </button>
            <button
              className="gsi-material-button"
              onClick={() => {
                document
                  .getElementById("google-login-link")
                  ?.dispatchEvent(new MouseEvent("click"));
              }}
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="block"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">
                  Sign in with Google
                </span>
                <span className="hidden">Sign in with Google</span>
              </div>
            </button>
            {/* <div className="border border-gray-500 rounded-md bg-gray-300 text-gray-800 text-center">
              <a
                className="px-4 py-2 block"
                href={`${oauth2Endpoint}?${new URLSearchParams(params).toString()}`}
              >
                Google
              </a>
            </div> */}
            <a
              id="google-login-link"
              href={`${oauth2Endpoint}?${new URLSearchParams(params).toString()}`}
            ></a>
          </div>
        </>
      )}
    </div>
  );
}
