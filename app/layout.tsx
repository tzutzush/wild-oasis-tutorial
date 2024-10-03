import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Josefin_Sans } from "next/font/google";
import { ReactNode } from "react";
import { ReservationProvider } from "./_context/ReservationContext";

export const metadata = {
  title: "The Wild Oasis",
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased`}
        >
          <Header />
          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
