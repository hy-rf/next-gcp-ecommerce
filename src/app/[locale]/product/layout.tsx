import CategoryList from "./_component/CategoryList";
export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-6 p-0 min-h-screen">
      <CategoryList />
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
