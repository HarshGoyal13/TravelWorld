
"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/LayoutProvider/LayoutProvider";
import Provider from "@/utils/sessionProvider";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>

        <LayoutProvider>
        {children}
        </LayoutProvider>

        </Provider>
        </body>
    </html>
  );
}
