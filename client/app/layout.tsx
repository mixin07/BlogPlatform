
import React, { ReactNode } from "react";

export const metadata = {
  title: "Simple Club Blog",
  description: "Club blog platform"
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
