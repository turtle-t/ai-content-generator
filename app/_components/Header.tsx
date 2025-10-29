"use client";

import { Button } from "@/components/ui/button";
import ShinyButton from "@/components/ui/shiny-button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={100}
          priority
          className="object-cover"
        />

        {/* ✅ Two Top Buttons */}
        <div className="flex gap-4">
          <Link
             href="https://ai-coaching-voice-agent.vercel.app/dashboard"
            target="_blank"
          >
            <Button variant="ghost">Mock Test</Button>
          </Link>
          <Link
            href="https://med-agent-turtle.vercel.app/"
            target="_blank"
          >
            <Button variant="ghost">Med Help</Button>
          </Link>
        </div>
      </div>

      {/* Existing Auth Buttons (unchanged) */}
      {!user ? (
        <Link href="/sign-up">
          <ShinyButton text="Sign Up" />
        </Link>
      ) : (
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
