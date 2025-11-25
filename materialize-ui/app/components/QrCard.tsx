import React from "react";
import "./QrCard.css";

export default function QrCard({ children }: { children: React.ReactNode }) {
  return <div className="qr-card">{children}</div>;
}
