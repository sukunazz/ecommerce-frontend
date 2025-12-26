import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext/AuthContext";
import { CartProvider } from "@/context/cart/CartContext";
import { ToastProvider } from "@/context/toast/ToastContext";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oracle",
  description: "Oracle App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <AuthProvider>
          {" "}
          <ToastProvider>
            <CartProvider>
              <main className="flex-1 pt-20">{children}</main>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
