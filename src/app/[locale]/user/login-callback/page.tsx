import ClientProcessingUserLogin from "./_component/ClientProcessingUserLogin";

export default async function Page() {
  // TODO: process token from url then POST /user/login/api
  return (
    <>
      <p>Processing data...</p>
      <ClientProcessingUserLogin />
    </>
  );
}
