import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex gap-4">
      <Link href="/">
        <Image
          src="logo.svg"
          alt="Brainstorm Logo"
          width={25}
          height={25}
        />
      </Link>
      <span className="font-semibold dark:text-washed-purple-600">
        Brainstorm
      </span>
    </div>
  );
};

export default Logo;