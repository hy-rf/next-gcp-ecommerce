import CategoryList from "./_component/CategoryList";
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
  console.log(dict);

  return (
    <div className="product-container">
      <nav className="left-sidebar">
        <CategoryList />
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
