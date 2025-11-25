"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/" className="navbar-logo">
          <Image
            src="/mtrlz-logo-small.jpg"
            alt="Materialize Logo"
            width={28}
            height={28}
          />
          <span className="navbar-title">Materialize</span>
        </Link>
      </div>

      <div className="navbar-right">
        <Link href="/publish">Publish</Link>
        <Link href="/update">Update</Link>
        <Link href="/verify">Verify</Link>
        <Link href="/qr">Scan QR</Link>
        <Link href="/about">About</Link>
        <Link href="/agent">Agent</Link>
      </div>
    </nav>
  );
}