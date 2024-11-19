import fetchData from "@/lib/fetchDate";
import { cookies } from "next/headers";

export default async function Page() {
  const loginMethods: string[] = await fetchData<string[]>(
    `${process.env.URL}/user/login-method/api`,
    {
      headers: { Cookie: (await cookies()).toString() },
    }
  );
  return (
    <>
      <p>User HomePage Login method</p>
      {loginMethods.map((ele, index) => {
        return <p key={index}>{ele}</p>;
      })}
    </>
  );
}
