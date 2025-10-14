import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Flex({
  subsets: ["cyrillic-ext", "latin"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Твоя Косметика",
  description: "Твоя Косметика",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
