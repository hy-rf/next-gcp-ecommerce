import Link from "next/link";
import "./layout.css";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="user-container">
      <nav>
        <Link href={"/user"}>
          <h2>User</h2>
        </Link>
        <Link href={"/user/login-method"}>Authorization</Link>
        <Link href={"/user/store"}>Store</Link>
      </nav>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
