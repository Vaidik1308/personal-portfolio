import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vaidik Singh Nirwan",
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
