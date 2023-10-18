import Navbar from "@/components/UI/Navbar";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/Providers";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={roboto.className}>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}
