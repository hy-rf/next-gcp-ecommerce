export default async function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-6 p-0 min-h-screen">
      <h2>For you</h2>
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
