import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center w-full h-fit">
      <Image src="/404.svg" width={600} height={400} alt="page not found" />
      <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-b from-slate-900 to-primary text-transparent bg-clip-text p-2">
        Page Not Found
      </h1>
      <p>
        <Link href="/" className="text-primary">
          Back to home
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
