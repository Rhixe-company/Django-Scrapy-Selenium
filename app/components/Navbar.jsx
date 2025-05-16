import React from "react";

import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link href="/">
            <Image
              className="logoimage"
              src="/logo.webp"
              alt="logo"
              width={60}
              height={30}
            />
          </Link>
        </div>
        <Link href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;
