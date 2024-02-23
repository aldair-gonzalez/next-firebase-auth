import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next firebase-auth",
  description: "Implementando firebase-authentication en una app de Nextjs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`w-screen min-h-screen ${inter.className}`}>{children}</body>
    </html>
  );
}
