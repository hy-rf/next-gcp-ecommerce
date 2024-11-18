export default async function Page() {
  return (
    <>
      <p>Login</p>
      <a
        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=981674263788-sfp6ddbl5pn1in3vmvgpbvre83bjigjm.apps.googleusercontent.com&redirect_uri=${process.env.URL}/user/login-callback&response_type=token&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&include_granted_scopes=true&state=pass-through+value1`}
      >
        Google login
      </a>
    </>
  );
}
