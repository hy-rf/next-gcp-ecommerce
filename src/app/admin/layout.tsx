import { ReactNode } from "react";
import "./layout.css";
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="z-40">{children}</body>
    </html>
  );
}
