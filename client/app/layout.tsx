import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <AppProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
