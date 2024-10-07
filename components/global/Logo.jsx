"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures we're on the client
  }, []);

  if (!mounted) {
    return null; // Prevents mismatches during hydration
  }

  return (
    <div className="flex gap-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Brainstorm Logo"
          width={25}
          height={25}
          priority
        />
      </Link>
      <span className="font-semibold dark:text-washed-purple-600">
        Brainstorm
      </span>
    </div>
  );
};

export default Logo;
