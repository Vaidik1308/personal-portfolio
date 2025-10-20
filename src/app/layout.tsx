import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vaidik Singh Nirwan | Home",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-varela antialiased bg-background text-foreground w-full flex flex-col h-screen max-h-[100vh]">
        {children}
        {modal}
      </body>
    </html>
  );
}
