import fetchData from "@/lib/fetchData";
import { cookies } from "next/headers";

export default async function Page() {
  const loginMethods: string[] = await fetchData<string[]>(
    `${process.env.URL}/user/login-method/api`,
    {
      headers: { Cookie: (await cookies()).toString() },
    }
  );
  const listStyles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      TextAlign: "center",
      marginBottom: "10px",
    },
    list: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      padding: "10px 15px",
      marginBottom: "8px",
      borderRadius: "5px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      fontSize: "1rem",
      fontWeight: "500",
      color: "#333",
    },
  };
  return (
    <div style={listStyles.container}>
      <h3 style={listStyles.title}>User Login Methods</h3>
      <ul style={listStyles.list}>
        {loginMethods.map((method, index) => (
          <li key={index} style={listStyles.listItem}>
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
}
