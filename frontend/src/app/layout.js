import "./globals.css";

export const metadata = {
  title: "Incidentes 73",
  description: "App de manejo y control de incidentes de TI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}