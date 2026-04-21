import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = {
  title: "Nexus Family Finance | Controle Financeiro Inteligente",
  description: "Gestão financeira premium para você e sua família. Controle individual e compartilhado com segurança e elegância.",
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
