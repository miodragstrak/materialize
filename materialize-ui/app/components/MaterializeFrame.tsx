import React from "react";
import NavBar from "./NavBar";

export default function MaterializeFrame({ children }: { children?: React.ReactNode }) {
  return <div className="frame">{children}</div>;
}

