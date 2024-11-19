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
    <>
      <p>Login</p>
      <a href={`${oauth2Endpoint}?${new URLSearchParams(params).toString()}`}>
        Google login
      </a>
    </>
  );
}
