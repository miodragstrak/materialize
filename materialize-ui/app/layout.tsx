import React from "react";
import "../styles/globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Materialize: Proof-of-Make",
  description: "OriginTrail DKG Hackathon Project",
};

export default function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />    {/* <- Only one navbar */}
        <main className="page-container">
          {children}
        </main>
      </body>
    </html>
  );
}
