import type { Metadata } from "next";
import "./globals.css";

import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "Create Food Delivery Site",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          {modal}
        </UserProvider>
      </body>
    </html>
  );
}
