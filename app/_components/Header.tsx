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
      <div className="flex items-center gap-10">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={150}
          height={100}
          priority
          className="object-cover"
        />

        {/* 🔹 Added Navigation Buttons */}
        <div className="flex gap-6">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/courses">
            <Button variant="ghost">Courses</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </div>
      </div>

      {/* 🔹 Right Side Auth Buttons (unchanged) */}
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



