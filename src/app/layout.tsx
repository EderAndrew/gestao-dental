import type { Metadata } from "next";
import { Roboto, Merriweather } from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "900"],
});
const merri = Merriweather({
  subsets: ["latin"],
  variable: "--font-merri",
  weight: ["400", "900"],
});

export const metadata: Metadata = {
  title: "AgendaDental",
  description: "Gestão de Agendamento confiável.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${merri.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
