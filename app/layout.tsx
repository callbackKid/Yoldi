import { Header } from "../components/Header";
import useSWR, { SWRConfig } from "swr";
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
        <Header />

        {children}
      </body>
    </html>
  );
}
