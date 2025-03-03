import HeroSection from "@/components/base/HeroSection/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <p>{JSON.stringify(session)}</p>
      <HeroSection />
      <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-b from-slate-900 to-primary text-transparent bg-clip-text p-2">
        Welcome to Voting App
      </h1>
      <Link href="/login">
        <Button className="mt-5">Let's Vote</Button>
      </Link>
    </div>
  );
}
