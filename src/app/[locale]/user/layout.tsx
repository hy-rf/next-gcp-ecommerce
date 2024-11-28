import getDictionary from "@/dictionary/dictionary";
import Sidebar from "./_component/Sidebar";

type Params = Promise<{ locale: string }>;

export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const dict = await getDictionary((await params).locale, "user");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar dict={dict} />

      {/* Main Content */}
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
