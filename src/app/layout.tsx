import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SP Mobiles | Shasha Professionals | Yadiki",
  description: "Express mobile repair services completed in under thirty minutes. Located beside Apollo Pharmacy in Yadiki. Call to enquire about phone sales, accessories, and repairs.",
  keywords: ["SP Mobiles", "Shasha Professionals", "Mobile Repair Yadiki", "Phone Shop Yadiki", "Anantapuram", "Andhra Pradesh", "Fast Mobile Repair"],
  authors: [{ name: "Shasha Professionals" }],
  vsrification(
    google: "google-site-verification: google4f44d51108fc7639.html",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-zinc-950 text-zinc-50 overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
