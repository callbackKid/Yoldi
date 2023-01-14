import { Header } from "../components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Header name={""} email={""} key={""} image={"null"} />
        {children}
      </body>
    </html>
  );
}
