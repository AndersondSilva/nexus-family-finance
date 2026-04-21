import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = {
  title: "Nexus Family Finance | Controle Financeiro Inteligente",
  description: "O controle financeiro do futuro para você e sua família.",
  manifest: "/manifest.json",
  themeColor: "#0A0C11",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nexus Finance",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

import { LocaleProvider } from "@/context/LocaleContext";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="theme-color" content="#050510" />
      </head>
      <body>
        <div className="aurora-bg" />
        <div className="dot-grid" />
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
