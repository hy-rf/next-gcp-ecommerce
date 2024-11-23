import Link from "next/link";
import "./layout.css";
import getDictionary from "@/dictionary/dictionary";
type Params = Promise<{ locale: string }>;
export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const dict = await getDictionary((await params).locale);
  return (
    <div className="user-container">
      <nav className="left-sidebar">
        <Link href={"/user"}>
          <h2>{dict.user_layout_title}</h2>
        </Link>
        <Link href={"/user/basic"}>Basic</Link>
        <Link href={"/user/login-method"}>Authorization</Link>
        <Link href={"/user/payment"}>Payment</Link>
        <Link href={"/user/order"}>Order</Link>
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
