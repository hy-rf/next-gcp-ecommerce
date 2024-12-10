import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <p>this is admin page</p>
        {children}
      </body>
    </html>
  );
}
