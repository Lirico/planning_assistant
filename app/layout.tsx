// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css"; // Tus estilos de Tailwind

export const metadata = {
  title: "Asistente de Clases con IA",
  description: "Diseño instruccional inteligente para profesores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}