type Params = Promise<{ locale: string }>;

export default async function Page(props: { params: Params }) {
  // const dict = await getDictionary((await props.params).locale);
  return (
    <>
      <p>{(await props.params).locale}</p>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=981674263788-sfp6ddbl5pn1in3vmvgpbvre83bjigjm.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000/user/google-login-callback&response_type=token&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&include_granted_scopes=true&state=pass-through+value">
        Google login
      </a>
    </>
  );
}
