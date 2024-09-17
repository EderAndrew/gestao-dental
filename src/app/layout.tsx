import type { Metadata } from "next";
import { Roboto, Merriweather } from 'next/font/google'
import "./globals.css";

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
  title: "Gestão Dental",
  description: "Sistema para agendamento de consultas dentários.",
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
      </body>
    </html>
  );
}
