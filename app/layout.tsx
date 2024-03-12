import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xHangout - GenZ Social media",
  description: "Connect with your frieds, chat, live video, groups and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
