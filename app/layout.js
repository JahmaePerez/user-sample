import { Inter } from "next/font/google";
import "./globals.css";
import DataComponent from "./context/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "User Management (CRUD)",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataComponent>{children}</DataComponent>
      </body>
    </html>
  );
}
