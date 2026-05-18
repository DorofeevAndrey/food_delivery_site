import type { Metadata } from "next";
import "./globals.css";

import { UserProvider } from "@/contexts/UserContext";
import { CartProvider } from "@/contexts/CartContext";

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
          <CartProvider>
            {children}
            {modal}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
