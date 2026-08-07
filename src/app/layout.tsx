import type { Metadata } from "next";
import {
  Courier_Prime,
  JetBrains_Mono,
  Architects_Daughter,
  Permanent_Marker,
  Shadows_Into_Light,
  Bricolage_Grotesque,
} from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-courier-prime",
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-architects",
  weight: ["400"],
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-permanent-marker",
  weight: ["400"],
});

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shadows-into-light",
  weight: ["400"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "GitDoc — Understand Code. Not Just Repositories.",
  description:
    "Paste any GitHub repository and watch AI transform thousands of lines of code into a beautifully documented engineering blueprint.",
  keywords: [
    "GitHub",
    "repository analysis",
    "AI documentation",
    "architecture diagrams",
    "code quality",
    "security analysis",
    "developer tools",
  ],
  authors: [{ name: "GitDoc" }],
  openGraph: {
    title: "GitDoc — Understand Code. Not Just Repositories.",
    description:
      "Paste any GitHub repository and watch AI transform thousands of lines of code into a beautifully documented engineering blueprint.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitDoc — Understand Code. Not Just Repositories.",
    description:
      "Paste any GitHub repository and watch AI transform thousands of lines of code into a beautifully documented engineering blueprint.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${courierPrime.variable} ${jetbrainsMono.variable} ${architectsDaughter.variable} ${permanentMarker.variable} ${shadowsIntoLight.variable} ${bricolageGrotesque.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
