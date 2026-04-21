import "./globals.css";

export const metadata = {
  title: "Nexus Family Finance | Controle Financeiro Inteligente",
  description: "Gestão financeira premium para você e sua família. Controle individual e compartilhado com segurança e elegância.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="theme-color" content="#050510" />
      </head>
      <body>{children}</body>
    </html>
  );
}
