import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Common/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ThemeTransitionIndicator } from "@/components/Reusable/ThemeTransitionIndicator";
// import Footer from "@/components/Common/Footer";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-varela antialiased bg-background text-foreground w-full flex flex-col">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <ThemeTransitionIndicator />
          <div>
            <Header/>
          </div>

          <div>
            {children}
          </div>

          <div>
            {/* <Footer/> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
