export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>User</h1>
      <h2>Login methods</h2>
      <div>{children}</div>
    </>
  );
}
