import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" height={24} width={24} />
          <p>DevEvent</p>
        </Link>

        <ul>
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/create">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
