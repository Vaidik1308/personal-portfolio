import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";

export const metadata: Metadata = {
  title: "Vaidik Singh Nirwan | Home",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` font-varela antialiased bg-[#111826] w-full text-white  flex flex-col`}
      >
        <div>
          <Header/>
        </div>

        <div>
          {children}
        </div>

        <div>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
