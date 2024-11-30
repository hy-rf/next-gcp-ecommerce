export default async function Page() {
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <a
        href={`${oauth2Endpoint}?${new URLSearchParams(params).toString()}`}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Google Login
      </a>
    </div>
  );
}
