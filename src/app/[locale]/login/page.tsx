export default function Page() {
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
  return (
    <div className="flex flex-col items-center justify-center text-gray-600">
      <h1 className="text-2xl font-bold">Login/Register</h1>
      <div
        id="login-register-form"
        className="w-60 mt-4 mb-4 flex flex-col items-end gap-6"
      >
        <input
          type="text"
          placeholder="username/email"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-gray-500 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-white duration-300"
        >
          Login/Register
        </button>
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
    </div>
  );
}
